"use client";

import Link from "next/link";
import dayjs from "dayjs";
import PostThumbnail from "@/components/post/PostThumbnail";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { removeMDFromContent, getFirstImage } from "@/lib/markdownUtils";
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
    })
  );
  const { data: categories } = useSuspenseQuery(categoryOptions);

  return (
    <div className="flex flex-col gap-6">
      {data.posts.map((post) => {
        const path = getFirstImage(post.content);
        return (
          <Link key={post.uid} href={`/post/${post.uid}`} className="group">
            <Card className="flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md sm:flex-row">
              <div className="aspect-video shrink-0 overflow-hidden sm:aspect-auto sm:w-72">
                <PostThumbnail
                  path={path}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-normal">
                      {categories.find((c) => c.id === post.categoryId)?.name ?? "카테고리"}
                    </Badge>
                    <span className="text-muted-foreground text-sm">{dayjs(post.register_date).format("YYYY-MM-DD")}</span>
                  </div>
                  <h3 className="group-hover:text-primary line-clamp-1 text-xl font-bold tracking-tight transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">{removeMDFromContent(post.content)}</p>
                </div>
                <div className="text-muted-foreground mt-auto flex items-center gap-3 text-xs">
                  <span>{`조회수 ${post.views}`}</span>
                  <Separator orientation="vertical" className="h-3" />
                  <span>{`읽는 시간 ${post.readTime}분`}</span>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
      <CustomPagination totalCount={data.count} itemPerPage={POST_PER_PAGE} />
    </div>
  );
}
