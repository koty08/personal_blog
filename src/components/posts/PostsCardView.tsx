"use client";

import Link from "next/link";
import { Card, CardContent, CardTitle } from "../ui/card";
import PostThumbnail from "../common/PostThumbnail";
import { removeMDFromContent, getFirstImage } from "@/lib/markdownUtils";
import { useQuery } from "@tanstack/react-query";
import { postsOptions } from "@/services/posts/options";
import { useSearchParams } from "next/navigation";
import { PostsOrderType } from "@/services/posts/interface";

export default function PostCardView() {
  const searchParams = useSearchParams();
  const { data } = useQuery(postsOptions({ order: (searchParams.get("order") as PostsOrderType) ?? undefined }));

  return (
    <div className="w-full flex flex-wrap gap-y-[20px] gap-x-[2%]">
      {data?.posts.map((post) => {
        const path = getFirstImage(post.content);
        return (
          <Link key={post.uid} href={`/post/${post.uid}`}>
            <Card className="py-4 w-[350px] hover:cursor-pointer transition-all hover:border-gray-300 hover:bg-(--accent)">
              <PostThumbnail path={path} alt={"thumbnail"} className="w-full h-[160px]" />
              <CardTitle className="mt-3 mb-2 px-4 truncate">{post.title}</CardTitle>
              <CardContent className="text-sm px-4">
                <p className="line-clamp-2">{removeMDFromContent(post.content)}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
