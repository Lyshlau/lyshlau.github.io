"use client";

import { useApp } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import Onboarding from "@/components/Onboarding";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { showOnboarding, startChallenge, hydrated } = useApp();

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-sage border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {showOnboarding && <Onboarding onStart={startChallenge} />}
      <main className="max-w-lg mx-auto min-h-screen pb-24 safe-top">
        {children}
      </main>
      {!showOnboarding && <BottomNav />}
    </>
  );
}
