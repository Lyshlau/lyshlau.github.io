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
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6"
      style={{ backgroundColor: "#F6F3EE" }}
    >
      <p className="font-serif text-4xl text-olive">Wave</p>
      <p className="text-sm text-charcoal/50 mt-3 font-light tracking-wide">
        Wave is running
      </p>
    </div>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within ClientProviders");
  }
  return ctx;
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(EMPTY_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    try {
      const stored = loadStoredState();
      if (stored?.challengeStartDate && isOnboardingComplete()) {
        setState(stored);
      } else {
        setShowOnboarding(true);
      }
    } catch {
      setShowOnboarding(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !showOnboarding && state.challengeStartDate) {
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
    saveStoredState(newState);
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

  const showOverlay = !hydrated || showOnboarding;
  const showApp = hydrated && !showOnboarding;

  return (
    <AppContext.Provider value={value}>
      {showOverlay && (
        <div className="fixed inset-0 z-[100]">
          {!hydrated ? (
            <LoadingScreen />
          ) : (
            <Onboarding onStart={startChallenge} />
          )}
        </div>
      )}
      <main
        className={`max-w-lg mx-auto min-h-screen pb-28 safe-top ${
          showOverlay ? "invisible" : ""
        }`}
        aria-hidden={showOverlay}
      >
        {children}
      </main>
      {showApp && <BottomNav />}
    </AppContext.Provider>
  );
}
