interface PageHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function PageHeader({
  title,
  subtitle,
  align = "left",
}: PageHeaderProps) {
  return (
    <header
      className={`mb-14 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h1 className="font-serif text-[2.5rem] leading-[1.1] text-olive font-normal tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[13px] text-charcoal/45 mt-3 font-light tracking-wide leading-relaxed max-w-xs">
          {subtitle}
        </p>
      )}
    </header>
  );
}
