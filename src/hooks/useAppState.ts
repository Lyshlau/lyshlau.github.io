"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AppState,
  Reflection,
  RitualId,
} from "@/types";
import {
  createInitialState,
  createEmptyDay,
  setReflection,
  toggleRitual,
} from "@/lib/utils";

const STORAGE_KEY = "wave-app-state";
const ONBOARDING_KEY = "wave-onboarding-complete";

function loadState(): AppState | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as AppState;
    }
  } catch {
    // fall through
  }
  return null;
}

function isOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ONBOARDING_KEY) === "true";
}

function markOnboardingComplete(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARDING_KEY, "true");
}

function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useAppState() {
  const [state, setState] = useState<AppState>(createInitialState);
  const [hydrated, setHydrated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const stored = loadState();
    if (stored && isOnboardingComplete()) {
      setState(stored);
    } else {
      setShowOnboarding(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !showOnboarding) {
      saveState(state);
    }
  }, [state, hydrated, showOnboarding]);

  const toggle = useCallback((date: string, ritualId: RitualId) => {
    setState((prev) => toggleRitual(prev, date, ritualId));
  }, []);

  const reflect = useCallback((date: string, reflection: Reflection) => {
    setState((prev) => setReflection(prev, date, reflection));
  }, []);

  const startChallenge = useCallback((startDate: string) => {
    const newState: AppState = {
      challengeStartDate: startDate,
      days: { [startDate]: createEmptyDay(startDate) },
    };
    setState(newState);
    markOnboardingComplete();
    setShowOnboarding(false);
  }, []);

  const resetChallenge = useCallback((startDate: string) => {
    const newState = createInitialState();
    newState.challengeStartDate = startDate;
    newState.days = { [startDate]: newState.days[startDate] };
    setState(newState);
  }, []);

  return {
    state,
    hydrated,
    showOnboarding,
    toggle,
    reflect,
    startChallenge,
    resetChallenge,
  };
}
