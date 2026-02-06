import PostCardView from "@/components/posts/PostsCardView";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { postsOptions } from "@/services/posts/options";
import { SearchParams } from "@/lib/serverInterface";
import { PostsOrderType } from "@/services/posts/interface";
import { labelByOrder } from "@/consts/posts";
import MainOrderGroup from "@/components/posts/MainOrderGroup";

export default async function Main({ searchParams }: { searchParams: SearchParams }) {
  const { order } = await searchParams;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    postsOptions({
      order: order as PostsOrderType,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="container mx-auto max-w-5xl space-y-12 py-12 md:py-20">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Koty's Blog</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">개발 경험과 지식을 공유하는 공간입니다.</p>
        </div>
        <div className="space-y-8">
          <div className="flex flex-col items-center justify-between gap-4 border-b pb-4 sm:flex-row">
            <h2 className="text-2xl font-semibold tracking-tight">{`${labelByOrder[order ?? "latest"]} 게시물`}</h2>
            <MainOrderGroup />
          </div>
          <PostCardView />
        </div>
      </section>
    </HydrationBoundary>
  );
}
