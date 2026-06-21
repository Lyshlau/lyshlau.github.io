"use client";

import { DayRecord, RITUALS, MOOD_OPTIONS, WAVE_OPTIONS } from "@/types";
import {
  formatDisplayDate,
  getDayStatus,
  getStatusEmoji,
  getStatusLabel,
} from "@/lib/utils";

interface DayDetailModalProps {
  day: DayRecord;
  dayNumber: number;
  onClose: () => void;
}

export default function DayDetailModal({
  day,
  dayNumber,
  onClose,
}: DayDetailModalProps) {
  const status = getDayStatus(day);
  const waveOption = day.reflection
    ? WAVE_OPTIONS.find((w) => w.value === day.reflection?.waveIntensity)
    : null;
  const moodOption = day.reflection
    ? MOOD_OPTIONS.find((m) => m.value === day.reflection?.mood)
    : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-background rounded-t-3xl p-6 pb-10 safe-bottom max-h-[80vh] overflow-y-auto">
        <div className="w-10 h-1 bg-sand/50 rounded-full mx-auto mb-6" />

        <div className="text-center mb-6">
          <p className="text-sm text-sage font-medium">Day {dayNumber}</p>
          <h2 className="font-serif text-2xl text-olive mt-1">
            {formatDisplayDate(day.date)}
          </h2>
          <p className="text-sm text-charcoal/60 mt-2">
            {getStatusEmoji(status)} {getStatusLabel(status)}
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <h3 className="text-xs uppercase tracking-wider text-charcoal/50 font-medium mb-3">
            Rituals
          </h3>
          {RITUALS.map((ritual) => (
            <div
              key={ritual.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/60"
            >
              <span className="text-xl">{ritual.emoji}</span>
              <span className="flex-1 text-sm text-charcoal">{ritual.name}</span>
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  day.rituals[ritual.id]
                    ? "bg-success text-white"
                    : "bg-sand/30 text-charcoal/30"
                }`}
              >
                {day.rituals[ritual.id] ? "✓" : "—"}
              </span>
            </div>
          ))}
        </div>

        {day.reflection && (
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-charcoal/50 font-medium">
              Reflection
            </h3>
            <div className="p-4 rounded-xl bg-white/60 space-y-3">
              <div>
                <p className="text-xs text-charcoal/40">How did you move?</p>
                <p className="text-sm text-charcoal mt-0.5">
                  {waveOption?.emoji} {waveOption?.label}
                </p>
              </div>
              <div>
                <p className="text-xs text-charcoal/40">How do you feel?</p>
                <p className="text-sm text-charcoal mt-0.5">
                  {moodOption?.emoji} {moodOption?.label}
                </p>
              </div>
            </div>
          </div>
        )}

        {!day.reflection && (
          <p className="text-sm text-charcoal/40 text-center italic">
            No reflection recorded for this day
          </p>
        )}

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-2xl bg-sage/20 text-olive font-medium text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
