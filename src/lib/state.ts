import { AppState, Reflection, RitualId, RITUALS } from "@/types";

export function createEmptyDay(date: string) {
  const rituals = {} as Record<RitualId, boolean>;
  for (const ritual of RITUALS) {
    rituals[ritual.id] = false;
  }
  return { date, rituals, reflection: null as Reflection | null };
}

export const EMPTY_STATE: AppState = {
  challengeStartDate: "",
  days: {},
};

export function toggleRitualInState(
  state: AppState,
  date: string,
  ritualId: RitualId
): AppState {
  const existing = state.days[date] ?? createEmptyDay(date);
  return {
    ...state,
    days: {
      ...state.days,
      [date]: {
        ...existing,
        rituals: {
          ...existing.rituals,
          [ritualId]: !existing.rituals[ritualId],
        },
      },
    },
  };
}

export function setReflectionInState(
  state: AppState,
  date: string,
  reflection: Reflection
): AppState {
  const existing = state.days[date] ?? createEmptyDay(date);
  return {
    ...state,
    days: {
      ...state.days,
      [date]: { ...existing, reflection },
    },
  };
}
