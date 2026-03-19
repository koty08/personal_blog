import PostCardView from "@/components/posts/PostsCardView";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { postsOptions } from "@/services/post/options";
import { SearchParams } from "@/lib/serverInterface";
import { PostsOrderType } from "@/services/post/interface";
import { labelByOrder } from "@/consts/posts";
import MainOrderGroup from "@/components/posts/MainOrderGroup";
import QueryWrapper from "@/lib/QueryWrapper";
import { categoryOptions } from "@/services/category/options";

export default async function Main({ searchParams }: { searchParams: SearchParams }) {
  const { order } = await searchParams;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(categoryOptions);
  void queryClient.prefetchQuery(
    postsOptions({
      order: order as PostsOrderType,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Koty's Blog</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">개발 경험과 지식을 공유하는 공간입니다.</p>
      </div>
      <div className="space-y-8">
        <div className="flex flex-col items-center justify-between gap-4 border-b pb-4 sm:flex-row">
          <h2 className="text-2xl font-semibold tracking-tight">{`${labelByOrder[order ?? "latest"]} 게시물`}</h2>
          <QueryWrapper loadingStyle="h-10">
            <MainOrderGroup />
          </QueryWrapper>
        </div>
        <QueryWrapper loadingStyle="h-192" errorStyle="h-32">
          <PostCardView />
        </QueryWrapper>
      </div>
    </HydrationBoundary>
  );
}
