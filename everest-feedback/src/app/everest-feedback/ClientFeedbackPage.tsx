"use client";

import React, { useRef } from "react";
import Header from "@/components/Header";
import WelcomeSection from "@/components/WelcomeSection";
import FeedbackWorkflow from "@/components/FeedbackWorkflow";
import Footer from "@/components/Footer";

interface ClientFeedbackPageProps {
  sessionSignature?: string;
}

export default function ClientFeedbackPage({ sessionSignature }: ClientFeedbackPageProps) {
  const workflowRef = useRef<HTMLDivElement>(null);

  const handleStartFeedback = () => {
    if (workflowRef.current) {
      workflowRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const el = document.getElementById("feedback-workflow");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-100 selection:text-sky-900">
      {/* 1. Header */}
      <Header />

      <main className="flex-1">
        {/* 2. Welcome section & 3. Supporting text & 4. Primary CTA */}
        <WelcomeSection onStartClick={handleStartFeedback} />

        {/* 5. Feedback workflow container */}
        <div ref={workflowRef}>
          <FeedbackWorkflow sessionSignature={sessionSignature} />
        </div>
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
