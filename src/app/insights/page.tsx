"use client";

import { useApp } from "@/components/ClientProviders";
import { calculateStats, generateInsights } from "@/lib/utils";
import { MOOD_OPTIONS, WAVE_OPTIONS } from "@/types";
import { WAVE_ICONS, MOOD_ICONS } from "@/lib/icons";
import PageHeader from "@/components/ui/PageHeader";
import EditorialCard from "@/components/ui/EditorialCard";
import StatCard from "@/components/StatCard";

export default function InsightsPage() {
  const { state } = useApp();

  const stats = calculateStats(state);
  const insights = generateInsights(state);

  return (
    <div className="px-7 pt-14 pb-8">
      <PageHeader
        title="Insights"
        subtitle="Patterns emerging from your practice"
      />

      <EditorialCard padding="lg" className="mb-14">
        <p className="label-caps text-center">Overall presence</p>
        <p className="font-serif text-5xl text-olive text-center mt-4 font-normal">
          {stats.overallCompletion}%
        </p>
        <div className="grid grid-cols-3 gap-6 mt-10 pt-8 divider-soft">
          <StatCard label="Complete" value={stats.completeDays} status="complete" />
          <StatCard label="Partial" value={stats.partialDays} status="partial" />
          <StatCard label="Quiet" value={stats.missedDays} status="missed" />
        </div>
      </EditorialCard>

      <section className="mb-14">
        <h2 className="label-caps mb-8 px-1">Pace</h2>
        <div className="space-y-1">
          {WAVE_OPTIONS.map((option) => {
            const Icon = WAVE_ICONS[option.value];
            const count =
              option.value === "wave"
                ? stats.waveDays
                : option.value === "building-swell"
                  ? stats.buildingSwellDays
                  : stats.tsunamiDays;
            return (
              <div
                key={option.value}
                className="flex items-center gap-5 py-5 divider-soft"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sand/15 text-olive/70">
                  <Icon size={16} strokeWidth={1.25} />
                </span>
                <span className="flex-1 font-serif text-lg text-olive font-normal">
                  {option.label}
                </span>
                <span className="font-serif text-2xl text-olive/80">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="label-caps mb-8 px-1">Feeling</h2>
        <div className="space-y-1">
          {MOOD_OPTIONS.map((option) => {
            const Icon = MOOD_ICONS[option.value];
            const count = stats.moodCounts[option.value];
            const total = Object.values(stats.moodCounts).reduce(
              (a, b) => a + b,
              0
            );
            const percentage =
              total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div
                key={option.value}
                className="py-5 divider-soft"
              >
                <div className="flex items-center gap-5 mb-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sand/15 text-olive/70">
                    <Icon size={16} strokeWidth={1.25} />
                  </span>
                  <span className="flex-1 text-[14px] text-charcoal/65 font-light">
                    {option.label}
                  </span>
                  <span className="text-[13px] text-charcoal/40 font-light">
                    {count}
                  </span>
                </div>
                <div className="ml-[3.75rem] h-px bg-sand/25 overflow-hidden">
                  <div
                    className="h-full bg-sage/50 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="label-caps mb-8 px-1">Observations</h2>
        <div className="space-y-4">
          {insights.map((insight, i) => (
            <div
              key={i}
              className="py-6 px-6 border border-sand/25 rounded-sm bg-white/20"
            >
              <p className="font-serif text-lg text-olive/85 leading-relaxed font-normal">
                {insight.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
