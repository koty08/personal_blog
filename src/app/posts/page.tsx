import PostCategoryLinks from "@/components/posts/PostsCategoryLinks";
import PostOrderButton from "@/components/posts/PostsOrderButton";
import { getQueryClient } from "@/lib/getQueryClient";
import { postsOptions } from "@/services/posts/options";
import { PostsOrderType } from "@/services/posts/interface";
import { categoryOptions } from "@/services/category/options";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PostsListView from "@/components/posts/PostsListView";
import { SearchParams } from "@/lib/serverInterface";

export default async function Posts({ searchParams }: { searchParams: SearchParams }) {
  const { order, page, category: rawCategory } = await searchParams;
  const category = rawCategory ? decodeURI(rawCategory) : undefined;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    postsOptions({
      order: order as PostsOrderType,
      page: Number(page || 1),
      category,
    })
  );
  await queryClient.prefetchQuery(categoryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-8 py-5">
        <div className="flex items-center gap-3 justify-between">
          <PostCategoryLinks />
          <PostOrderButton />
        </div>
        <PostsListView />
      </div>
    </HydrationBoundary>
  );
}
