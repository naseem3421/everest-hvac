interface ReviewRecord {
  id: string;
  text: string;
  timestamp: string;
}

// Memory cache of recent reviews for high performance
let memoryCache: ReviewRecord[] = [];
let isInitialized = false;

const MAX_HISTORY_ITEMS = 150;
const STORAGE_KEY = "everest_feedback_review_history";

/**
 * Initializes the history cache from localStorage if available (client-side)
 * or in-memory array (server/SSR).
 */
function initStorage() {
  if (isInitialized) return;
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        memoryCache = JSON.parse(data) || [];
      }
    }
  } catch (err) {
    console.warn("Could not read review history from localStorage, using in-memory store:", err);
    memoryCache = [];
  }
  isInitialized = true;
}

/**
 * Retrieves past review texts for originality validation
 */
export function getRecentReviews(limit: number = 100): string[] {
  initStorage();
  return memoryCache.slice(0, limit).map((r) => r.text);
}

/**
 * Persists accepted review drafts into the historical library
 */
export async function saveGeneratedReviews(texts: string[]): Promise<void> {
  initStorage();
  const now = new Date().toISOString();

  const newRecords: ReviewRecord[] = texts
    .filter((t) => t && t.trim().length > 0)
    .map((text, idx) => ({
      id: `${Date.now()}-${idx}`,
      text: text.trim(),
      timestamp: now,
    }));

  // Prepend newest records and cap to MAX_HISTORY_ITEMS
  memoryCache = [...newRecords, ...memoryCache].slice(0, MAX_HISTORY_ITEMS);

  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryCache));
    }
  } catch (err) {
    console.warn("Failed to persist review history to localStorage:", err);
  }
}

/**
 * Clears review history (useful for testing)
 */
export function clearReviewHistory(): void {
  memoryCache = [];
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (err) {
    console.warn("Failed to clear review history from localStorage:", err);
  }
}

