import PostCardView from "@/components/posts/PostsCardView";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { postsOptions } from "@/services/post/options";
import { SearchParams } from "@/lib/serverInterface";
import { PostsOrderType } from "@/services/post/interface";
import { labelByOrder } from "@/consts/post";
import MainOrderGroup from "@/components/main/MainOrderGroup";
import QueryWrapper from "@/lib/QueryWrapper";
import { categoryOptions } from "@/services/category/options";
import { statsOptions } from "@/services/stats/options";
import StatsCards from "@/components/main/StatsCard";
import StatsGraph from "@/components/main/StatsGraph";

export default async function Main({ searchParams }: { searchParams: SearchParams }) {
  const { order } = await searchParams;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(categoryOptions);
  void queryClient.prefetchQuery(statsOptions);
  void queryClient.prefetchQuery(
    postsOptions({
      order: order as PostsOrderType,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-x-20 gap-y-4 md:flex-row md:items-center">
          <div className="shrink-0 space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">Koty's Blog</h1>
            <p className="text-muted-foreground text-lg">개발 경험과 지식을 공유하는 공간입니다.</p>
          </div>
          <QueryWrapper loadingStyle="h-24.5 w-full max-w-124 ml-auto" errorStyle="h-24.5">
            <StatsCards />
          </QueryWrapper>
        </div>
        <QueryWrapper loadingStyle="h-51.5" errorStyle="h-51.5">
          <StatsGraph />
        </QueryWrapper>
      </div>
      <div className="space-y-6">
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
