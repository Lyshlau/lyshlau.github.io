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
  emoji: string;
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
    emoji: "🌿",
    description: "Minimum 20 minutes of indoor movement",
    examples: ["Pilates", "Yoga", "Mobility", "Stretching", "Strength training"],
  },
  {
    id: "outdoor-movement",
    name: "Outdoor Movement",
    emoji: "☀️",
    description: "Minimum 20 minutes of outdoor movement",
    examples: ["Walk", "Run", "Hike", "Outdoor workout"],
  },
  {
    id: "nourish",
    name: "Nourish",
    emoji: "🥗",
    description: "Prioritise whole foods and minimise ultra-processed foods",
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
    emoji: "🧘",
    description: "Quiet moments of presence and reflection",
    examples: ["Meditation", "Journaling", "Breathwork", "Quiet reflection"],
  },
  {
    id: "grow",
    name: "Grow",
    emoji: "✨",
    description: "Expand your mind and create something new",
    examples: ["Read", "Learn", "Study", "Build something", "Create something"],
  },
];

export const WAVE_OPTIONS: {
  value: WaveIntensity;
  label: string;
  emoji: string;
  description: string;
}[] = [
  {
    value: "wave",
    label: "Wave",
    emoji: "🌊",
    description: "Steady and sustainable",
  },
  {
    value: "building-swell",
    label: "Building Swell",
    emoji: "🌊🌊",
    description: "Pushed a little harder than usual",
  },
  {
    value: "tsunami",
    label: "Tsunami",
    emoji: "🌊🌊🌊",
    description: "Went all in today and may need recovery",
  },
];

export const MOOD_OPTIONS: {
  value: Mood;
  label: string;
  emoji: string;
}[] = [
  { value: "energised", label: "Energised", emoji: "😊" },
  { value: "calm", label: "Calm", emoji: "😌" },
  { value: "neutral", label: "Neutral", emoji: "😐" },
  { value: "tired", label: "Tired", emoji: "😴" },
  { value: "drained", label: "Drained", emoji: "😩" },
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
