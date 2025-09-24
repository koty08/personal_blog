"use client";

import { categoryOptions } from "@/services/category/options";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function PostCategoryLinks() {
  const router = useRouter();
  const { data: categorys } = useQuery(categoryOptions);

  const allCategory = {
    id: 0,
    name: "전체보기",
    count: categorys ? categorys.reduce((p, c) => p + c.count, 0) : 0,
  };

  if (!categorys) return <></>;

  const onButtonClicked = (name: string) => {
    router.replace(name === "전체보기" ? "/posts" : `/posts?category=${encodeURI(name)}`);
  };

  return (
    <div className="flex gap-3">
      {[allCategory, ...categorys].map((c) => (
        <Button
          key={c.id}
          variant={"outline"}
          onClick={onButtonClicked.bind(null, c.name)}
          className="flex gap-1 items-center hover:cursor-pointer"
        >
          {c.name}
          <p className="text-(--muted-foreground) text-sm">{c.count}</p>
        </Button>
      ))}
    </div>
  );
}
