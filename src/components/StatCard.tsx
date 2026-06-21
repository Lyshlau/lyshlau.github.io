interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
}

export default function StatCard({ label, value, sublabel }: StatCardProps) {
  return (
    <div className="bg-white/60 rounded-2xl p-4 shadow-card">
      <p className="text-xs text-charcoal/50 uppercase tracking-wider font-medium">
        {label}
      </p>
      <p className="text-2xl font-serif text-olive mt-1">{value}</p>
      {sublabel && (
        <p className="text-xs text-charcoal/40 mt-0.5">{sublabel}</p>
      )}
    </div>
  );
}
