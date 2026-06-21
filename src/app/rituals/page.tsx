"use client";

import { useState } from "react";
import { useApp } from "@/components/ClientProviders";
import {
  getToday,
  getDayRecord,
  getDayStatus,
  getStatusEmoji,
  getStatusLabel,
  shouldShowReflection,
  formatDisplayDate,
} from "@/lib/utils";
import { RITUALS } from "@/types";
import RitualCard from "@/components/RitualCard";
import ReflectionModal from "@/components/ReflectionModal";

export default function RitualsPage() {
  const { state, toggle, reflect } = useApp();
  const today = getToday();
  const [showReflection, setShowReflection] = useState(false);

  const day = getDayRecord(state, today);
  const status = getDayStatus(day);
  const completedCount = Object.values(day.rituals).filter(Boolean).length;

  const handleToggle = (ritualId: typeof RITUALS[number]["id"]) => {
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
    <div className="px-5 pt-8">
      <header className="mb-6">
        <h1 className="font-serif text-3xl text-olive">Today&apos;s Rituals</h1>
        <p className="text-sm text-charcoal/50 mt-1">
          {formatDisplayDate(today)}
        </p>
      </header>

      <div className="flex items-center justify-between bg-white/50 rounded-2xl px-4 py-3 mb-6 shadow-card">
        <span className="text-sm text-charcoal/60">
          {getStatusEmoji(status)} {getStatusLabel(status)}
        </span>
        <span className="text-sm font-medium text-olive">
          {completedCount} / 5
        </span>
      </div>

      <div className="space-y-3">
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
        <div className="mt-6 p-4 rounded-2xl bg-sage/10 text-center">
          <p className="text-xs text-sage uppercase tracking-wider font-medium">
            Today&apos;s Reflection
          </p>
          <p className="text-sm text-charcoal mt-2">
            Reflection complete — well done for showing up today.
          </p>
        </div>
      )}

      {!day.reflection && completedCount > 0 && !showReflection && (
        <button
          onClick={() => setShowReflection(true)}
          className="w-full mt-6 py-4 rounded-2xl bg-olive text-white font-medium text-sm shadow-soft active:scale-[0.98] transition-transform"
        >
          Complete Reflection
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
