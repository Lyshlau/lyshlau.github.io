import type { DayStatus } from "@/types";
import StatusIndicator from "@/components/StatusIndicator";

interface StatCardProps {
  label: string;
  value: string | number;
  status?: DayStatus;
}

export default function StatCard({ label, value, status }: StatCardProps) {
  return (
    <div className="py-5">
      {status && (
        <div className="mb-3">
          <StatusIndicator status={status} size="sm" />
        </div>
      )}
      <p className="font-serif text-3xl text-olive font-normal tracking-tight">
        {value}
      </p>
      <p className="label-caps mt-2">{label}</p>
    </div>
  );
}
