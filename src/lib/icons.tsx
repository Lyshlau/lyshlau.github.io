import {
  BookOpen,
  Cloud,
  CloudRain,
  Feather,
  Flame,
  Flower2,
  Leaf,
  Minus,
  Moon,
  Sun,
  TrendingUp,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { DayStatus, Mood, RitualId, WaveIntensity } from "@/types";

export const RITUAL_ICONS: Record<RitualId, LucideIcon> = {
  "indoor-movement": Flower2,
  "outdoor-movement": Sun,
  nourish: Leaf,
  ground: Feather,
  grow: BookOpen,
};

export const WAVE_ICONS: Record<WaveIntensity, LucideIcon> = {
  wave: Waves,
  "building-swell": TrendingUp,
  tsunami: Flame,
};

export const MOOD_ICONS: Record<Mood, LucideIcon> = {
  energised: Sun,
  calm: Cloud,
  neutral: Minus,
  tired: Moon,
  drained: CloudRain,
};

export const STATUS_COLORS: Record<DayStatus, string> = {
  complete: "bg-success",
  partial: "bg-sand",
  missed: "bg-transparent border border-sand/50",
};

export function IconBadge({
  icon: Icon,
  className = "",
  size = 18,
}: {
  icon: LucideIcon;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-sand/20 text-olive ${className}`}
    >
      <Icon size={size} strokeWidth={1.25} />
    </span>
  );
}
