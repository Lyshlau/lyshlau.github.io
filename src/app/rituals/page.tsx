"use client";

import { useState } from "react";
import { useApp } from "@/components/ClientProviders";
import {
  getToday,
  getDayRecord,
  getDayStatus,
  shouldShowReflection,
  formatDisplayDate,
} from "@/lib/utils";
import { RITUALS } from "@/types";
import PageHeader from "@/components/ui/PageHeader";
import RitualCard from "@/components/RitualCard";
import ReflectionModal from "@/components/ReflectionModal";
import StatusIndicator from "@/components/StatusIndicator";

export default function RitualsPage() {
  const { state, toggle, reflect } = useApp();
  const today = getToday();
  const [showReflection, setShowReflection] = useState(false);

  const day = getDayRecord(state, today);
  const status = getDayStatus(day);
  const completedCount = Object.values(day.rituals).filter(Boolean).length;

  const handleToggle = (ritualId: (typeof RITUALS)[number]["id"]) => {
    toggle(today, ritualId);
    const updatedDay = {
      ...day,
      rituals: {
        ...day.rituals,
        [ritualId]: !day.rituals[ritualId],
      },
    };
    if (shouldShowReflection(updatedDay) && !showReflection) {
      setTimeout(() => setShowReflection(true), 400);
    }
  };

  return (
    <div className="px-7 pt-14 pb-8">
      <PageHeader
        title="Rituals"
        subtitle={formatDisplayDate(today)}
      />

      <div className="flex items-center justify-between mb-10 px-1">
        <StatusIndicator status={status} showLabel />
        <span className="font-serif text-lg text-olive/80">
          {completedCount}
          <span className="text-charcoal/30 font-light"> / 5</span>
        </span>
      </div>

      <div className="space-y-4">
        {RITUALS.map((ritual) => (
          <RitualCard
            key={ritual.id}
            ritual={ritual}
            completed={day.rituals[ritual.id]}
            onToggle={() => handleToggle(ritual.id)}
          />
        ))}
      </div>

      {day.reflection && (
        <div className="mt-12 text-center py-8 border border-sand/25 rounded-sm bg-white/20">
          <p className="label-caps">Reflection complete</p>
          <p className="body-soft mt-3 max-w-xs mx-auto">
            You showed up today. That is the practice.
          </p>
        </div>
      )}

      {!day.reflection && completedCount > 0 && !showReflection && (
        <button
          onClick={() => setShowReflection(true)}
          className="btn-primary mt-12"
        >
          Complete reflection
        </button>
      )}

      {showReflection && (
        <ReflectionModal
          onComplete={(reflection) => {
            reflect(today, reflection);
            setShowReflection(false);
          }}
          onDismiss={() => setShowReflection(false)}
        />
      )}
    </div>
  );
}
