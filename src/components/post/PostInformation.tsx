"use client";

import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postOptions } from "@/services/post/options";
import { useParams } from "next/navigation";
import { categoryOptions } from "@/services/category/options";
import { dateFormat } from "@/consts/common";

export default function PostInformation() {
  const { uid } = useParams<{ uid: string }>();
  const { data } = useSuspenseQuery(postOptions({ uid }));
  const { data: categories } = useSuspenseQuery(categoryOptions);

  return (
    <div className="flex flex-col gap-6">
      <h1 id="title" className="text-4xl font-bold">
        {data.title}
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge variant={"default"}>{categories.find((c) => c.id === data.categoryId)?.name ?? "카테고리"}</Badge>
          <p>{`조회 - ${data.views}`}</p>
          <p>{`읽는 시간 - ${data.readTime}분`}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <p>{dayjs(data.register_date).format(dateFormat)}</p>
          {dayjs(data.updated_date).diff(data.register_date, "day") > 1 && (
            <>
              <Separator orientation="vertical" />
              <p>{`최근 수정: ${dayjs(data.updated_date).format(dateFormat)}`}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
