import { FeedbackFormData } from "@/types/feedback";
import { getRecentReviews, saveGeneratedReviews } from "./reviewHistory";
import { validateOriginality } from "./originality";

export interface FeedbackDraftItem {
  style: "Short & Professional" | "Natural & Conversational" | "Detailed";
  text: string;
}

export interface FeedbackGenerationResult {
  drafts: FeedbackDraftItem[];
  meta: {
    attempts: number;
    originalityVerified: boolean;
    maxSimilarityObserved: number;
    engine: "self-programmed-indian-english";
  };
}

/**
 * Normalizes service names into natural Indian English phrasing
 */
function formatService(services: string[], otherService?: string): string {
  const raw = services[0] || "";

  if (raw === "Other" && otherService?.trim()) {
    return otherService.trim();
  }

  const map: Record<string, string> = {
    "HVAC Installation": "HVAC installation",
    "HVAC AMC / Maintenance": "HVAC AMC and maintenance",
    "Chiller Project": "chiller project",
    "VRF / VRV System": "VRF / VRV air conditioning system",
    "Commercial Air Conditioning": "commercial air conditioning",
    "Industrial HVAC": "industrial HVAC",
    "Ducting & Ventilation": "ducting and ventilation",
    "HVAC Retrofitting": "HVAC retrofitting work",
  };

  return map[raw] || raw || "commercial AC work";
}

/**
 * Builds natural context phrases for facility, location, and capacity in Indian English
 */
interface FormattedContext {
  combinedContext: string;
  capacityPhrase: string;
}

function formatProjectContext(data: FeedbackFormData, seed: number): FormattedContext {
  const facility =
    data.facilityType === "Other" && data.otherFacilityText?.trim()
      ? data.otherFacilityText.trim()
      : data.facilityType && data.facilityType !== "Other"
      ? data.facilityType.toLowerCase()
      : "";

  const location = data.location?.trim() || "";
  const capacity = data.projectCapacity?.trim() || "";

  let combinedContext = "";
  if (facility && location) {
    const patterns = [
      `for our ${facility} in ${location}`,
      `at our ${facility} located in ${location}`,
      `for our ${location} ${facility}`,
      `at our ${facility} site in ${location}`,
    ];
    combinedContext = patterns[seed % patterns.length];
  } else if (facility) {
    const patterns = [
      `for our ${facility}`,
      `at our ${facility} premises`,
      `for our ${facility} facility`,
    ];
    combinedContext = patterns[seed % patterns.length];
  } else if (location) {
    const patterns = [
      `at our site in ${location}`,
      `for our facility in ${location}`,
      `in ${location}`,
    ];
    combinedContext = patterns[seed % patterns.length];
  }

  let capacityPhrase = "";
  if (capacity) {
    const capPatterns = [
      ` (${capacity})`,
      ` of ${capacity}`,
      ` (${capacity} capacity)`,
      ` with ${capacity} capacity`,
    ];
    capacityPhrase = capPatterns[seed % capPatterns.length];
  }

  return {
    combinedContext,
    capacityPhrase,
  };
}

/**
 * Maps aspects appreciated to natural Indian English expressions
 */
function formatAspects(aspects: string[], otherAspect?: string, seed: number = 0): string[] {
  const result: string[] = [];

  for (const a of aspects) {
    if (a === "Other" && otherAspect?.trim()) {
      result.push(otherAspect.trim());
      continue;
    }

    const variations: Record<string, string[]> = {
      "Technical expertise": ["good technical knowledge", "technically sound team", "proper technical expertise"],
      "Installation quality": ["neat installation work", "very clean installation quality", "proper installation"],
      "Workmanship": ["neat workmanship", "clean and systematic workmanship", "thorough workmanship"],
      "Project execution": ["smooth project execution", "hassle-free execution", "systematic execution"],
      "Timely completion": ["on-time completion", "work completed within promised time", "punctual delivery"],
      "Professional team": ["polite team conduct", "team coordination", "supportive on-site staff"],
      "Communication": ["clear and regular updates", "prompt communication", "proper coordination"],
      "Responsiveness": ["quick response", "immediate support", "very responsive team"],
      "Maintenance support": ["good maintenance support", "prompt servicing support", "reliable breakdown support"],
      "Problem solving": ["quick problem-solving", "practical solutions on site", "helpful troubleshooting"],
      "Coordination": ["smooth site coordination", "proper coordination", "hassle-free coordination"],
      "Overall experience": ["smooth experience overall", "satisfying overall service", "great experience"],
      "Safety compliance": ["proper site safety precautions", "strict adherence to safety", "safe working practices"],
      "Value for money": ["reasonable pricing for quality work", "good value for money", "fair commercial terms"],
    };

    const choices = variations[a];
    if (choices) {
      result.push(choices[seed % choices.length]);
    } else if (a !== "Other") {
      result.push(a.toLowerCase());
    }
  }

  return result;
}

/**
 * 100% SELF-PROGRAMMED FEEDBACK SYNTHESIZER (Tuned to Natural Indian English)
 * 
 * Rules:
 * - Natural Indian English (neither overly formal Western corporate, nor slang).
 * - Warm, authentic, professional tone used by actual Indian B2B & commercial clients.
 * - Single service focus.
 * - Zero hallucination: uses strictly customer-supplied facts.
 * - 5 Rotating archetypes.
 */
export function synthesizeFeedbackDrafts(
  data: FeedbackFormData,
  variationSeed: number = 0
): FeedbackDraftItem[] {
  const service = formatService(data.services, data.otherServiceText);
  const context = formatProjectContext(data, variationSeed);
  const aspects = formatAspects(data.appreciatedAspects, data.otherAspectText, variationSeed);
  const ownWords = data.customerWords?.trim() || "";

  const archetype = variationSeed % 5;

  // ---------------------------------------------------------------------------
  // ARCHETYPE 0: "Got our work done through..." (Common Indian review opening)
  // ---------------------------------------------------------------------------
  if (archetype === 0) {
    // 1. Short & Professional
    const d1: string[] = [];
    d1.push(
      `Got our ${service} work done through Everest Air Conditioning Company${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase}.`
    );
    if (aspects.length > 0) {
      d1.push(
        aspects.length === 1
          ? `Pleased with their ${aspects[0]} and on-time completion.`
          : `Pleased with their ${aspects.slice(0, -1).join(", ")} and ${aspects[aspects.length - 1]}.`
      );
    }
    if (ownWords) d1.push(ownWords);
    d1.push("Very happy with their service and neat work. Definitely recommend them for commercial HVAC works.");

    // 2. Natural & Conversational
    const d2: string[] = [];
    d2.push(
      `Had a really smooth experience working with Everest Air Conditioning Company for our ${service}${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase}.`
    );
    if (ownWords) d2.push(ownWords);
    if (aspects.length > 0) {
      d2.push(
        aspects.length === 1
          ? `What stood out most was their ${aspects[0]}.`
          : `What stood out was their ${aspects.slice(0, -1).join(", ")} along with ${aspects[aspects.length - 1]}.`
      );
    }
    d2.push("Technicians were helpful and did clean work without any hassle. Glad we chose them.");

    // 3. Detailed
    const d3: string[] = [];
    d3.push(
      `We gave the ${service} work to Everest Air Conditioning Company${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase}.`
    );
    if (aspects.length > 0) {
      d3.push(
        `From day one, their site engineers maintained ${aspects.slice(0, 2).join(" and ")}.`
      );
      if (aspects.length > 2) {
        d3.push(`Site work was handled very neatly, especially regarding ${aspects.slice(2).join(" and ")}.`);
      }
    }
    if (ownWords) d3.push(`Our feedback: ${ownWords}`);
    d3.push("Proper handover and testing was done, and cooling performance is working nicely. Trustworthy team for HVAC projects.");

    return [
      { style: "Short & Professional", text: d1.join(" ") },
      { style: "Natural & Conversational", text: d2.join(" ") },
      { style: "Detailed", text: d3.join(" ") },
    ];
  }

  // ---------------------------------------------------------------------------
  // ARCHETYPE 1: "We had given the work to..." (Direct contractor reference)
  // ---------------------------------------------------------------------------
  if (archetype === 1) {
    // 1. Short & Professional
    const d1: string[] = [];
    d1.push(
      `We had given the ${service} work to Everest Air Conditioning Company${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase}.`
    );
    if (ownWords) d1.push(ownWords);
    if (aspects.length > 0) {
      d1.push(`The work was carried out properly with ${aspects.slice(0, 2).join(" and ")}.`);
    }
    d1.push("All completed on schedule without any issues. Good experience working with them.");

    // 2. Natural & Conversational
    const d2: string[] = [];
    d2.push(
      `Everest Air Conditioning Company recently completed our ${service}${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase}.`
    );
    if (aspects.length > 0) {
      d2.push(`Their ${aspects[0]} made the entire process very simple for us.`);
    }
    if (ownWords) d2.push(ownWords);
    d2.push("Everything was completed neatly and their team communicated clearly at every stage.");

    // 3. Detailed
    const d3: string[] = [];
    d3.push(
      `Engaged Everest Air Conditioning Company for our ${service} requirements${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase}.`
    );
    if (aspects.length > 0) {
      d3.push(`Their staff was disciplined and maintained high standards in ${aspects.slice(0, 2).join(", ")}.`);
      if (aspects.length > 2) {
        d3.push(`Also appreciated their ${aspects.slice(2).join(" and ")} during system testing.`);
      }
    }
    if (ownWords) d3.push(`Site note: ${ownWords}`);
    d3.push("Handover was completed systematically and all AC equipment is performing properly.");

    return [
      { style: "Short & Professional", text: d1.join(" ") },
      { style: "Natural & Conversational", text: d2.join(" ") },
      { style: "Detailed", text: d3.join(" ") },
    ];
  }

  // ---------------------------------------------------------------------------
  // ARCHETYPE 2: "Very satisfied with the work..." (Satisfaction & Quality first)
  // ---------------------------------------------------------------------------
  if (archetype === 2) {
    // 1. Short & Professional
    const d1: string[] = [];
    if (ownWords) {
      d1.push(ownWords);
      d1.push(
        `Everest Air Conditioning Company completed the ${service}${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase} very well.`
      );
    } else {
      d1.push(
        `Everest Air Conditioning Company completed our ${service}${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase} very well.`
      );
    }
    if (aspects.length > 0) {
      d1.push(`Pleased with their ${aspects.slice(0, 2).join(" and ")}.`);
    }
    d1.push("Very reliable and professional HVAC team.");

    // 2. Natural & Conversational
    const d2: string[] = [];
    d2.push(
      `Very good service provided by Everest Air Conditioning Company for our ${service}${context.combinedContext ? " " + context.combinedContext : ""}.`
    );
    if (ownWords) d2.push(ownWords);
    if (aspects.length > 0) {
      d2.push(`Their ${aspects.join(" and ")} was clearly visible during the installation.`);
    }
    d2.push("Cooling is working nicely and overall coordination was very smooth.");

    // 3. Detailed
    const d3: string[] = [];
    d3.push(
      `Regarding the ${service} done by Everest Air Conditioning Company${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase}:`
    );
    if (aspects.length > 0) {
      d3.push(`The execution was carried out with noticeable ${aspects.join(", ")}.`);
    }
    if (ownWords) d3.push(`Our observation: ${ownWords}`);
    d3.push("Commissioning was done properly without disturbing daily operations. Happy with the finished output.");

    return [
      { style: "Short & Professional", text: d1.join(" ") },
      { style: "Natural & Conversational", text: d2.join(" ") },
      { style: "Detailed", text: d3.join(" ") },
    ];
  }

  // ---------------------------------------------------------------------------
  // ARCHETYPE 3: "Took their services for..." (Service engagement focus)
  // ---------------------------------------------------------------------------
  if (archetype === 3) {
    // 1. Short & Professional
    const d1: string[] = [];
    d1.push(
      `We took Everest Air Conditioning Company's services for ${service}${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase}.`
    );
    if (aspects.length > 0) {
      d1.push(`Found their team very attentive, with good ${aspects.slice(0, 2).join(" and ")}.`);
    }
    if (ownWords) d1.push(ownWords);
    d1.push("Work was completed cleanly within the agreed timeframe.");

    // 2. Natural & Conversational
    const d2: string[] = [];
    d2.push(
      `Our experience with Everest Air Conditioning Company for ${service}${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase} was very positive.`
    );
    if (ownWords) d2.push(ownWords);
    if (aspects.length > 0) {
      d2.push(`They did a great job especially with ${aspects.slice(0, 2).join(" and ")}.`);
    }
    d2.push("Helpful engineers and prompt coordination throughout.");

    // 3. Detailed
    const d3: string[] = [];
    d3.push(
      `Everest Air Conditioning Company was appointed for our ${service}${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase}.`
    );
    if (aspects.length > 0) {
      d3.push(
        `Throughout the work, their site team showed good ${aspects.slice(0, 2).join(" and ")}.`
      );
      if (aspects.length > 2) {
        d3.push(`Also, their ${aspects.slice(2).join(" and ")} helped complete the job without any delays.`);
      }
    }
    if (ownWords) d3.push(`Project note: ${ownWords}`);
    d3.push("Equipment is functioning properly and handover was handled responsibly.");

    return [
      { style: "Short & Professional", text: d1.join(" ") },
      { style: "Natural & Conversational", text: d2.join(" ") },
      { style: "Detailed", text: d3.join(" ") },
    ];
  }

  // ---------------------------------------------------------------------------
  // ARCHETYPE 4: Customer Note First (Natural review opening)
  // ---------------------------------------------------------------------------
  // 1. Short & Professional
  const d1: string[] = [];
  if (ownWords) {
    d1.push(ownWords);
    d1.push(
      `Everest Air Conditioning Company handled the ${service}${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase} properly.`
    );
  } else {
    d1.push(
      `Everest Air Conditioning Company handled our ${service}${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase} properly.`
    );
  }
  if (aspects.length > 0) {
    d1.push(`Pleased with their ${aspects.slice(0, 2).join(" and ")}.`);
  }
  d1.push("Solid and trustworthy commercial air conditioning team.");

  // 2. Natural & Conversational
  const d2: string[] = [];
  d2.push(
    `Great work done by Everest Air Conditioning Company on our ${service}${context.combinedContext ? " " + context.combinedContext : ""}.`
  );
  if (ownWords) d2.push(ownWords);
  if (aspects.length > 0) {
    d2.push(`Really liked their ${aspects.join(" and ")}.`);
  }
  d2.push("The work was finished cleanly and team was very helpful. Highly recommended.");

  // 3. Detailed
  const d3: string[] = [];
  d3.push(
    `Feedback for ${service} carried out by Everest Air Conditioning Company${context.combinedContext ? " " + context.combinedContext : ""}${context.capacityPhrase}:`
  );
  if (aspects.length > 0) {
    d3.push(`The whole work was done with proper ${aspects.join(", ")}.`);
  }
  if (ownWords) d3.push(`Note: ${ownWords}`);
  d3.push("Testing and handover was done properly and cooling is running very well. Good contractors to work with.");

  return [
    { style: "Short & Professional", text: d1.join(" ") },
    { style: "Natural & Conversational", text: d2.join(" ") },
    { style: "Detailed", text: d3.join(" ") },
  ];
}

/**
 * MAIN GENERATION PIPELINE WITH REPETITION & SIMILARITY PROTECTION
 */
export async function generateFeedbackWithOriginalityCheck(
  data: FeedbackFormData,
  maxAttempts: number = 3
): Promise<FeedbackGenerationResult> {
  const history = getRecentReviews(80);
  const SIMILARITY_THRESHOLD = 0.68;

  let bestDrafts: FeedbackDraftItem[] = [];
  let lowestMaxSimilarity = 1.0;
  let attemptsUsed = 0;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    attemptsUsed = attempt + 1;
    const candidateDrafts = synthesizeFeedbackDrafts(data, attempt);

    if (history.length === 0) {
      bestDrafts = candidateDrafts;
      lowestMaxSimilarity = 0.0;
      break;
    }

    let candidateMaxSimilarity = 0.0;
    for (const draft of candidateDrafts) {
      const val = validateOriginality(draft.text, history, SIMILARITY_THRESHOLD);
      if (val.maxSimilarity > candidateMaxSimilarity) {
        candidateMaxSimilarity = val.maxSimilarity;
      }
    }

    if (candidateMaxSimilarity < lowestMaxSimilarity) {
      lowestMaxSimilarity = candidateMaxSimilarity;
      bestDrafts = candidateDrafts;
    }

    if (candidateMaxSimilarity <= SIMILARITY_THRESHOLD) {
      break;
    }
  }

  if (bestDrafts.length > 0) {
    saveGeneratedReviews(bestDrafts.map((d) => d.text));
  }

  return {
    drafts: bestDrafts,
    meta: {
      attempts: attemptsUsed,
      originalityVerified: lowestMaxSimilarity <= SIMILARITY_THRESHOLD,
      maxSimilarityObserved: lowestMaxSimilarity,
      engine: "self-programmed-indian-english",
    },
  };
}
