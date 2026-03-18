import { cn } from "@/lib/utils";
import { josa } from "es-hangul";

interface NoDataProps {
  target: string;
  className?: string;
}

export default function NoData({ target, className }: NoDataProps) {
  return (
    <div className={cn("flex w-full items-center justify-center py-20 text-lg", className)}>{`${josa(target, "이/가")} 없습니다.`}</div>
  );
}
