import { ReactNode } from "react";

interface EditorialCardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingMap = {
  sm: "p-6",
  md: "p-8",
  lg: "p-10",
};

export default function EditorialCard({
  children,
  className = "",
  padding = "md",
}: EditorialCardProps) {
  return (
    <div
      className={`rounded-sm border border-sand/30 bg-white/30 ${paddingMap[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
