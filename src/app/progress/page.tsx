"use client";

import { useState } from "react";
import { useApp } from "@/components/ClientProviders";
import { getDayRecord, getChallengeDayNumber } from "@/lib/utils";
import PageHeader from "@/components/ui/PageHeader";
import EditorialCard from "@/components/ui/EditorialCard";
import CalendarGrid from "@/components/CalendarGrid";
import DayDetailModal from "@/components/DayDetailModal";

export default function ProgressPage() {
  const { state } = useApp();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const selectedDay = selectedDate
    ? getDayRecord(state, selectedDate)
    : null;
  const selectedDayNumber = selectedDate
    ? getChallengeDayNumber(state.challengeStartDate, selectedDate)
    : 0;

  return (
    <div className="px-7 pt-14 pb-8">
      <PageHeader
        title="Progress"
        subtitle="Your rhythm across time"
      />

      <EditorialCard padding="lg">
        <CalendarGrid
          state={state}
          onDayClick={(date) => setSelectedDate(date)}
        />
      </EditorialCard>

      <p className="body-soft text-center mt-8">
        Select a day to revisit your rituals and reflections
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
