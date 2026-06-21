"use client";

import { useApp } from "@/components/ClientProviders";
import {
  calculateStats,
  getMotivationalMessage,
  getToday,
  getDayRecord,
} from "@/lib/utils";
import { CHALLENGE_DAYS } from "@/types";
import PageHeader from "@/components/ui/PageHeader";
import EditorialCard from "@/components/ui/EditorialCard";
import StatCard from "@/components/StatCard";

export default function HomePage() {
  const { state } = useApp();
  const today = getToday();
  const stats = calculateStats(state);
  const message = getMotivationalMessage(today);

  const todayDay = getDayRecord(state, today);
  const todayCompleted = Object.values(todayDay.rituals).filter(Boolean).length;

  return (
    <div className="px-7 pt-14 pb-8">
      <PageHeader
        title="Wave"
        subtitle="Sustainable momentum, one gentle day at a time"
      />

      <EditorialCard padding="lg" className="mb-14">
        <p className="label-caps text-center">Your journey</p>
        <p className="font-serif text-[4.5rem] leading-none text-olive text-center mt-4 font-normal">
          {stats.currentDayNumber}
        </p>
        <p className="body-soft text-center mt-3">
          {stats.currentDayNumber <= CHALLENGE_DAYS
            ? `Day of ${CHALLENGE_DAYS}`
            : "Ongoing ritual"}
        </p>

        <div className="divider-soft mt-10 pt-10">
          <div className="flex items-baseline justify-between">
            <span className="label-caps">Overall presence</span>
            <span className="font-serif text-2xl text-olive">
              {stats.overallCompletion}%
            </span>
          </div>
          <div className="w-full h-px bg-sand/30 mt-6 overflow-hidden">
            <div
              className="h-full bg-sage/60 transition-all duration-1000"
              style={{ width: `${stats.overallCompletion}%` }}
            />
          </div>
        </div>
      </EditorialCard>

      <div className="grid grid-cols-3 gap-8 mb-14 px-2">
        <StatCard label="Complete" value={stats.completeDays} status="complete" />
        <StatCard label="Partial" value={stats.partialDays} status="partial" />
        <StatCard label="Quiet" value={stats.missedDays} status="missed" />
      </div>

      <EditorialCard className="mb-16">
        <p className="label-caps">Today</p>
        <p className="font-serif text-4xl text-olive mt-4 font-normal">
          {todayCompleted}
          <span className="text-xl text-charcoal/30 font-light"> / 5</span>
        </p>
        <p className="body-soft mt-2">rituals completed</p>
      </EditorialCard>

      <blockquote className="text-center px-6 py-4">
        <p className="font-serif text-2xl text-olive/70 font-normal italic leading-relaxed tracking-tight">
          &ldquo;{message}&rdquo;
        </p>
      </blockquote>
    </div>
  );
}
