import React from "react";
import Image from "next/image";
import { Lock, ArrowRight } from "lucide-react";

interface PrivateAccessLockedProps {
  currentPath?: string;
}

export default function PrivateAccessLocked({ currentPath = "/everest-feedback" }: PrivateAccessLockedProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 bg-slate-50 border border-slate-200 rounded-lg p-1.5 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="Everest Air Conditioning Company Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-[#0B2545] tracking-tight leading-tight">
                Everest Air Conditioning Company
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-normal hidden sm:block">
                Commercial HVAC Engineering & Contracting
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200">
            <Lock className="w-3.5 h-3.5 text-[#134074]" />
            <span>Private Access</span>
          </div>
        </div>
      </header>

      {/* Main Locked Message */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-10">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-7 sm:p-10 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-[#0B2545] mb-6">
            <Lock className="w-7 h-7 text-[#134074]" />
          </div>

          {/* Heading */}
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3 border border-slate-200">
            Private Feedback Portal
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Private Feedback Portal
          </h2>

          {/* Supporting Text */}
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
            This feedback page is available to Everest Air Conditioning Company clients through a private access link.
          </p>

          {/* Token entry form for clients holding a token */}
          <form action={currentPath} method="GET" className="mt-8 text-left space-y-4">
            <div>
              <label
                htmlFor="access-token-input"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Access Token
              </label>
              <input
                id="access-token-input"
                name="access"
                type="password"
                placeholder="Enter client access token"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#134074] shadow-xs"
                required
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#0B2545] hover:bg-[#134074] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Continue to Feedback</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-6 text-xs text-slate-400 leading-normal">
            If you are a client of Everest Air Conditioning Company and require access, please contact your project manager.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} Everest Air Conditioning Company. All rights reserved.</p>
        <p className="mt-1">Private Client Communication Protocol</p>
      </footer>
    </div>
  );
}
