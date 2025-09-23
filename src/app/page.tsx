import PostCardView from "@/components/posts/PostCardView";
import commonFetch from "../lib/commonFetch";
import { PostsWithCount } from "./api/posts/inteface";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () => commonFetch<PostsWithCount>("/posts", undefined, { cache: "no-store" }),
  });

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
