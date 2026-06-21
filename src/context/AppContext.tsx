"use client";

import { createContext, useContext, ReactNode } from "react";
import { AppState, Reflection, RitualId } from "@/types";
import { useAppState } from "@/hooks/useAppState";

interface AppContextValue {
  state: AppState;
  hydrated: boolean;
  showOnboarding: boolean;
  toggle: (date: string, ritualId: RitualId) => void;
  reflect: (date: string, reflection: Reflection) => void;
  startChallenge: (startDate: string) => void;
  resetChallenge: (startDate: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const value = useAppState();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
