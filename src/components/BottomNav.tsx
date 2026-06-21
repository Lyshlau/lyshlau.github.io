"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Circle, Home, Sparkles } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/rituals", label: "Rituals", icon: Circle },
  { href: "/progress", label: "Progress", icon: Calendar },
  { href: "/insights", label: "Insights", icon: Sparkles },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-sand/20 safe-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around px-4 py-3">
        {tabs.map((tab) => {
          const active =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-1.5 py-1 px-4 min-w-[72px]"
            >
              <Icon
                size={20}
                strokeWidth={active ? 1.5 : 1.25}
                className={
                  active ? "text-olive" : "text-charcoal/30"
                }
              />
              <span
                className={`text-[9px] tracking-[0.15em] uppercase ${
                  active ? "text-olive" : "text-charcoal/30"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
