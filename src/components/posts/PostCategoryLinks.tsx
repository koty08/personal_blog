"use client";

import { CategoryWithPostCount } from "@/app/api/category/interface";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function PostCategoryLinks({ categorys }: { categorys: CategoryWithPostCount[] | null }) {
  const router = useRouter();
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
