"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AppState, Reflection, RitualId } from "@/types";
import {
  createEmptyDay,
  EMPTY_STATE,
  setReflectionInState,
  toggleRitualInState,
} from "@/lib/state";
import {
  isOnboardingComplete,
  loadStoredState,
  markOnboardingComplete,
  saveStoredState,
} from "@/lib/storage";
import BottomNav from "@/components/BottomNav";
import Onboarding from "@/components/Onboarding";

interface AppContextValue {
  state: AppState;
  hydrated: boolean;
  showOnboarding: boolean;
  toggle: (date: string, ritualId: RitualId) => void;
  reflect: (date: string, reflection: Reflection) => void;
  startChallenge: (startDate: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-2 border-sage border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within ClientProviders");
  return ctx;
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(EMPTY_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const stored = loadStoredState();
    if (stored && isOnboardingComplete()) {
      setState(stored);
    } else {
      setShowOnboarding(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !showOnboarding) {
      saveStoredState(state);
    }
  }, [state, hydrated, showOnboarding]);

  const toggle = useCallback((date: string, ritualId: RitualId) => {
    setState((prev) => toggleRitualInState(prev, date, ritualId));
  }, []);

  const reflect = useCallback((date: string, reflection: Reflection) => {
    setState((prev) => setReflectionInState(prev, date, reflection));
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

  const value = useMemo(
    () => ({
      state,
      hydrated,
      showOnboarding,
      toggle,
      reflect,
      startChallenge,
    }),
    [state, hydrated, showOnboarding, toggle, reflect, startChallenge]
  );

  if (!hydrated) {
    return <LoadingScreen />;
  }

  if (showOnboarding) {
    return <Onboarding onStart={startChallenge} />;
  }

  return (
    <AppContext.Provider value={value}>
      <main className="max-w-lg mx-auto min-h-screen pb-24 safe-top">
        {children}
      </main>
      <BottomNav />
    </AppContext.Provider>
  );
}
