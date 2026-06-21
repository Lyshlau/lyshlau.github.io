"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";

interface OnboardingProps {
  onStart: (startDate: string) => void;
}

export default function Onboarding({ onStart }: OnboardingProps) {
  const [startDate, setStartDate] = useState(formatDate(new Date()));

  return (
    <div className="fixed inset-0 z-[200] bg-background flex items-center justify-center px-8">
      <div className="max-w-sm w-full text-center">
        <h1 className="font-serif text-[3.5rem] leading-none text-olive font-normal tracking-tight">
          Wave
        </h1>
        <p className="body-soft mt-6 mb-16 leading-relaxed">
          Build sustainable momentum through daily rituals and reflection.
          Progress over perfection.
        </p>

        <div className="border border-sand/30 bg-white/25 rounded-sm p-8 mb-10 text-left">
          <label
            htmlFor="start-date"
            className="label-caps block mb-5"
          >
            Begin your journey
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-4 rounded-sm bg-background border border-sand/40 text-charcoal text-center font-light tracking-wide focus:outline-none focus:border-sage/60 transition-colors"
          />
          <p className="text-[12px] text-charcoal/35 mt-4 text-center font-light">
            Your 75-day practice begins on Day 1
          </p>
        </div>

        <button onClick={() => onStart(startDate)} className="btn-primary">
          Begin
        </button>

        <p className="text-[12px] text-charcoal/30 mt-10 font-light italic">
          Missing a day will not restart your challenge
        </p>
      </div>
    </div>
  );
}
