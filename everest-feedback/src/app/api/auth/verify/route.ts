import { NextRequest, NextResponse } from "next/server";
import { validateAccessToken, createSessionSignature } from "@/lib/tokenService";

/**
 * TOKEN VERIFICATION ROUTE HANDLER
 * 
 * Verifies access token on the server, creates an HttpOnly secure session cookie,
 * and redirects to clean URL without leaking the token into browser URL history
 * or React Server Component payloads.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("access")?.trim();
  const returnTo = request.nextUrl.searchParams.get("returnTo") || "/everest-feedback";

  // Sanitize returnTo path to prevent open redirects
  const safeReturnPath = returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/everest-feedback";

  const clientIp = request.headers.get("x-forwarded-for") || "unknown";
  const isValid = validateAccessToken(token, clientIp);

  if (!isValid) {
    // Clear any existing cookie and redirect to clean page
    const response = NextResponse.redirect(new URL(safeReturnPath, request.url), 303);
    response.cookies.delete("everest_feedback_session");
    return response;
  }

  // Create cryptographic session signature
  const sessionSig = createSessionSignature();

  // Redirect to clean path and attach HttpOnly cookie
  const response = NextResponse.redirect(new URL(safeReturnPath, request.url), 303);
  response.cookies.set({
    name: "everest_feedback_session",
    value: sessionSig,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 2 * 60 * 60, // 2 hours
  });

  return response;
}
