import type { DayStatus } from "@/types";
import { STATUS_COLORS } from "@/lib/icons";

interface StatusIndicatorProps {
  status: DayStatus;
  showLabel?: boolean;
  size?: "sm" | "md";
}

const labels: Record<DayStatus, string> = {
  complete: "Complete",
  partial: "Partial",
  missed: "Quiet day",
};

export default function StatusIndicator({
  status,
  showLabel = false,
  size = "md",
}: StatusIndicatorProps) {
  const dotSize = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`rounded-full flex-shrink-0 ${dotSize} ${STATUS_COLORS[status]}`}
      />
      {showLabel && (
        <span className="text-[13px] text-charcoal/55 font-light tracking-wide">
          {labels[status]}
        </span>
      )}
    </span>
  );
}
