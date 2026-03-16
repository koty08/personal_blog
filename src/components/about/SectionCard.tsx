import { ReactNode } from "react";

export default function SectionCard({
  icon,
  title,
  children,
  className,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`about-reveal bg-card/80 rounded-2xl border px-8 pt-7 pb-8 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md ${className ?? ""}`}
    >
      <div className="mb-7 flex items-center gap-3">
        <div className="bg-primary/10 rounded-xl p-2">{icon}</div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="border-border/60 -mx-8 mb-6 border-t" />
      {children}
    </div>
  );
}
