"use client";

import Link from "next/link";
import dayjs from "dayjs";
import PostThumbail from "@/components/common/PostThumbnail";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { removeMDFromContent, getFirstImage } from "@/lib/markdownUtils";
import CustomPagination from "@/components/common/CustomPagination";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { postsOptions } from "@/services/posts/options";
import { categoryOptions } from "@/services/category/options";
import { useSearchParams } from "next/navigation";
import { PostsOrderType } from "@/services/posts/interface";

const POST_PER_PAGE = 8;

export default function PostsListView() {
  const searchParams = useSearchParams();

  const { data } = useQuery(
    postsOptions({
      order: (searchParams.get("order") as PostsOrderType) ?? undefined,
      page: Number(searchParams.get("page") || 1),
      category: searchParams.get("category") ?? undefined,
    })
  );
  const { data: categorys } = useQuery(categoryOptions);

  return (
    <div className="flex flex-col gap-4">
      {data?.posts.map((post) => {
        const path = getFirstImage(post.content);
        return (
          <Link key={post.uid} href={`/post/${post.uid}`}>
            <Card className="flex flex-row gap-5 flex-wrap p-4 justify-center transition-all hover:bg-(--accent) hover:border-gray-300">
              <PostThumbail path={path} alt={"thumbnail"} className="w-[260px] h-[160px]" />
              <div className="flex flex-col flex-1 gap-4 min-w-xs">
                <div className="flex flex-col gap-1.5">
                  <div className="flex gap-2 items-center">
                    <Badge variant={"default"}>{categorys?.find((c) => c.id === post.categoryId)?.name ?? "카테고리"}</Badge>
                    <div className="flex-1 text-xl font-semibold tracking-tight truncate">{post.title}</div>
                  </div>
                  <div className="flex gap-3 text-sm text-(--muted-foreground) items-center">
                    <div>{`조회수: ${post.views}`}</div>
                    <Separator orientation="vertical" />
                    <div>{`읽는 시간: ${post.readTime}분`}</div>
                    <Separator orientation="vertical" />
                    <div>{dayjs(post.register_date).format("YYYY-MM-DD")}</div>
                  </div>
                </div>
                <p className="leading-7 line-clamp-3">{removeMDFromContent(post.content)}</p>
              </div>
            </Card>
          </Link>
        );
      })}
      {data && <CustomPagination totalCount={data.count} itemPerPage={POST_PER_PAGE} />}
    </div>
  );
}
