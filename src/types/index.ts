export type RitualId =
  | "indoor-movement"
  | "outdoor-movement"
  | "nourish"
  | "ground"
  | "grow";

export type DayStatus = "complete" | "partial" | "missed";

export type WaveIntensity = "wave" | "building-swell" | "tsunami";

export type Mood =
  | "energised"
  | "calm"
  | "neutral"
  | "tired"
  | "drained";

export interface Ritual {
  id: RitualId;
  name: string;
  description: string;
  examples: string[];
}

export interface Reflection {
  waveIntensity: WaveIntensity;
  mood: Mood;
}

export interface DayRecord {
  date: string;
  rituals: Record<RitualId, boolean>;
  reflection: Reflection | null;
}

export interface AppState {
  challengeStartDate: string;
  days: Record<string, DayRecord>;
}

export const RITUALS: Ritual[] = [
  {
    id: "indoor-movement",
    name: "Indoor Movement",
    description: "At least twenty minutes of intentional movement indoors",
    examples: ["Pilates", "Yoga", "Mobility", "Stretching", "Strength training"],
  },
  {
    id: "outdoor-movement",
    name: "Outdoor Movement",
    description: "At least twenty minutes moving in the open air",
    examples: ["Walk", "Run", "Hike", "Outdoor workout"],
  },
  {
    id: "nourish",
    name: "Nourish",
    description: "Whole foods, prepared with care and intention",
    examples: [
      "Protein-rich meals",
      "Fruit and vegetables",
      "Whole food meals",
      "Home-cooked meals",
    ],
  },
  {
    id: "ground",
    name: "Ground",
    description: "Quiet moments of presence and inner stillness",
    examples: ["Meditation", "Journaling", "Breathwork", "Quiet reflection"],
  },
  {
    id: "grow",
    name: "Grow",
    description: "Expand your mind and nurture your curiosity",
    examples: ["Read", "Learn", "Study", "Build something", "Create something"],
  },
];

export const WAVE_OPTIONS: {
  value: WaveIntensity;
  label: string;
  description: string;
}[] = [
  {
    value: "wave",
    label: "Wave",
    description: "Steady and sustainable",
  },
  {
    value: "building-swell",
    label: "Building Swell",
    description: "Pushed a little harder than usual",
  },
  {
    value: "tsunami",
    label: "Tsunami",
    description: "Went all in — recovery may be needed",
  },
];

export const MOOD_OPTIONS: {
  value: Mood;
  label: string;
}[] = [
  { value: "energised", label: "Energised" },
  { value: "calm", label: "Calm" },
  { value: "neutral", label: "Neutral" },
  { value: "tired", label: "Tired" },
  { value: "drained", label: "Drained" },
];

export const MOTIVATIONAL_MESSAGES = [
  "Small waves shape coastlines.",
  "Consistency creates confidence.",
  "Progress compounds.",
  "Steady beats perfect.",
  "Your pace is your power.",
  "Show up gently, grow steadily.",
  "Every wave matters.",
  "Sustainable is strong.",
];

export const CHALLENGE_DAYS = 75;
