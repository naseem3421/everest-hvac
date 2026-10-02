import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySessionSignature } from "@/lib/tokenService";
import PrivateAccessLocked from "@/components/PrivateAccessLocked";
import ClientFeedbackPage from "./ClientFeedbackPage";

export const metadata: Metadata = {
  title: "Private Client Feedback | Everest Air Conditioning Company",
  description: "Private client review drafting tool for genuine Everest HVAC customers.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EverestFeedbackRoute({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawToken = typeof params.access === "string" ? params.access : undefined;

  // If access token is passed in query string, forward to verification handler to set HttpOnly session cookie
  if (rawToken) {
    redirect(`/api/auth/verify?access=${encodeURIComponent(rawToken)}&returnTo=/everest-feedback`);
  }

  // Check HttpOnly session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("everest_feedback_session")?.value;

  const isAuthorized = verifySessionSignature(sessionCookie);

  if (!isAuthorized) {
    return <PrivateAccessLocked currentPath="/everest-feedback" />;
  }

  return <ClientFeedbackPage sessionSignature={sessionCookie} />;
}
