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
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center space-x-4 text-sm">
          <Button variant="ghost" className="mr-0">
            최신순
          </Button>
          <Button variant="ghost" className="mr-0">
            인기순
          </Button>
          <Button variant="ghost" className="mr-0">
            최신 수정순
          </Button>
        </div>
        <PostCardView />
      </div>
    </HydrationBoundary>
  );
}
