"use client";

import { Check } from "lucide-react";
import { DayRecord, RITUALS, MOOD_OPTIONS, WAVE_OPTIONS } from "@/types";
import {
  formatDisplayDate,
  getDayStatus,
  getStatusLabel,
} from "@/lib/utils";
import { RITUAL_ICONS, WAVE_ICONS, MOOD_ICONS } from "@/lib/icons";
import StatusIndicator from "@/components/StatusIndicator";

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

  const WaveIcon = waveOption ? WAVE_ICONS[waveOption.value] : null;
  const MoodIcon = moodOption ? MOOD_ICONS[moodOption.value] : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-charcoal/15 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-background rounded-t-sm border-t border-sand/30 p-8 pb-12 safe-bottom max-h-[85vh] overflow-y-auto animate-slide-up">
        <div className="w-8 h-px bg-sand/60 mx-auto mb-10" />

        <div className="text-center mb-12">
          <p className="label-caps">Day {dayNumber}</p>
          <h2 className="font-serif text-[1.75rem] text-olive mt-3 font-normal">
            {formatDisplayDate(day.date)}
          </h2>
          <div className="mt-4 flex justify-center">
            <StatusIndicator status={status} showLabel />
          </div>
        </div>

        <div className="mb-12">
          <h3 className="label-caps mb-6">Rituals</h3>
          <div className="space-y-1">
            {RITUALS.map((ritual) => {
              const Icon = RITUAL_ICONS[ritual.id];
              const done = day.rituals[ritual.id];
              return (
                <div
                  key={ritual.id}
                  className="flex items-center gap-4 py-4 divider-soft"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sand/15 text-olive/70">
                    <Icon size={15} strokeWidth={1.25} />
                  </span>
                  <span className="flex-1 text-[14px] text-charcoal/70 font-light">
                    {ritual.name}
                  </span>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      done
                        ? "bg-olive text-white/90"
                        : "border border-sand/40"
                    }`}
                  >
                    {done && <Check size={10} strokeWidth={2} />}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {day.reflection && waveOption && moodOption && WaveIcon && MoodIcon && (
          <div className="mb-10">
            <h3 className="label-caps mb-6">Reflection</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sand/15 text-olive/70">
                  <WaveIcon size={15} strokeWidth={1.25} />
                </span>
                <div>
                  <p className="label-caps">Pace</p>
                  <p className="font-serif text-lg text-olive mt-1">
                    {waveOption.label}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sand/15 text-olive/70">
                  <MoodIcon size={15} strokeWidth={1.25} />
                </span>
                <div>
                  <p className="label-caps">Feeling</p>
                  <p className="font-serif text-lg text-olive mt-1">
                    {moodOption.label}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!day.reflection && (
          <p className="body-soft text-center italic">
            No reflection recorded
          </p>
        )}

        <button onClick={onClose} className="btn-ghost w-full mt-8">
          Close
        </button>
      </div>
    </div>
  );
}
