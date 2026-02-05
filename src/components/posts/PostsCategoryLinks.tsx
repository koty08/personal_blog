"use client";

import { categoryOptions } from "@/services/category/options";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function PostCategoryLinks() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const { data: categorys } = useQuery(categoryOptions);

  const allCategory = {
    id: 0,
    name: "전체보기",
    count: categorys ? categorys.reduce((p, c) => p + c.count, 0) : 0,
  };

  if (!categorys) return <></>;

  const onButtonClicked = (name: string) => {
    router.push(name === "전체보기" ? "/posts" : `/posts?category=${encodeURIComponent(name)}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {[allCategory, ...categorys].map((c) => {
        const isSelected = c.name === "전체보기" ? !currentCategory : currentCategory === c.name;
        return (
          <Button
            key={c.id}
            variant={isSelected ? "default" : "secondary"}
            size="sm"
            onClick={() => onButtonClicked(c.name)}
            className={`rounded-full transition-all hover:cursor-pointer ${
              isSelected ? "font-semibold" : "text-muted-foreground hover:text-foreground bg-muted/50"
            }`}
          >
            {c.name}
            <span className="ml-1.5 text-xs opacity-60">{c.count}</span>
          </Button>
        );
      })}
    </div>
  );
}
