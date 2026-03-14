"use client";

import { labelByOrder } from "@/consts/posts";
import { Button } from "../ui/button";
import { omit } from "es-toolkit";
import { useRouter } from "next/navigation";

export default function MainOrderGroup() {
  const router = useRouter();

  const onButtonClicked = (order: string) => {
    router.push(`/?order=${encodeURIComponent(order)}`);
  };

  return (
    <div className="bg-muted flex items-center gap-1 rounded-lg px-2 py-1">
      {Object.entries(omit(labelByOrder, ["oldest"])).map(([key, label]) => (
        <Button
          key={key}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-8 cursor-pointer rounded-md px-3 text-xs font-medium"
          onClick={() => onButtonClicked(key)}
        >
          {`${label}순`}
        </Button>
      ))}
    </div>
  );
}
