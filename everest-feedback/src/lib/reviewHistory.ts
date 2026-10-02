import fs from "node:fs";
import path from "node:path";

interface ReviewRecord {
  id: string;
  text: string;
  timestamp: string;
}

// Memory cache of recent reviews for high performance
let memoryCache: ReviewRecord[] = [];
let isInitialized = false;

const MAX_HISTORY_ITEMS = 150;
const STORAGE_DIR = path.join(process.cwd(), ".data");
const STORAGE_FILE = path.join(STORAGE_DIR, "review-history.json");

/**
 * Initializes the history cache from disk if available
 */
function initStorage() {
  if (isInitialized) return;
  try {
    if (!fs.existsSync(STORAGE_DIR)) {
      fs.mkdirSync(STORAGE_DIR, { recursive: true });
    }
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, "utf-8");
      memoryCache = JSON.parse(data) || [];
    }
  } catch (err) {
    console.warn("Could not read review history file, using in-memory store:", err);
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

  // Asynchronously persist to file
  try {
    if (!fs.existsSync(STORAGE_DIR)) {
      fs.mkdirSync(STORAGE_DIR, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(memoryCache, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed to persist review history to disk:", err);
  }
}

/**
 * Clears review history (useful for testing)
 */
export function clearReviewHistory(): void {
  memoryCache = [];
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      fs.unlinkSync(STORAGE_FILE);
    }
  } catch (err) {
    console.warn("Failed to delete review history file:", err);
  }
}
