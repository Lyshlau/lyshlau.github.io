"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { createEmptyDay } from "@/lib/state";

interface OnboardingProps {
  onStart: (startDate: string) => void;
}

export default function Onboarding({ onStart }: OnboardingProps) {
  const [startDate, setStartDate] = useState(formatDate(new Date()));

  return (
    <div className="fixed inset-0 z-[200] bg-background flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <h1 className="font-serif text-5xl text-olive mb-2">Wave</h1>
        <p className="text-sm text-charcoal/50 mb-10 leading-relaxed">
          Build sustainable momentum through daily rituals and reflection.
          Progress over perfection.
        </p>

        <div className="bg-white/60 rounded-3xl p-6 shadow-soft mb-6">
          <label
            htmlFor="start-date"
            className="block text-xs uppercase tracking-wider text-charcoal/50 font-medium mb-3"
          >
            When would you like to begin?
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-background border border-sand/50 text-charcoal text-center font-medium focus:outline-none focus:ring-2 focus:ring-sage/50"
          />
          <p className="text-xs text-charcoal/40 mt-3">
            Your 75-day challenge begins on Day 1
          </p>
        </div>

        <button
          onClick={() => onStart(startDate)}
          className="w-full py-4 rounded-2xl bg-olive text-white font-medium shadow-soft active:scale-[0.98] transition-transform"
        >
          Begin Your Journey
        </button>

        <p className="text-xs text-charcoal/30 mt-6 italic">
          Missing a day won&apos;t restart your challenge.
        </p>
      </div>
    </div>
  );
}
