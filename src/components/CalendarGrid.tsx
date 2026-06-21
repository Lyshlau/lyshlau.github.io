"use client";

import { AppState } from "@/types";
import {
  getAllChallengeDates,
  getDayRecord,
  getDayStatus,
  getStatusColor,
  getChallengeDayNumber,
  parseDate,
  formatDate,
} from "@/lib/utils";
import StatusIndicator from "@/components/StatusIndicator";

interface CalendarGridProps {
  state: AppState;
  onDayClick: (date: string) => void;
}

export default function CalendarGrid({ state, onDayClick }: CalendarGridProps) {
  const today = formatDate(new Date());
  const dates = getAllChallengeDates(state.challengeStartDate, today);

  if (dates.length === 0) return null;

  const weeks: string[][] = [];
  let currentWeek: string[] = [];

  const firstDate = parseDate(dates[0]);
  const startDayOfWeek = firstDate.getDay();
  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeek.push("");
  }

  for (const date of dates) {
    currentWeek.push(date);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push("");
    weeks.push(currentWeek);
  }

  const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayLabels.map((label, i) => (
          <div
            key={i}
            className="text-center text-[9px] text-charcoal/35 tracking-[0.15em] uppercase py-2"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-2">
            {week.map((date, di) => {
              if (!date) {
                return <div key={di} className="aspect-square" />;
              }

              const day = getDayRecord(state, date);
              const status = getDayStatus(day);
              const dayNum = getChallengeDayNumber(
                state.challengeStartDate,
                date
              );
              const isToday = date === today;

              return (
                <button
                  key={date}
                  onClick={() => onDayClick(date)}
                  className={`aspect-square rounded-sm ${getStatusColor(
                    status
                  )} flex items-center justify-center transition-all hover:opacity-80 ${
                    isToday ? "ring-1 ring-olive/50 ring-offset-2 ring-offset-background" : ""
                  }`}
                  title={`Day ${dayNum}`}
                >
                  <span className="text-[11px] text-charcoal/45 font-light">
                    {parseDate(date).getDate()}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-8 mt-10 pt-8 divider-soft">
        <StatusIndicator status="complete" showLabel size="sm" />
        <StatusIndicator status="partial" showLabel size="sm" />
        <StatusIndicator status="missed" showLabel size="sm" />
      </div>
    </div>
  );
}
