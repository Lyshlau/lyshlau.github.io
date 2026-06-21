"use client";

import { useApp } from "@/context/AppContext";
import {
  calculateStats,
  getMotivationalMessage,
  getToday,
  getDayRecord,
} from "@/lib/utils";
import { CHALLENGE_DAYS } from "@/types";
import StatCard from "@/components/StatCard";

export default function HomePage() {
  const { state, hydrated } = useApp();
  const today = getToday();
  const stats = calculateStats(state);
  const message = getMotivationalMessage(today);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-sage border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const todayDay = getDayRecord(state, today);
  const todayCompleted = Object.values(todayDay.rituals).filter(Boolean).length;

  return (
    <div className="px-5 pt-8">
      <header className="mb-8">
        <h1 className="font-serif text-4xl text-olive tracking-tight">Wave</h1>
        <p className="text-sm text-charcoal/50 mt-1">
          Sustainable momentum, one day at a time
        </p>
      </header>

      <div className="bg-white/50 rounded-3xl p-6 shadow-soft mb-6">
        <div className="text-center">
          <p className="text-sm text-sage font-medium uppercase tracking-wider">
            Challenge Progress
          </p>
          <p className="font-serif text-5xl text-olive mt-2">
            Day {stats.currentDayNumber}
          </p>
          <p className="text-sm text-charcoal/40 mt-1">
            {stats.currentDayNumber <= CHALLENGE_DAYS
              ? `of ${CHALLENGE_DAYS}`
              : "ongoing journey"}
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-sand/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-charcoal/60">Overall Completion</span>
            <span className="text-lg font-serif text-olive">
              {stats.overallCompletion}%
            </span>
          </div>
          <div className="w-full h-2 bg-sand/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-sage rounded-full transition-all duration-700"
              style={{ width: `${stats.overallCompletion}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Complete" value={stats.completeDays} sublabel="🟢" />
        <StatCard label="Partial" value={stats.partialDays} sublabel="🟡" />
        <StatCard label="Missed" value={stats.missedDays} sublabel="⚪" />
      </div>

      <div className="bg-sage/10 rounded-2xl p-5 mb-6">
        <p className="text-xs text-sage uppercase tracking-wider font-medium mb-1">
          Today&apos;s Progress
        </p>
        <p className="text-charcoal">
          <span className="font-serif text-2xl text-olive">
            {todayCompleted}
          </span>
          <span className="text-charcoal/50"> / 5 rituals</span>
        </p>
      </div>

      <blockquote className="text-center px-4">
        <p className="font-serif text-xl text-olive/80 italic leading-relaxed">
          &ldquo;{message}&rdquo;
        </p>
      </blockquote>
    </div>
  );
}
