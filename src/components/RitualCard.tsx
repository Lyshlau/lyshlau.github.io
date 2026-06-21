"use client";

import { Ritual } from "@/types";

interface RitualCardProps {
  ritual: Ritual;
  completed: boolean;
  onToggle: () => void;
}

export default function RitualCard({
  ritual,
  completed,
  onToggle,
}: RitualCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left rounded-2xl p-5 transition-all duration-300 shadow-card active:scale-[0.98] ${
        completed
          ? "bg-success/30 border-2 border-success"
          : "bg-white/70 border-2 border-transparent hover:border-sand/50"
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{ritual.emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-charcoal text-lg">{ritual.name}</h3>
          <p className="text-sm text-charcoal/50 mt-0.5">{ritual.description}</p>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            completed ? "bg-success" : "bg-sand/30"
          }`}
        >
          {completed && (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
