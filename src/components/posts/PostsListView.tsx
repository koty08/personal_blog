"use client";

import { Fragment } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { removeMDFromContent } from "@/lib/markdownUtils";
import CustomPagination from "@/components/common/CustomPagination";
import { Separator } from "@/components/ui/separator";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postsOptions } from "@/services/post/options";
import { categoryOptions } from "@/services/category/options";
import { useSearchParams } from "next/navigation";
import { PostsOrderType } from "@/services/post/interface";

const POST_PER_PAGE = 8;

export default function PostsListView() {
  const searchParams = useSearchParams();

  const { data } = useSuspenseQuery(
    postsOptions({
      order: (searchParams.get("order") as PostsOrderType) ?? undefined,
      page: Number(searchParams.get("page") || 1),
      category: searchParams.get("category") ?? undefined,
      temp: searchParams.get("temp") === "true" ? true : undefined,
    })
  );
  const { data: categories } = useSuspenseQuery(categoryOptions);

  return (
    <div className="flex flex-col gap-2">
      {data.posts.map((post, idx) => (
        <Fragment key={post.uid}>
          <Link href={`/post/${post.uid}`} className="group">
            <div className={`group-hover:bg-accent/80 flex flex-col gap-2 rounded-md p-3 transition-colors`}>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="shrink-0 text-xs font-normal">
                  {categories.find((c) => c.id === post.categoryId)?.name ?? "카테고리"}
                </Badge>
                <h3 className="line-clamp-1 flex-1 font-medium transition-colors">{post.title}</h3>
                <span className="text-muted-foreground hidden shrink-0 text-xs sm:block">
                  {dayjs(post.register_date).format("YYYY-MM-DD")}
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-5">
                <p className="line-clamp-1 flex-1 text-sm">{removeMDFromContent(post.content)}</p>
                <div className="flex shrink-0 items-center gap-2 text-xs">
                  <span>{`조회 ${post.views}`}</span>
                  <Separator orientation="vertical" className="h-3" />
                  <span>{`댓글 ${post.commentCount}`}</span>
                  <Separator orientation="vertical" className="h-3" />
                  <span>{`${post.readTime}분`}</span>
                </div>
              </div>
            </div>
          </Link>
          {idx !== data.posts.length - 1 && <Separator />}
        </Fragment>
      ))}
      <CustomPagination totalCount={data.count} itemPerPage={POST_PER_PAGE} />
    </div>
  );
}
