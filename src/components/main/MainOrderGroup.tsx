"use client";

import { labelByOrder } from "@/consts/post";
import { Button } from "../ui/button";
import { omit } from "es-toolkit";
import { useRouter, useSearchParams } from "next/navigation";

export default function MainOrderGroup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOrder = searchParams.get("order") ?? "latest";

  const onButtonClicked = (order: string) => {
    router.push(`/?order=${encodeURIComponent(order)}`);
  };

  return (
    <div className="bg-muted flex items-center gap-1 rounded-lg px-2 py-1">
      {Object.entries(omit(labelByOrder, ["oldest"])).map(([key, label]) => {
        const isActive = currentOrder === key;
        return (
          <Button
            key={key}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            className={`h-8 cursor-pointer rounded-md px-3 text-xs font-medium ${
              isActive ? "" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onButtonClicked(key)}
          >
            {`${label}순`}
          </Button>
        );
      })}
    </div>
  );
}
