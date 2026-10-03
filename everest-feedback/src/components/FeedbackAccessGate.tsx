"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ClientFeedbackPage from "@/app/everest-feedback/ClientFeedbackPage";
import PrivateAccessLocked from "@/components/PrivateAccessLocked";

const ALLOWED_TOKENS = ["EVEREST-CLIENT-2026-SECURE", "EVEREST2026"];

function FeedbackAccessGateContent({ currentPath = "/everest-feedback" }: { currentPath?: string }) {
  const searchParams = useSearchParams();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const rawToken = searchParams.get("access");
    if (rawToken && ALLOWED_TOKENS.includes(rawToken.trim())) {
      try {
        sessionStorage.setItem("everest_feedback_session", "valid");
      } catch {}
      setIsAuthorized(true);
    } else {
      let session = null;
      try {
        session = sessionStorage.getItem("everest_feedback_session");
      } catch {}
      if (session === "valid") {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }
    setIsReady(true);
  }, [searchParams]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-slate-300 border-t-[#0B2545] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthorized) {
    return <ClientFeedbackPage />;
  }

  return <PrivateAccessLocked currentPath={currentPath} />;
}

export default function FeedbackAccessGate({ currentPath = "/everest-feedback" }: { currentPath?: string }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-8 h-8 border-4 border-slate-300 border-t-[#0B2545] rounded-full animate-spin"></div>
        </div>
      }
    >
      <FeedbackAccessGateContent currentPath={currentPath} />
    </Suspense>
  );
}
