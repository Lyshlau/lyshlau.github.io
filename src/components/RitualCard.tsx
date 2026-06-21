"use client";

import { Check } from "lucide-react";
import { Ritual } from "@/types";
import { RITUAL_ICONS } from "@/lib/icons";

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
  const Icon = RITUAL_ICONS[ritual.id];

  return (
    <button
      onClick={onToggle}
      className={`w-full text-left rounded-sm transition-all duration-500 group ${
        completed
          ? "border border-success/40 bg-success/10"
          : "border border-sand/25 bg-white/20 hover:bg-white/40 hover:border-sand/40"
      }`}
    >
      <div className="flex items-start gap-5 p-6">
        <span
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0 transition-colors ${
            completed
              ? "bg-success/25 text-olive"
              : "bg-sand/15 text-olive/70 group-hover:bg-sand/25"
          }`}
        >
          <Icon size={18} strokeWidth={1.25} />
        </span>
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="font-serif text-xl text-olive font-normal tracking-tight">
            {ritual.name}
          </h3>
          <p className="body-soft mt-2">{ritual.description}</p>
        </div>
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
            completed
              ? "bg-olive text-white/90"
              : "border border-sand/50 bg-transparent"
          }`}
        >
          {completed && <Check size={12} strokeWidth={2} />}
        </span>
      </div>
    </button>
  );
}
