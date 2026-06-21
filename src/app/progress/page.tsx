"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  getDayRecord,
  getChallengeDayNumber,
} from "@/lib/utils";
import CalendarGrid from "@/components/CalendarGrid";
import DayDetailModal from "@/components/DayDetailModal";

export default function ProgressPage() {
  const { state, hydrated } = useApp();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-sage border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const selectedDay = selectedDate
    ? getDayRecord(state, selectedDate)
    : null;
  const selectedDayNumber = selectedDate
    ? getChallengeDayNumber(state.challengeStartDate, selectedDate)
    : 0;

  return (
    <div className="px-5 pt-8">
      <header className="mb-6">
        <h1 className="font-serif text-3xl text-olive">Progress</h1>
        <p className="text-sm text-charcoal/50 mt-1">
          Your consistency pattern over time
        </p>
      </header>

      <div className="bg-white/50 rounded-3xl p-5 shadow-soft">
        <CalendarGrid
          state={state}
          onDayClick={(date) => setSelectedDate(date)}
        />
      </div>

      <p className="text-xs text-charcoal/40 text-center mt-4">
        Tap any day to view rituals and reflections
      </p>

      {selectedDay && selectedDate && (
        <DayDetailModal
          day={selectedDay}
          dayNumber={selectedDayNumber}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
