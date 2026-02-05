import PostCardView from "@/components/posts/PostsCardView";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { postsOptions } from "@/services/posts/options";
import { SearchParams } from "@/lib/serverInterface";
import { PostsOrderType } from "@/services/posts/interface";

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
            <h2 className="text-2xl font-semibold tracking-tight">All Posts</h2>
            <div className="bg-muted/50 flex items-center gap-1 rounded-lg p-1">
              <Button variant="ghost" size="sm" className="h-8 rounded-md px-3 text-xs font-medium">
                최신순
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground h-8 rounded-md px-3 text-xs font-medium"
              >
                인기순
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground h-8 rounded-md px-3 text-xs font-medium"
              >
                최신 수정순
              </Button>
            </div>
          </div>
          <PostCardView />
        </div>
      </section>
    </HydrationBoundary>
  );
}
