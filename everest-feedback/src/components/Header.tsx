import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";

interface HeaderProps {
  isLocked?: boolean;
}

export default function Header({ isLocked = false }: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand identity */}
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

        {/* Private session indicator */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200">
          <Lock className="w-3.5 h-3.5 text-[#134074]" />
          <span className="hidden xs:inline">{isLocked ? "Access Verification" : "Private Client Portal"}</span>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${isLocked ? "bg-amber-500" : "bg-emerald-500"}`} />
        </div>
      </div>
    </header>
  );
}
