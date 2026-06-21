"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  MOOD_OPTIONS,
  Reflection,
  WAVE_OPTIONS,
  WaveIntensity,
  Mood,
} from "@/types";
import { WAVE_ICONS, MOOD_ICONS } from "@/lib/icons";

interface ReflectionModalProps {
  onComplete: (reflection: Reflection) => void;
  onDismiss: () => void;
}

export default function ReflectionModal({
  onComplete,
  onDismiss,
}: ReflectionModalProps) {
  const [waveIntensity, setWaveIntensity] = useState<WaveIntensity | null>(
    null
  );
  const [mood, setMood] = useState<Mood | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const handleWaveSelect = (value: WaveIntensity) => {
    setWaveIntensity(value);
    setStep(2);
  };

  const handleMoodSelect = (value: Mood) => {
    setMood(value);
    if (waveIntensity) {
      onComplete({ waveIntensity, mood: value });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-charcoal/15 backdrop-blur-sm"
        onClick={onDismiss}
      />
      <div className="relative w-full max-w-lg bg-background rounded-t-sm border-t border-sand/30 p-8 pb-12 safe-bottom animate-slide-up">
        <div className="w-8 h-px bg-sand/60 mx-auto mb-10" />

        {step === 1 ? (
          <>
            <h2 className="font-serif text-[1.75rem] text-olive text-center font-normal leading-snug">
              How did you move today?
            </h2>
            <p className="body-soft text-center mt-3 mb-10">
              Reflect on the pace you chose
            </p>
            <div className="space-y-3">
              {WAVE_OPTIONS.map((option) => {
                const Icon = WAVE_ICONS[option.value];
                return (
                  <button
                    key={option.value}
                    onClick={() => handleWaveSelect(option.value)}
                    className="w-full flex items-center gap-5 p-5 rounded-sm border border-sand/25 bg-white/20 hover:bg-white/50 hover:border-sand/40 transition-all text-left"
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sand/15 text-olive">
                      <Icon size={17} strokeWidth={1.25} />
                    </span>
                    <div>
                      <p className="font-serif text-lg text-olive">
                        {option.label}
                      </p>
                      <p className="body-soft mt-1">{option.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setStep(1)}
              className="text-[13px] text-sage/80 mb-8 flex items-center gap-1.5 font-light tracking-wide"
            >
              <ChevronLeft size={16} strokeWidth={1.25} />
              Back
            </button>
            <h2 className="font-serif text-[1.75rem] text-olive text-center font-normal leading-snug">
              How do you feel?
            </h2>
            <p className="body-soft text-center mt-3 mb-10">
              Choose what resonates right now
            </p>
            <div className="grid grid-cols-3 gap-3">
              {MOOD_OPTIONS.map((option) => {
                const Icon = MOOD_ICONS[option.value];
                const selected = mood === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleMoodSelect(option.value)}
                    className={`flex flex-col items-center gap-3 py-6 px-3 rounded-sm transition-all ${
                      selected
                        ? "border border-sage/50 bg-sage/15"
                        : "border border-sand/25 bg-white/20 hover:bg-white/40"
                    }`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.25}
                      className="text-olive/80"
                    />
                    <span className="text-[11px] tracking-wide text-charcoal/60 font-light">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
