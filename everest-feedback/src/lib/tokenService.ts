import crypto from "node:crypto";

/**
 * TOKEN SERVICE & ACCESS VERIFICATION MODULE
 * 
 * Security Principles:
 * - Master token is never logged.
 * - Master token is never exposed to client-side bundles.
 * - Constant-time comparison prevents timing attacks.
 * - Ephemeral session signature grants access to API routes.
 * - In-memory rate limiting prevents brute-force token enumeration.
 */

// In-memory rate limiter tracking failed attempts: IP/fingerprint -> { count, expiresAt }
interface RateLimitEntry {
  count: number;
  firstAttemptAt: number;
}
const failedAttemptsMap = new Map<string, RateLimitEntry>();
const MAX_FAILED_ATTEMPTS = 10;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Checks if a client identifier is currently rate-limited
 */
export function isRateLimited(identifier: string): boolean {
  cleanupExpiredRateLimits();
  const entry = failedAttemptsMap.get(identifier);
  if (!entry) return false;
  return entry.count >= MAX_FAILED_ATTEMPTS;
}

/**
 * Records a failed verification attempt
 */
export function recordFailedAttempt(identifier: string): void {
  cleanupExpiredRateLimits();
  const now = Date.now();
  const existing = failedAttemptsMap.get(identifier);

  if (!existing) {
    failedAttemptsMap.set(identifier, { count: 1, firstAttemptAt: now });
  } else {
    existing.count += 1;
  }
}

/**
 * Resets failed attempts after a successful login
 */
export function resetFailedAttempts(identifier: string): void {
  failedAttemptsMap.delete(identifier);
}

function cleanupExpiredRateLimits(): void {
  const now = Date.now();
  for (const [key, entry] of failedAttemptsMap.entries()) {
    if (now - entry.firstAttemptAt > RATE_LIMIT_WINDOW_MS) {
      failedAttemptsMap.delete(key);
    }
  }
}

/**
 * Retrieves valid tokens from environment
 * Supports single token or comma-separated list of valid client tokens
 */
function getValidTokens(): string[] {
  const primaryToken = process.env.EVEREST_FEEDBACK_ACCESS_TOKEN?.trim();
  // Also check legacy or fallback config
  const legacyToken = process.env.FEEDBACK_ACCESS_PASSCODE?.trim();

  const tokens: string[] = [];
  if (primaryToken) {
    primaryToken.split(",").forEach((t) => {
      const trimmed = t.trim();
      if (trimmed) tokens.push(trimmed);
    });
  } else if (legacyToken) {
    tokens.push(legacyToken);
  } else {
    // Default fallback in development only
    if (process.env.NODE_ENV !== "production") {
      tokens.push("EVEREST2026");
    }
  }
  return tokens;
}

/**
 * Constant-time string equality check to prevent timing attacks
 */
function timingSafeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Perform dummy comparison to keep constant-ish time
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Validates an access token without logging its contents
 */
export function validateAccessToken(token: string | undefined | null, clientIp: string = "unknown"): boolean {
  if (!token || typeof token !== "string") {
    return false;
  }

  const cleanToken = token.trim();
  if (cleanToken.length === 0) {
    return false;
  }

  // Check rate limit
  if (isRateLimited(clientIp)) {
    return false;
  }

  const validTokens = getValidTokens();
  let isValid = false;

  for (const valid of validTokens) {
    if (timingSafeCompare(cleanToken, valid)) {
      isValid = true;
      break;
    }
  }

  if (isValid) {
    resetFailedAttempts(clientIp);
  } else {
    recordFailedAttempt(clientIp);
  }

  return isValid;
}

/**
 * Generates an ephemeral HMAC session signature for authorized clients.
 * This signature allows /api/generate-feedback to verify that the request
 * was initiated by an authorized session without exposing the master token.
 */
export function createSessionSignature(): string {
  const secret = process.env.SESSION_SECRET || process.env.EVEREST_FEEDBACK_ACCESS_TOKEN || "everest-session-salt-2026";
  const timestamp = Date.now().toString();
  const randomSalt = crypto.randomBytes(8).toString("hex");
  const payload = `${timestamp}:${randomSalt}`;
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  // Format: timestamp.randomSalt.hmac
  return `${payload}.${hmac}`;
}

/**
 * Verifies an ephemeral session signature (valid for 2 hours)
 */
export function verifySessionSignature(signature: string | undefined | null): boolean {
  if (!signature || typeof signature !== "string") {
    return false;
  }

  const parts = signature.split(".");
  if (parts.length !== 2) {
    return false;
  }

  const [payload, incomingHmac] = parts;
  const payloadParts = payload.split(":");
  if (payloadParts.length !== 2) {
    return false;
  }

  const timestamp = parseInt(payloadParts[0], 10);
  if (isNaN(timestamp)) {
    return false;
  }

  // Expiration check: 2 hours (7200000 ms)
  const now = Date.now();
  if (now - timestamp > 2 * 60 * 60 * 1000 || timestamp > now + 60000) {
    return false;
  }

  const secret = process.env.SESSION_SECRET || process.env.EVEREST_FEEDBACK_ACCESS_TOKEN || "everest-session-salt-2026";
  const expectedHmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  return timingSafeCompare(incomingHmac, expectedHmac);
}
