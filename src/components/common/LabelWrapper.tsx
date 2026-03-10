import { ReactNode } from "react";

interface LabelWrapperProps {
  label: string;
  children: ReactNode;
  orientation: "vertical" | "horizontal";
}

const containerStyle = {
  vertical: "flex flex-col gap-1.5",
  horizontal: "flex gap-2.5 items-center",
};

export default function LabelWrapper({ label, children, orientation }: LabelWrapperProps) {
  return (
    <div className={containerStyle[orientation]}>
      <div className="font-semibold shrink-0">{label}</div>
      {children}
    </div>
  );
}
