"use client";

import React from "react";
import { MessageSquareText, Shield, ArrowDown, CheckCircle2 } from "lucide-react";

interface WelcomeSectionProps {
  onStartClick: () => void;
}

export default function WelcomeSection({ onStartClick }: WelcomeSectionProps) {
  return (
    <section className="py-10 sm:py-14 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Verification badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wide uppercase mb-6 border border-slate-200">
          <Shield className="w-3.5 h-3.5 text-[#134074]" />
          Verified Client Feedback Assistant
        </div>

        {/* 2. Welcome section */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2545] tracking-tight leading-tight">
          We Value Your Feedback
        </h2>

        {/* 3. Supporting text */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Your experience helps us improve our HVAC services and helps future clients understand what it is like to work with our team.
        </p>

        {/* Integrity note */}
        <div className="mt-6 max-w-xl mx-auto p-3.5 rounded-lg bg-sky-50/80 border border-sky-100 text-sky-900 text-xs sm:text-sm text-left flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
          <p className="leading-normal">
            <strong>Authentic Experience Only:</strong> This assistant helps formulate your genuine project notes into a polished review. We never fabricate equipment, metrics, or experiences.
          </p>
        </div>

        {/* 4. Primary CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onStartClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-200 cursor-pointer"
          >
            <MessageSquareText className="w-5 h-5 text-sky-300" />
            <span>Share Your Experience</span>
            <ArrowDown className="w-4 h-4 text-slate-300 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
