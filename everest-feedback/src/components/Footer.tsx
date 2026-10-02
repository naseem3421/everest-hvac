"use client";

import React from "react";
import Image from "next/image";
import { Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center p-1">
              <Image
                src="/logo.png"
                alt="Everest Air Conditioning Company"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0B2545]">
                Everest Air Conditioning Company
              </p>
              <p className="text-xs text-slate-500">
                Commercial HVAC Engineering & Central Plant Contracting
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <Shield className="w-3.5 h-3.5 text-[#134074]" />
            <span>Private Client Portal &bull; Confidential Protocol</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} Everest Air Conditioning Company. All rights reserved.
          </p>
          <p className="text-center sm:text-right max-w-md">
            Dedicated client assistant. Never fabricates claims, equipment, or project metrics.
          </p>
        </div>
      </div>
    </footer>
  );
}
