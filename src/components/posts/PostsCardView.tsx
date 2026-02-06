"use client";

import Link from "next/link";
import { Card, CardContent, CardTitle } from "../ui/card";
import PostThumbnail from "../common/PostThumbnail";
import { removeMDFromContent, getFirstImage } from "@/lib/markdownUtils";
import { useQuery } from "@tanstack/react-query";
import { postsOptions } from "@/services/posts/options";
import { useSearchParams } from "next/navigation";
import { PostsOrderType } from "@/services/posts/interface";
import { categoryOptions } from "@/services/category/options";
import { Badge } from "../ui/badge";
import dayjs from "dayjs";

export default function PostCardView() {
  const searchParams = useSearchParams();

  const { data } = useQuery(
    postsOptions({
      order: (searchParams.get("order") as PostsOrderType) ?? undefined,
    })
  );
  const { data: categorys } = useQuery(categoryOptions);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data?.posts.map((post) => {
        const path = getFirstImage(post.content);
        return (
          <Link key={post.uid} href={`/post/${post.uid}`} className="group">
            <Card className="hover:bg-accent h-full gap-5 overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="aspect-video w-full overflow-hidden">
                <PostThumbnail
                  path={path}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div className="text-secondary-foreground flex flex-wrap justify-between gap-2">
                  <Badge variant="secondary" className="font-normal">
                    {categorys?.find((c) => c.id === post.categoryId)?.name ?? "카테고리"}
                  </Badge>
                  {dayjs(post.register_date).format("YYYY-MM-DD")}
                </div>
                <CardTitle className="line-clamp-1 text-lg">{post.title}</CardTitle>
                <CardContent className="text-muted-foreground p-0 text-sm">
                  <p className="line-clamp-2">{removeMDFromContent(post.content)}</p>
                </CardContent>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
