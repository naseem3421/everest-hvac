"use client";

import React, { useState } from "react";
import {
  SERVICE_CARD_OPTIONS,
  FACILITY_TYPE_OPTIONS,
  APPRECIATED_ASPECT_OPTIONS,
  REVIEW_STYLE_OPTIONS,
} from "../lib/constants";
import { FeedbackFormData } from "../types/feedback";
import {
  generateFeedbackWithOriginalityCheck,
  FeedbackDraftItem,
} from "../lib/feedbackSynthesizer";
import {
  Check,
  Copy,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Star,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Info,
  Edit3,
  AlertCircle,
  FileCheck,
  Loader2,
  CheckCheck,
} from "lucide-react";

export interface APIDraftItem {
  style: "Short & Professional" | "Natural & Conversational" | "Detailed";
  text: string;
}

interface EditableDraftState {
  style: "Short & Professional" | "Natural & Conversational" | "Detailed";
  text: string;
  isEditing: boolean;
  copied: boolean;
}

interface FeedbackWorkflowProps {
  sessionSignature?: string;
}

export default function FeedbackWorkflow({ sessionSignature }: FeedbackWorkflowProps) {
  // Current active step (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State - strictly preserved across all interactions
  const [formData, setFormData] = useState<FeedbackFormData>({
    services: ["Commercial Air Conditioning"],
    otherServiceText: "",
    facilityType: "Office",
    otherFacilityText: "",
    location: "",
    projectCapacity: "",
    yearOfService: "",
    appreciatedAspects: ["Technical expertise", "Timely completion", "Professional team"],
    otherAspectText: "",
    customerWords: "",
    reviewStyle: "short-professional",
    rating: 5,
    consentGiven: false,
  });

  // Step validation errors
  const [stepError, setStepError] = useState<string>("");

  // Generated review state
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [cardDrafts, setCardDrafts] = useState<EditableDraftState[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Read Google Review URL from environment variable (do not hardcode)
  const googleReviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim();
  const isDev = process.env.NODE_ENV !== "production";
  const [hasClickedGoogleShare, setHasClickedGoogleShare] = useState<boolean>(false);
  const [hasCopiedFeedback, setHasCopiedFeedback] = useState<boolean>(false);

  // Navigation handlers with validation
  const goToStep = (targetStep: number) => {
    setStepError("");

    // Validate Step 1 (Services must have at least one selection)
    if (currentStep === 1 && targetStep > 1) {
      if (!formData.services || formData.services.length === 0) {
        setStepError("Please select at least one service or project type to continue.");
        return;
      }
      if (formData.services.includes("Other") && !formData.otherServiceText?.trim()) {
        setStepError("Please specify your service details under 'Other' or uncheck it.");
        return;
      }
    }

    // Scroll to top of workflow container
    const container = document.getElementById("feedback-workflow");
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setCurrentStep(targetStep);
  };

  // Select Service (Step 1 - Single Select)
  const selectService = (label: string) => {
    setStepError("");
    setFormData((prev) => ({
      ...prev,
      services: [label],
      otherServiceText: label === "Other" ? prev.otherServiceText : "",
    }));
  };

  // Toggle Appreciated Aspects (Step 3)
  const toggleAspect = (aspect: string) => {
    setStepError("");
    setFormData((prev) => {
      const exists = prev.appreciatedAspects.includes(aspect);
      if (exists) {
        return {
          ...prev,
          appreciatedAspects: prev.appreciatedAspects.filter((a) => a !== aspect),
        };
      } else {
        return {
          ...prev,
          appreciatedAspects: [...prev.appreciatedAspects, aspect],
        };
      }
    });
  };

  // Generate Review using client-side synthesis engine (zero server dependency & 100% free)
  const handleGenerateReview = async () => {
    setStepError("");

    // Mandatory consent verification
    if (!formData.consentGiven) {
      setStepError(
        "Please confirm that this feedback reflects your genuine experience with Everest Air Conditioning Company before generating."
      );
      return;
    }

    setIsGenerating(true);

    try {
      // Natural brief transition delay for clean UI spinner presentation
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Synthesize 3 distinct drafts with built-in originality & Indian English tuning
      const result = await generateFeedbackWithOriginalityCheck(formData, 3);

      if (!result.drafts || !Array.isArray(result.drafts) || result.drafts.length === 0) {
        throw new Error("Unable to create feedback drafts. Please review your selections and try again.");
      }

      // Convert into editable card state
      const initialCards: EditableDraftState[] = result.drafts.map((d: FeedbackDraftItem) => ({
        style: d.style,
        text: d.text,
        isEditing: false,
        copied: false,
      }));

      setCardDrafts(initialCards);
      setSelectedCardIndex(0);
      setIsGenerated(true);

      const container = document.getElementById("feedback-workflow");
      if (container) {
        container.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to create feedback drafts. Please try again.";
      setStepError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Toggle Edit mode on a specific card
  const handleToggleEditCard = (index: number) => {
    setSelectedCardIndex(index);
    setCardDrafts((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, isEditing: !card.isEditing } : card
      )
    );
  };

  // Modify text on a specific card
  const handleCardTextChange = (index: number, newText: string) => {
    setCardDrafts((prev) =>
      prev.map((card, i) => (i === index ? { ...card, text: newText } : card))
    );
  };

  // Copy text from a specific card
  const handleCopyCard = async (index: number) => {
    const card = cardDrafts[index];
    if (!card) return;

    try {
      await navigator.clipboard.writeText(card.text);
      setSelectedCardIndex(index);
      setHasCopiedFeedback(true);
      setCardDrafts((prev) =>
        prev.map((c, i) => (i === index ? { ...c, copied: true } : { ...c, copied: false }))
      );

      setTimeout(() => {
        setCardDrafts((prev) =>
          prev.map((c, i) => (i === index ? { ...c, copied: false } : c))
        );
      }, 3000);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  // "Share on Google" action
  const handleShareOnGoogle = () => {
    if (!googleReviewUrl) return;

    // Automatically copy the selected card's text to clipboard
    const activeText = cardDrafts[selectedCardIndex]?.text || cardDrafts[0]?.text;
    if (activeText) {
      navigator.clipboard.writeText(activeText).catch(() => {});
      setHasCopiedFeedback(true);
    }

    // Set informational message state (never claims automatic submission)
    setHasClickedGoogleShare(true);

    // Open Google Review URL in a new tab without submitting or clearing feedback
    window.open(googleReviewUrl, "_blank", "noopener,noreferrer");
  };

  // "Start Again" action - clears current session
  const handleStartAgain = () => {
    setHasClickedGoogleShare(false);
    setHasCopiedFeedback(false);
    setFormData({
      services: [],
      otherServiceText: "",
      facilityType: "",
      otherFacilityText: "",
      location: "",
      projectCapacity: "",
      yearOfService: "",
      appreciatedAspects: [],
      otherAspectText: "",
      customerWords: "",
      reviewStyle: "short-professional",
      rating: 5,
      consentGiven: false,
    });
    setCardDrafts([]);
    setIsGenerated(false);
    setStepError("");
    setCurrentStep(1);

    const container = document.getElementById("feedback-workflow");
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Step titles for indicator
  const stepsList = [
    { num: 1, label: "Service" },
    { num: 2, label: "Project" },
    { num: 3, label: "Experience" },
    { num: 4, label: "Your Words" },
    { num: 5, label: "Review" },
  ];

  return (
    <div id="feedback-workflow" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-xs">
        {/* PROGRESS INDICATOR (Hidden on final results view to focus on the drafts) */}
        {!isGenerated && (
          <div className="pb-6 border-b border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#134074]">
                  Step {currentStep} of 5
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B2545] mt-0.5">
                  {currentStep === 1 && "Service / Project Type"}
                  {currentStep === 2 && "Project Context"}
                  {currentStep === 3 && "Service Experience"}
                  {currentStep === 4 && "Your Experience in Your Words"}
                  {currentStep === 5 && "Review Style & Verification"}
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Factual basis only</span>
              </div>
            </div>

            {/* Stepper bar with labels */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 pt-2">
              {stepsList.map((step) => {
                const isPast = currentStep > step.num;
                const isCurrent = currentStep === step.num;
                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => {
                      if (isPast) {
                        goToStep(step.num);
                      }
                    }}
                    disabled={!isPast && !isCurrent}
                    className={`text-left group transition-all ${
                      isPast ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#0B2545]"
                          : isPast
                          ? "bg-emerald-500"
                          : "bg-slate-200"
                      }`}
                    />
                    <div className="mt-2 flex items-center gap-1">
                      <span
                        className={`text-xs font-semibold ${
                          isCurrent
                            ? "text-[#0B2545]"
                            : isPast
                            ? "text-emerald-700"
                            : "text-slate-400"
                        }`}
                      >
                        {step.num}. {step.label}
                      </span>
                      {isPast && <Check className="w-3 h-3 text-emerald-600 inline" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Global Step Validation Notice */}
        {stepError && (
          <div className="mt-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{stepError}</span>
              <p className="text-xs text-rose-600 mt-1">Your entered information has been preserved.</p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 1: SERVICE / PROJECT TYPE */}
        {/* ======================================================== */}
        {currentStep === 1 && !isGenerated && (
          <div className="pt-6 space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Select your service or project type:
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Please choose one project type that best describes Everest&apos;s work for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SERVICE_CARD_OPTIONS.map((item) => {
                const isSelected = formData.services.includes(item.label);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectService(item.label)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-[#0B2545] bg-slate-50/90 shadow-2xs ring-2 ring-[#0B2545]/15"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-bold text-[#0B2545] leading-snug">
                          {item.label}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? "border-2 border-[#0B2545] bg-[#0B2545]"
                              : "border-2 border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* If "Other" is selected, allow user to specify */}
            {formData.services.includes("Other") && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label
                  htmlFor="other-service"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Please specify your other service / project type:
                </label>
                <input
                  id="other-service"
                  type="text"
                  value={formData.otherServiceText || ""}
                  onChange={(e) => {
                    setStepError("");
                    setFormData({ ...formData, otherServiceText: e.target.value });
                  }}
                  placeholder="e.g. Cleanroom HVAC Validation, Thermal Energy Storage, etc."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#134074]"
                  autoFocus
                />
              </div>
            )}

            {/* Step 1 Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">
                {formData.services[0] ? `Selected: ${formData.services[0]}` : "Please select one service"}
              </span>
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                <span>Continue to Project Context</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: PROJECT CONTEXT */}
        {/* ======================================================== */}
        {currentStep === 2 && !isGenerated && (
          <div className="pt-6 space-y-6 sm:space-y-7">
            {/* Guidance */}
            <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 text-sky-900 text-xs sm:text-sm flex items-start gap-2.5">
              <Info className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>All fields in this section are completely optional.</strong> We do not require sensitive business data—only share context you feel comfortable including in a review.
              </span>
            </div>

            {/* Project / facility type */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                Project / Facility Type (Optional)
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Select the building or facility environment for this project:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {FACILITY_TYPE_OPTIONS.map((facility) => {
                  const isSelected = formData.facilityType === facility;
                  return (
                    <button
                      key={facility}
                      type="button"
                      onClick={() => setFormData({ ...formData, facilityType: facility })}
                      className={`text-left px-3.5 py-3 rounded-lg border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#0B2545] bg-slate-50 text-[#0B2545] ring-1 ring-[#0B2545]/20 font-bold"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {facility}
                    </button>
                  );
                })}
              </div>

              {formData.facilityType === "Other" && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={formData.otherFacilityText || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, otherFacilityText: e.target.value })
                    }
                    placeholder="Specify facility type (e.g. Pharmaceutical R&D, Cold Storage)"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#134074]"
                  />
                </div>
              )}
            </div>

            {/* Location & Project capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="location-field"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Location (Optional)
                </label>
                <input
                  id="location-field"
                  type="text"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Chennai, OMR, Coimbatore, or Bangalore"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#134074]"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  City or area name only.
                </span>
              </div>

              <div>
                <label
                  htmlFor="capacity-field"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Project Capacity (Optional)
                </label>
                <input
                  id="capacity-field"
                  type="text"
                  value={formData.projectCapacity || ""}
                  onChange={(e) => setFormData({ ...formData, projectCapacity: e.target.value })}
                  placeholder="e.g. 150 TR, 60 HP, or 40,000 sq ft"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#134074]"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  HVAC tonnage, HP, or floor area.
                </span>
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Service</span>
              </button>

              <button
                type="button"
                onClick={() => goToStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                <span>Continue to Experience</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: EXPERIENCE */}
        {/* ======================================================== */}
        {currentStep === 3 && !isGenerated && (
          <div className="pt-6 space-y-6">
            <div>
              <label className="block text-base font-bold text-slate-800">
                What aspects of our service did you appreciate?
              </label>
              <p className="text-xs text-slate-500 mt-1">
                Select all aspects that truthfully reflect your engagement with our team:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {APPRECIATED_ASPECT_OPTIONS.map((aspect) => {
                const isChecked = formData.appreciatedAspects.includes(aspect);
                return (
                  <button
                    key={aspect}
                    type="button"
                    onClick={() => toggleAspect(aspect)}
                    className={`text-left px-3.5 py-3 rounded-lg border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isChecked
                        ? "bg-slate-50 border-[#0B2545] text-[#0B2545] ring-1 ring-[#0B2545]/20 font-semibold"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <span>{aspect}</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ml-2 transition-colors ${
                        isChecked ? "bg-[#0B2545] text-white" : "border border-slate-300 bg-white"
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* If "Other" is checked in Step 3 */}
            {formData.appreciatedAspects.includes("Other") && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label
                  htmlFor="other-aspect"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Specify other aspect you appreciated:
                </label>
                <input
                  id="other-aspect"
                  type="text"
                  value={formData.otherAspectText || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, otherAspectText: e.target.value })
                  }
                  placeholder="e.g. Excellent safety briefing, Clean chiller room piping, etc."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#134074]"
                  autoFocus
                />
              </div>
            )}

            {/* Step 3 Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Project</span>
              </button>

              <button
                type="button"
                onClick={() => goToStep(4)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                <span>Continue to Your Words</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 4: CUSTOMER'S OWN WORDS */}
        {/* ======================================================== */}
        {currentStep === 4 && !isGenerated && (
          <div className="pt-6 space-y-6">
            <div>
              <label
                htmlFor="customer-own-words"
                className="block text-base font-bold text-slate-800 mb-1"
              >
                Tell us briefly about your experience in your own words.
              </label>
              <p className="text-xs text-slate-500 leading-relaxed">
                This field is important. We do not force you to write a review, but your authentic notes give future clients the most honest picture of working with Everest.
              </p>
            </div>

            <div className="relative">
              <textarea
                id="customer-own-words"
                rows={5}
                value={formData.customerWords}
                onChange={(e) => setFormData({ ...formData, customerWords: e.target.value })}
                placeholder="For example: What work did Everest handle, how was the team, and what stood out to you?"
                className="w-full p-4 rounded-xl border border-slate-300 text-slate-900 text-sm sm:text-base leading-relaxed placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#134074] shadow-2xs"
              />
              <div className="flex items-center justify-between mt-1 text-xs text-slate-400">
                <span>Your exact words take priority during draft synthesis.</span>
                <span>{formData.customerWords.length} characters</span>
              </div>
            </div>

            {/* Star Rating Selection */}
            <div className="pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Overall Google Star Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1 rounded-md hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                    aria-label={`${star} star rating`}
                  >
                    <Star
                      className={`w-7 h-7 sm:w-8 sm:h-8 ${
                        star <= formData.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-100 text-slate-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-3 text-sm font-semibold text-slate-700">
                  {formData.rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Step 4 Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Experience</span>
              </button>

              <button
                type="button"
                onClick={() => goToStep(5)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                <span>Continue to Review Style</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 5: REVIEW (Style + Consent + Output) */}
        {/* ======================================================== */}
        {currentStep === 5 && !isGenerated && (
          <div className="pt-6 space-y-6 sm:space-y-8">
            {/* Loading state during generation */}
            {isGenerating ? (
              <div className="py-14 px-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-9 h-9 text-[#134074] animate-spin" />
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#0B2545]">
                    Creating your feedback drafts...
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
                    Synthesizing your verified project details into 3 distinct, authentic Google review variations.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Review Style Options */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1">
                    Choose your initial Review Style:
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Select the tone that best reflects your communication preference. All 3 drafts will be generated.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {REVIEW_STYLE_OPTIONS.map((styleOpt) => {
                      const isSelected = formData.reviewStyle === styleOpt.id;
                      return (
                        <button
                          key={styleOpt.id}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, reviewStyle: styleOpt.id })
                          }
                          className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#0B2545] bg-slate-50 shadow-2xs ring-2 ring-[#0B2545]/15"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-[#0B2545]">
                              {styleOpt.label}
                            </span>
                            <div
                              className={`w-3.5 h-3.5 rounded-full border ${
                                isSelected ? "border-[#0B2545] bg-[#0B2545]" : "border-slate-300"
                              }`}
                            />
                          </div>
                          <span className="text-[11px] font-semibold text-[#134074] uppercase tracking-wider block mb-1">
                            {styleOpt.tagline}
                          </span>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {styleOpt.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Summary preview of facts provided */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#0B2545]">
                    <FileCheck className="w-4 h-4 text-[#134074]" />
                    <span>Summary of Verified Facts Provided:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 text-xs sm:text-sm">
                    <li>
                      <strong>Services:</strong> {formData.services.join(", ")}
                      {formData.otherServiceText ? ` (${formData.otherServiceText})` : ""}
                    </li>
                    {formData.facilityType && (
                      <li>
                        <strong>Facility / Context:</strong> {formData.facilityType}
                        {formData.location ? ` in ${formData.location}` : ""}
                        {formData.projectCapacity ? ` (${formData.projectCapacity})` : ""}
                      </li>
                    )}
                    {formData.appreciatedAspects.length > 0 && (
                      <li>
                        <strong>Appreciated:</strong> {formData.appreciatedAspects.join(", ")}
                      </li>
                    )}
                    {formData.customerWords && (
                      <li>
                        <strong>Your words:</strong> &ldquo;{formData.customerWords}&rdquo;
                      </li>
                    )}
                  </ul>
                </div>

                {/* MANDATORY CONSENT CHECKBOX */}
                <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-300">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentGiven}
                      onChange={(e) => {
                        setStepError("");
                        setFormData({ ...formData, consentGiven: e.target.checked });
                      }}
                      className="mt-0.5 w-4 h-4 text-[#0B2545] rounded border-slate-300 focus:ring-[#134074] cursor-pointer"
                      required
                    />
                    <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                      I confirm that this feedback reflects my genuine experience with Everest Air Conditioning Company.
                    </span>
                  </label>
                </div>

                {/* Step 5 Generation CTA */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => goToStep(4)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Your Words</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGenerateReview}
                    disabled={isGenerating || !formData.consentGiven}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-base font-semibold transition-all shadow-sm hover:shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-4 h-4 text-sky-300" />
                    <span>Generate Review Drafts</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* FINAL FEEDBACK RESULTS INTERFACE */}
        {/* ======================================================== */}
        {isGenerated && (
          <div className="pt-2 space-y-8">
            {/* Heading & Supporting Text */}
            <div className="text-left border-b border-slate-100 pb-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Hallucination Verified</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
                Your Feedback Drafts
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                Choose the version that best reflects your experience. You can edit it before sharing.
              </p>
            </div>

            {/* DISPLAY 3 CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {cardDrafts.map((card, idx) => {
                const isSelected = selectedCardIndex === idx;
                return (
                  <div
                    key={card.style}
                    onClick={() => setSelectedCardIndex(idx)}
                    className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer ${
                      isSelected
                        ? "border-[#0B2545] bg-white shadow-md ring-2 ring-[#0B2545]/15"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    {/* Card Header: Style Label & Character Count */}
                    <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#0B2545] text-white">
                        {card.style}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {card.text.length} chars
                      </span>
                    </div>

                    {/* Card Content: Text or Editable Textarea */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                      {card.isEditing ? (
                        <div className="flex-1 flex flex-col">
                          <label
                            htmlFor={`edit-area-${idx}`}
                            className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3 text-[#134074]" />
                            Editing feedback text:
                          </label>
                          <textarea
                            id={`edit-area-${idx}`}
                            rows={7}
                            value={card.text}
                            onChange={(e) => handleCardTextChange(idx, e.target.value)}
                            className="w-full flex-1 p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#134074]"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <p className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line flex-1">
                          {card.text}
                        </p>
                      )}
                    </div>

                    {/* Card Footer Buttons: Edit & Copy Feedback */}
                    <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/40 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleToggleEditCard(idx)}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{card.isEditing ? "Done" : "Edit"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopyCard(idx)}
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          card.copied
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "bg-[#0B2545] hover:bg-[#134074] text-white"
                        }`}
                      >
                        {card.copied ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Feedback</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* STEP 1 REASSURANCE BANNER: Ensure customer has copied feedback */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                hasCopiedFeedback
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                  : "bg-amber-50/90 border-amber-300 text-amber-950"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2 rounded-xl flex-shrink-0 mt-0.5 ${
                    hasCopiedFeedback ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"
                  }`}
                >
                  {hasCopiedFeedback ? (
                    <CheckCheck className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <h4 className="text-sm sm:text-base font-bold text-[#0B2545]">
                      {hasCopiedFeedback
                        ? "Feedback is copied to your clipboard!"
                        : "Step 1: Copy your preferred feedback above"}
                    </h4>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-block w-fit ${
                        hasCopiedFeedback
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}
                    >
                      {hasCopiedFeedback ? "✓ Ready to Paste" : "Action Required"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {hasCopiedFeedback ? (
                      <>
                        Your feedback draft is safely copied to your clipboard. Next, click <strong>Share on Google</strong> below and simply <strong>Paste (Ctrl+V)</strong> into the Google review box.
                      </>
                    ) : (
                      <>
                        Please click <strong>&ldquo;Copy Feedback&rdquo;</strong> on the card above that best reflects your experience. This ensures your feedback is copied before Google opens so you can paste it easily.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* SEPARATE CTA SECTION: Ready to share your experience? */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="max-w-xl">
                  <h4 className="text-xl sm:text-2xl font-bold text-[#0B2545]">
                    Ready to share your experience?
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    You can post your feedback directly on Google. Please review and edit the text so it accurately reflects your experience.
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Selected version is copied automatically to your clipboard when you click the button.
                  </p>

                  {/* Informational post-click advice */}
                  {hasClickedGoogleShare && (
                    <div className="mt-4 p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 text-xs sm:text-sm space-y-1.5">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold">
                          Please review your feedback before posting and make sure it accurately reflects your experience.
                        </span>
                      </div>
                      <p className="text-xs text-sky-800 pl-6">
                        Your text is copied to your clipboard. Just right-click and paste (or Ctrl+V) into Google!
                      </p>
                    </div>
                  )}
                </div>

                {/* Google Review Button or Environment Variable Warning */}
                <div className="flex-shrink-0">
                  {googleReviewUrl ? (
                    <button
                      type="button"
                      onClick={handleShareOnGoogle}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-sm sm:text-base font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <span>Share on Google</span>
                      <ExternalLink className="w-4 h-4 text-sky-300" />
                    </button>
                  ) : isDev ? (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs max-w-sm">
                      <p className="font-bold flex items-center gap-1.5 text-amber-900">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Admin Notice (Dev Mode Only):
                      </p>
                      <p className="mt-1">
                        <code>NEXT_PUBLIC_GOOGLE_REVIEW_URL</code> is not configured. In production, this button is hidden until set.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Bottom Controls: Adjust & Start Again */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsGenerated(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Adjust Questionnaire</span>
              </button>

              <button
                type="button"
                onClick={handleStartAgain}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-slate-500 hover:text-rose-600 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
