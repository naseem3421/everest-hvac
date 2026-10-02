import { NextRequest, NextResponse } from "next/server";
import { FeedbackFormData } from "@/types/feedback";
import { generateFeedbackWithOriginalityCheck } from "@/lib/feedbackSynthesizer";
import { verifySessionSignature, validateAccessToken } from "@/lib/tokenService";

/**
 * SECURE SERVER-SIDE API ENDPOINT: /api/generate-feedback
 * 
 * Security & Access Verification:
 * 1. Checks ephemeral session signature (from server-rendered authorized page)
 *    or direct access token header.
 * 2. Master access token is NEVER exposed to client-side bundles or logged.
 * 3. Enforces all 14 anti-hallucination rules.
 * 4. Checks originality and prevents repetition against history.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authorization check
    const sessionCookie = request.cookies.get("everest_feedback_session")?.value;
    const sessionSig = request.headers.get("x-feedback-session");
    const directToken = request.headers.get("x-access-token");

    const isAuthorized =
      verifySessionSignature(sessionCookie) ||
      verifySessionSignature(sessionSig) ||
      validateAccessToken(directToken);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized access: A valid client session is required." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as FeedbackFormData;

    // 2. Validation: Services must be provided
    if (!body || !body.services || !Array.isArray(body.services) || body.services.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one service or project type." },
        { status: 400 }
      );
    }

    // 3. Validation: Consent must be confirmed
    if (!body.consentGiven) {
      return NextResponse.json(
        { error: "Please confirm that this feedback reflects your genuine experience before generating." },
        { status: 400 }
      );
    }

    // 4. Generate the 3 distinct drafts with automated originality check
    const result = await generateFeedbackWithOriginalityCheck(body, 3);

    if (!result.drafts || result.drafts.length === 0) {
      return NextResponse.json(
        { error: "Unable to generate drafts from the provided information. Please review your inputs and try again." },
        { status: 500 }
      );
    }

    // Structured JSON response matching exact specification
    return NextResponse.json(
      {
        drafts: result.drafts.map((d) => ({
          style: d.style,
          text: d.text,
        })),
        meta: {
          originalityVerified: result.meta.originalityVerified,
          generationAttempts: result.meta.attempts,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/generate-feedback:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while creating your feedback drafts. Your entries have been preserved. Please try again.",
      },
      { status: 500 }
    );
  }
}
