"use client";

import { useApp } from "@/components/ClientProviders";
import { calculateStats, generateInsights } from "@/lib/utils";
import { MOOD_OPTIONS, WAVE_OPTIONS } from "@/types";
import StatCard from "@/components/StatCard";

export default function InsightsPage() {
  const { state } = useApp();

  const stats = calculateStats(state);
  const insights = generateInsights(state);

  return (
    <div className="px-5 pt-8 pb-4">
      <header className="mb-6">
        <h1 className="font-serif text-3xl text-olive">Insights</h1>
        <p className="text-sm text-charcoal/50 mt-1">
          Patterns from your journey
        </p>
      </header>

      <div className="bg-white/50 rounded-3xl p-5 shadow-soft mb-6">
        <div className="text-center mb-4">
          <p className="text-sm text-charcoal/50">Overall Completion</p>
          <p className="font-serif text-4xl text-olive mt-1">
            {stats.overallCompletion}%
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Complete" value={stats.completeDays} />
          <StatCard label="Partial" value={stats.partialDays} />
          <StatCard label="Missed" value={stats.missedDays} />
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-xs uppercase tracking-wider text-charcoal/50 font-medium mb-3">
          Wave Intensity
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {WAVE_OPTIONS.map((option) => {
            const count =
              option.value === "wave"
                ? stats.waveDays
                : option.value === "building-swell"
                  ? stats.buildingSwellDays
                  : stats.tsunamiDays;
            return (
              <div
                key={option.value}
                className="bg-white/60 rounded-2xl p-4 text-center shadow-card"
              >
                <span className="text-xl">{option.emoji}</span>
                <p className="text-lg font-serif text-olive mt-1">{count}</p>
                <p className="text-[10px] text-charcoal/50">{option.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xs uppercase tracking-wider text-charcoal/50 font-medium mb-3">
          Mood Breakdown
        </h2>
        <div className="space-y-2">
          {MOOD_OPTIONS.map((option) => {
            const count = stats.moodCounts[option.value];
            const total = Object.values(stats.moodCounts).reduce(
              (a, b) => a + b,
              0
            );
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div
                key={option.value}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/60"
              >
                <span className="text-xl w-8 text-center">{option.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-charcoal">{option.label}</span>
                    <span className="text-xs text-charcoal/50">{count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-sand/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sage rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-wider text-charcoal/50 font-medium mb-3">
          Your Insights
        </h2>
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-sage/10 border border-sage/20"
            >
              <p className="text-sm text-charcoal leading-relaxed">
                {insight.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
