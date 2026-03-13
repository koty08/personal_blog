"use client";

import { categoryOptions } from "@/services/category/options";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function PostCategoryLinks({ vertical = false }: { vertical?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const { data: categories } = useSuspenseQuery(categoryOptions);

  const allCategory = {
    id: 0,
    name: "전체보기",
    count: categories ? categories.reduce((p, c) => p + c.count, 0) : 0,
  };

  const onButtonClicked = (name: string) => {
    const params = new URLSearchParams(searchParams);
    if (name !== "전체보기") params.set("category", name);
    else params.delete("category");
    router.push(`${pathname}?${params}`);
  };

  return (
    <div className={vertical ? "flex flex-col gap-1" : "flex max-h-18 flex-wrap gap-2 overflow-hidden"}>
      {[allCategory, ...categories].map((c) => {
        const isSelected = c.name === "전체보기" ? !currentCategory : currentCategory === c.name;
        return (
          <Button
            key={c.id}
            variant={isSelected ? "default" : "secondary"}
            size="sm"
            onClick={() => onButtonClicked(c.name)}
            className={`rounded-md transition-all hover:cursor-pointer ${
              isSelected ? "font-semibold" : "text-muted-foreground hover:text-foreground bg-secondary/40"
            }`}
          >
            {c.name}
            <span className="ml-1.5 text-xs opacity-80">{c.count}</span>
          </Button>
        );
      })}
    </div>
  );
}
