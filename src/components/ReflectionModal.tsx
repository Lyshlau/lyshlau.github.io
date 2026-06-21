"use client";

import { useState } from "react";
import {
  MOOD_OPTIONS,
  Reflection,
  WAVE_OPTIONS,
  WaveIntensity,
  Mood,
} from "@/types";

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
        className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm"
        onClick={onDismiss}
      />
      <div className="relative w-full max-w-lg bg-background rounded-t-3xl p-6 pb-10 safe-bottom animate-slide-up">
        <div className="w-10 h-1 bg-sand/50 rounded-full mx-auto mb-6" />

        {step === 1 ? (
          <>
            <h2 className="font-serif text-2xl text-olive text-center mb-1">
              How did you move today?
            </h2>
            <p className="text-sm text-charcoal/50 text-center mb-6">
              Tap to reflect on your pace
            </p>
            <div className="space-y-3">
              {WAVE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleWaveSelect(option.value)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/70 shadow-card hover:bg-white active:scale-[0.98] transition-all"
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <div className="text-left">
                    <p className="font-medium text-charcoal">{option.label}</p>
                    <p className="text-sm text-charcoal/50">
                      {option.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setStep(1)}
              className="text-sm text-sage mb-4 flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </button>
            <h2 className="font-serif text-2xl text-olive text-center mb-1">
              How do you feel?
            </h2>
            <p className="text-sm text-charcoal/50 text-center mb-6">
              Choose what resonates right now
            </p>
            <div className="grid grid-cols-3 gap-3">
              {MOOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleMoodSelect(option.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all active:scale-[0.95] ${
                    mood === option.value
                      ? "bg-sage/30 border-2 border-sage"
                      : "bg-white/70 shadow-card border-2 border-transparent"
                  }`}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="text-xs font-medium text-charcoal">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
