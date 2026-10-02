/**
 * REVIEW ORIGINALITY & REPETITION PROTECTION MODULE
 * 
 * Objective:
 * Ensures different customers do not receive identical or near-duplicate reviews,
 * without manufacturing fake diversity or inventing false facts.
 */

export interface OriginalityCheckResult {
  isValid: boolean;
  maxSimilarity: number;
  offendingText?: string;
  matchedHistoryText?: string;
  repeatedPhrases?: string[];
  reason?: string;
}

/**
 * 1. normalizeText()
 * 
 * Cleans and canonicalizes text for accurate structural and lexical comparison:
 * - Converts to lowercase
 * - Strips punctuation, quotes, and non-alphanumeric characters
 * - Normalizes consecutive whitespace
 * - Trims leading/trailing whitespace
 */
export function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // replace punctuation with spaces
    .replace(/\s+/g, " ")      // collapse whitespace
    .trim();
}

/**
 * Helper: Extract word n-grams from text
 */
function extractNGrams(words: string[], n: number): Set<string> {
  const ngrams = new Set<string>();
  if (words.length < n) {
    if (words.length > 0) ngrams.add(words.join(" "));
    return ngrams;
  }
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.add(words.slice(i, i + n).join(" "));
  }
  return ngrams;
}

/**
 * 2. detectRepeatedPhrases()
 * 
 * Finds verbatim phrase sequences of at least `minPhraseLength` words
 * that appear in both texts.
 */
export function detectRepeatedPhrases(
  textA: string,
  textB: string,
  minPhraseLength: number = 4
): string[] {
  const normA = normalizeText(textA);
  const normB = normalizeText(textB);

  const wordsA = normA.split(" ").filter(Boolean);
  const wordsB = normB.split(" ").filter(Boolean);

  if (wordsA.length < minPhraseLength || wordsB.length < minPhraseLength) {
    return [];
  }

  const setB = extractNGrams(wordsB, minPhraseLength);
  const repeated: string[] = [];

  for (let i = 0; i <= wordsA.length - minPhraseLength; i++) {
    const phrase = wordsA.slice(i, i + minPhraseLength).join(" ");
    if (setB.has(phrase) && !repeated.includes(phrase)) {
      repeated.push(phrase);
    }
  }

  return repeated;
}

/**
 * 3. calculateSimilarity()
 * 
 * Computes a hybrid similarity score (0.0 to 1.0) using:
 * - Bigram and Trigram Jaccard similarity (captures phrasing and ordering)
 * - Word token overlap (captures shared vocabulary)
 */
export function calculateSimilarity(textA: string, textB: string): number {
  const normA = normalizeText(textA);
  const normB = normalizeText(textB);

  // Exact match check
  if (normA === normB && normA.length > 0) {
    return 1.0;
  }

  const wordsA = normA.split(" ").filter(Boolean);
  const wordsB = normB.split(" ").filter(Boolean);

  if (wordsA.length === 0 || wordsB.length === 0) {
    return 0.0;
  }

  // 1. Token-level Jaccard
  const setA = new Set(wordsA);
  const setB = new Set(wordsB);
  let intersectionCount = 0;
  setA.forEach((w) => {
    if (setB.has(w)) intersectionCount++;
  });
  const unionCount = new Set([...wordsA, ...wordsB]).size;
  const tokenJaccard = unionCount > 0 ? intersectionCount / unionCount : 0;

  // 2. Shingle / Bigram Jaccard (measures sentence flow & phrase sequence)
  const bigramsA = extractNGrams(wordsA, 2);
  const bigramsB = extractNGrams(wordsB, 2);
  let bigramIntersections = 0;
  bigramsA.forEach((bg) => {
    if (bigramsB.has(bg)) bigramIntersections++;
  });
  const bigramUnion = new Set([...Array.from(bigramsA), ...Array.from(bigramsB)]).size;
  const bigramJaccard = bigramUnion > 0 ? bigramIntersections / bigramUnion : 0;

  // 3. Trigram Jaccard (measures exact multi-word sentence structures)
  const trigramsA = extractNGrams(wordsA, 3);
  const trigramsB = extractNGrams(wordsB, 3);
  let trigramIntersections = 0;
  trigramsA.forEach((tg) => {
    if (trigramsB.has(tg)) trigramIntersections++;
  });
  const trigramUnion = new Set([...Array.from(trigramsA), ...Array.from(trigramsB)]).size;
  const trigramJaccard = trigramUnion > 0 ? trigramIntersections / trigramUnion : 0;

  // Weighted hybrid score: 35% tokens, 35% bigrams, 30% trigrams
  const hybridScore = tokenJaccard * 0.35 + bigramJaccard * 0.35 + trigramJaccard * 0.3;

  return Math.min(1.0, Math.max(0.0, Number(hybridScore.toFixed(4))));
}

/**
 * 4. validateOriginality()
 * 
 * Validates a candidate text against a historical library of previously generated reviews.
 * 
 * Default similarity threshold = 0.68 (68% structural overlap)
 */
export function validateOriginality(
  candidateText: string,
  historyTexts: string[],
  threshold: number = 0.68
): OriginalityCheckResult {
  if (!candidateText || historyTexts.length === 0) {
    return { isValid: true, maxSimilarity: 0.0 };
  }

  let maxSimilarity = 0.0;
  let mostSimilarHistory = "";
  let offendingPhrases: string[] = [];

  for (const histText of historyTexts) {
    const sim = calculateSimilarity(candidateText, histText);
    if (sim > maxSimilarity) {
      maxSimilarity = sim;
      mostSimilarHistory = histText;
      offendingPhrases = detectRepeatedPhrases(candidateText, histText, 4);
    }
  }

  const isTooSimilar = maxSimilarity >= threshold;

  return {
    isValid: !isTooSimilar,
    maxSimilarity,
    offendingText: isTooSimilar ? candidateText : undefined,
    matchedHistoryText: isTooSimilar ? mostSimilarHistory : undefined,
    repeatedPhrases: offendingPhrases,
    reason: isTooSimilar
      ? `Similarity score of ${(maxSimilarity * 100).toFixed(1)}% exceeds originality threshold of ${(threshold * 100)}%`
      : undefined,
  };
}
