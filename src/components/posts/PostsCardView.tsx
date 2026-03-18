"use client";

import Link from "next/link";
import { Card, CardContent, CardTitle } from "../ui/card";
import PostThumbnail from "../post/PostThumbnail";
import { removeMDFromContent, getFirstImage } from "@/lib/markdownUtils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postsOptions } from "@/services/post/options";
import { useSearchParams } from "next/navigation";
import { PostsOrderType } from "@/services/post/interface";
import { categoryOptions } from "@/services/category/options";
import { Badge } from "../ui/badge";
import dayjs from "dayjs";
import { dateFormat } from "@/consts/common";
import { Eye, MessageSquare, ScrollText } from "lucide-react";
import NoData from "../common/NoData";

export default function PostCardView() {
  const searchParams = useSearchParams();

  const { data } = useSuspenseQuery(
    postsOptions({
      order: (searchParams.get("order") as PostsOrderType) ?? undefined,
    })
  );
  const { data: categories } = useSuspenseQuery(categoryOptions);

  if (data.count === 0) return <NoData target="생성된 게시글" />;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.posts.map((post) => {
        const path = getFirstImage(post.content);
        return (
          <Link key={post.uid} href={`/post/${post.uid}`} className="group">
            <Card className="border-border/50 hover:border-border h-full overflow-hidden py-0 pt-5 pb-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="aspect-video w-full overflow-hidden">
                <PostThumbnail
                  path={path}
                  alt={post.title}
                  objectFit="contain"
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="shrink-0 text-xs font-normal">
                    {categories.find((c) => c.id === post.categoryId)?.name ?? "카테고리"}
                  </Badge>
                  <span className="text-muted-foreground shrink-0 text-xs">{dayjs(post.register_date).format(dateFormat)}</span>
                </div>
                <CardTitle className="line-clamp-2 text-base leading-snug">{post.title}</CardTitle>
                <CardContent className="text-muted-foreground p-0 text-sm">
                  <p className="line-clamp-2 leading-relaxed">{removeMDFromContent(post.content)}</p>
                </CardContent>
                <div className="text-muted-foreground border-border/50 flex items-center gap-3 border-t pt-2 text-xs">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {post.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {post.commentCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <ScrollText className="h-3.5 w-3.5" />
                    {`${post.readTime}분`}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
