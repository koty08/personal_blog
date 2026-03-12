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
    <div className={`about-reveal bg-card/80 rounded-2xl border p-8 shadow-sm backdrop-blur-sm ${className ?? ""}`}>
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-primary/10 rounded-xl p-2">{icon}</div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
}
