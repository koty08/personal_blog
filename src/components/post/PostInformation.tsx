"use client";

import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postOptions } from "@/services/post/options";
import { useParams } from "next/navigation";
import { categoryOptions } from "@/services/category/options";
import { dateFormat } from "@/consts/common";
import { Eye, Clock, Calendar, RefreshCw } from "lucide-react";

export default function PostInformation() {
  const { uid } = useParams<{ uid: string }>();
  const { data } = useSuspenseQuery(postOptions({ uid }));
  const { data: categories } = useSuspenseQuery(categoryOptions);

  const isUpdated = dayjs(data.updated_date).diff(data.register_date, "day") > 1;

  return (
    <div className="flex flex-col gap-5 border-b pb-6">
      <h1 id="title" className="text-4xl leading-snug font-bold">
        {data.title}
      </h1>
      <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
        <Badge variant="default" className="text-xs">
          {categories.find((c) => c.id === data.categoryId)?.name ?? "카테고리"}
        </Badge>
        <Separator orientation="vertical" className="h-4" />
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {dayjs(data.register_date).format(dateFormat)}
        </span>
        {isUpdated && (
          <>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <RefreshCw className="h-3.5 w-3.5" />
              {`최근 수정: ${dayjs(data.updated_date).format(dateFormat)}`}
            </span>
          </>
        )}
        <Separator orientation="vertical" className="h-4" />
        <span className="flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" />
          {data.views}
        </span>
        <Separator orientation="vertical" className="h-4" />
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {`${data.readTime}분`}
        </span>
      </div>
    </div>
  );
}
