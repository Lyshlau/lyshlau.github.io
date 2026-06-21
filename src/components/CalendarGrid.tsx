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

interface CalendarGridProps {
  state: AppState;
  onDayClick: (date: string) => void;
}

export default function CalendarGrid({ state, onDayClick }: CalendarGridProps) {
  const today = formatDate(new Date());
  const dates = getAllChallengeDates(state.challengeStartDate, today);

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

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLabels.map((label, i) => (
          <div
            key={i}
            className="text-center text-[10px] text-charcoal/40 font-medium py-1"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1">
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
                  className={`aspect-square rounded-lg ${getStatusColor(
                    status
                  )} flex items-center justify-center transition-transform active:scale-90 ${
                    isToday ? "ring-2 ring-olive ring-offset-1" : ""
                  }`}
                  title={`Day ${dayNum}`}
                >
                  <span className="text-[10px] text-charcoal/50 font-medium">
                    {parseDate(date).getDate()}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-success" />
          <span className="text-[10px] text-charcoal/50">Complete</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-sand" />
          <span className="text-[10px] text-charcoal/50">Partial</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-background border border-sand/60" />
          <span className="text-[10px] text-charcoal/50">Missed</span>
        </div>
      </div>
    </div>
  );
}
