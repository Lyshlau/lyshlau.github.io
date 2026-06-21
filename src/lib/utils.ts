import {
  AppState,
  DayRecord,
  DayStatus,
  Mood,
  MOTIVATIONAL_MESSAGES,
  RitualId,
} from "@/types";
import { createEmptyDay } from "@/lib/state";

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(dateStr: string, days: number): string {
  const date = parseDate(dateStr);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

export function getToday(): string {
  return formatDate(new Date());
}

export function getCompletedRitualCount(day: DayRecord): number {
  return Object.values(day.rituals).filter(Boolean).length;
}

export function getDayStatus(day: DayRecord): DayStatus {
  const count = getCompletedRitualCount(day);
  if (count === 5) return "complete";
  if (count >= 3) return "partial";
  return "missed";
}

export function getChallengeDayNumber(
  challengeStartDate: string,
  date: string
): number {
  const start = parseDate(challengeStartDate);
  const target = parseDate(date);
  const diffMs = target.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

export function getDateForChallengeDay(
  challengeStartDate: string,
  dayNumber: number
): string {
  return addDays(challengeStartDate, dayNumber - 1);
}

export function getAllChallengeDates(
  challengeStartDate: string,
  upToDate?: string
): string[] {
  if (!challengeStartDate) return [];

  const end = upToDate ?? getToday();
  const dates: string[] = [];
  let current = challengeStartDate;
  while (current <= end) {
    dates.push(current);
    current = addDays(current, 1);
  }
  return dates;
}

export function getDayRecord(
  state: AppState,
  date: string
): DayRecord {
  return state.days[date] ?? createEmptyDay(date);
}

export interface ChallengeStats {
  totalDays: number;
  completeDays: number;
  partialDays: number;
  missedDays: number;
  overallCompletion: number;
  currentDayNumber: number;
  waveDays: number;
  buildingSwellDays: number;
  tsunamiDays: number;
  moodCounts: Record<Mood, number>;
}

export function calculateStats(
  state: AppState,
  upToDate?: string
): ChallengeStats {
  if (!state.challengeStartDate) {
    return {
      totalDays: 0,
      completeDays: 0,
      partialDays: 0,
      missedDays: 0,
      overallCompletion: 0,
      currentDayNumber: 0,
      waveDays: 0,
      buildingSwellDays: 0,
      tsunamiDays: 0,
      moodCounts: {
        energised: 0,
        calm: 0,
        neutral: 0,
        tired: 0,
        drained: 0,
      },
    };
  }

  const end = upToDate ?? getToday();
  const dates = getAllChallengeDates(state.challengeStartDate, end);

  let completeDays = 0;
  let partialDays = 0;
  let missedDays = 0;
  let totalRitualsCompleted = 0;
  let totalRitualSlots = 0;
  let waveDays = 0;
  let buildingSwellDays = 0;
  let tsunamiDays = 0;

  const moodCounts: Record<Mood, number> = {
    energised: 0,
    calm: 0,
    neutral: 0,
    tired: 0,
    drained: 0,
  };

  for (const date of dates) {
    const day = getDayRecord(state, date);
    const status = getDayStatus(day);
    if (status === "complete") completeDays++;
    else if (status === "partial") partialDays++;
    else missedDays++;

    const completed = getCompletedRitualCount(day);
    totalRitualsCompleted += completed;
    totalRitualSlots += 5;

    if (day.reflection) {
      if (day.reflection.waveIntensity === "wave") waveDays++;
      else if (day.reflection.waveIntensity === "building-swell")
        buildingSwellDays++;
      else tsunamiDays++;
      moodCounts[day.reflection.mood]++;
    }
  }

  const currentDayNumber = getChallengeDayNumber(
    state.challengeStartDate,
    end
  );

  return {
    totalDays: dates.length,
    completeDays,
    partialDays,
    missedDays,
    overallCompletion:
      totalRitualSlots > 0
        ? Math.round((totalRitualsCompleted / totalRitualSlots) * 100)
        : 0,
    currentDayNumber,
    waveDays,
    buildingSwellDays,
    tsunamiDays,
    moodCounts,
  };
}

export function getMotivationalMessage(date: string): string {
  const hash = date.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return MOTIVATIONAL_MESSAGES[hash % MOTIVATIONAL_MESSAGES.length];
}

export function formatDisplayDate(dateStr: string): string {
  const date = parseDate(dateStr);
  return date.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function formatShortDate(dateStr: string): string {
  const date = parseDate(dateStr);
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  });
}

export interface Insight {
  text: string;
}

export function generateInsights(state: AppState): Insight[] {
  const stats = calculateStats(state);
  const insights: Insight[] = [];
  const dates = getAllChallengeDates(state.challengeStartDate);

  if (dates.length < 3) {
    insights.push({
      text: "Keep showing up — insights will appear as your journey unfolds.",
    });
    return insights;
  }

  const reflectedDays = dates
    .map((d) => getDayRecord(state, d))
    .filter((d) => d.reflection !== null);

  if (reflectedDays.length > 0) {
    const waveCount = reflectedDays.filter(
      (d) => d.reflection?.waveIntensity === "wave"
    ).length;
    const completeWithReflection = reflectedDays.filter(
      (d) => getDayStatus(d) === "complete"
    );

    if (waveCount > reflectedDays.length * 0.5) {
      insights.push({
        text: "Most of your completed days were Wave days.",
      });
    }

    const energisedOnComplete = completeWithReflection.filter(
      (d) => d.reflection?.mood === "energised"
    ).length;
    if (
      completeWithReflection.length > 0 &&
      energisedOnComplete > completeWithReflection.length * 0.4
    ) {
      insights.push({
        text: "You feel energised most often after completing all rituals.",
      });
    }

    const drainedOnTsunami = reflectedDays.filter(
      (d) =>
        d.reflection?.waveIntensity === "tsunami" &&
        d.reflection?.mood === "drained"
    ).length;
    const tsunamiTotal = reflectedDays.filter(
      (d) => d.reflection?.waveIntensity === "tsunami"
    ).length;
    if (tsunamiTotal >= 2 && drainedOnTsunami >= tsunamiTotal * 0.5) {
      insights.push({
        text: "Tsunami days often leave you feeling drained — consider more Wave days.",
      });
    }
  }

  const ritualTotals: Record<RitualId, number> = {
    "indoor-movement": 0,
    "outdoor-movement": 0,
    nourish: 0,
    ground: 0,
    grow: 0,
  };

  for (const date of dates) {
    const day = getDayRecord(state, date);
    for (const [id, completed] of Object.entries(day.rituals)) {
      if (completed) ritualTotals[id as RitualId]++;
    }
  }

  const ritualEntries = Object.entries(ritualTotals).sort(
    ([, a], [, b]) => b - a
  );
  if (ritualEntries[0][1] > 0) {
    const strongestId = ritualEntries[0][0] as RitualId;
    const ritualNames: Record<RitualId, string> = {
      "indoor-movement": "Indoor Movement",
      "outdoor-movement": "Outdoor Movement",
      nourish: "Nourish",
      ground: "Ground",
      grow: "Grow",
    };
    const category =
      strongestId.includes("movement") ? "Movement" : ritualNames[strongestId];
    insights.push({
      text: `Your strongest consistency category is ${category}.`,
    });
  }

  if (stats.completeDays > stats.missedDays && stats.completeDays > 0) {
    insights.push({
      text: "You're building real momentum — more complete days than missed.",
    });
  }

  if (insights.length === 0) {
    insights.push({
      text: "Every day you show up is a step toward sustainable momentum.",
    });
  }

  return insights;
}

export function shouldShowReflection(day: DayRecord): boolean {
  const count = getCompletedRitualCount(day);
  return count > 0 && day.reflection === null;
}

export function getStatusColor(status: DayStatus): string {
  switch (status) {
    case "complete":
      return "bg-success";
    case "partial":
      return "bg-sand";
    case "missed":
      return "bg-background border border-sand/60";
  }
}

export function getStatusLabel(status: DayStatus): string {
  switch (status) {
    case "complete":
      return "Complete Day";
    case "partial":
      return "Partial Day";
    case "missed":
      return "Missed Day";
  }
}

export function getStatusEmoji(status: DayStatus): string {
  switch (status) {
    case "complete":
      return "🟢";
    case "partial":
      return "🟡";
    case "missed":
      return "⚪";
  }
}
