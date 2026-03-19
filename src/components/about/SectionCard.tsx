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
      className={`about-reveal bg-card/80 rounded-2xl border px-4 pt-3 pb-4 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md sm:px-8 sm:pt-7 sm:pb-8 ${className ?? ""}`}
    >
      <div className="mb-3 flex items-center gap-3 sm:mb-7">
        <div className="bg-primary/10 rounded-xl p-2">{icon}</div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="border-border/60 -mx-4 mb-4 border-t sm:-mx-8 sm:mb-6" />
      {children}
    </div>
  );
}
