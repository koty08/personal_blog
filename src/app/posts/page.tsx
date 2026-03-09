import PostCategoryLinks from "@/components/posts/PostsCategoryLinks";
import PostOrderSelect from "@/components/posts/PostOrderSelect";
import { getQueryClient } from "@/lib/getQueryClient";
import { postsOptions } from "@/services/post/options";
import { PostsOrderType } from "@/services/post/interface";
import { categoryOptions } from "@/services/category/options";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PostsListView from "@/components/posts/PostsListView";
import { SearchParams } from "@/lib/serverInterface";
import QueryWrapper from "@/lib/QueryWrapper";

export default async function Posts({ searchParams }: { searchParams: SearchParams }) {
  const { order, page, category: rawCategory } = await searchParams;
  const category = rawCategory ? decodeURI(rawCategory) : undefined;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(categoryOptions);
  void queryClient.prefetchQuery(
    postsOptions({
      order: order as PostsOrderType,
      page: Number(page || 1),
      category,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-3">
          <QueryWrapper loadingStyle="h-9" errorStyle="h-9">
            <PostCategoryLinks />
            <PostOrderSelect />
          </QueryWrapper>
        </div>
        <QueryWrapper loadingStyle="h-160" errorStyle="h-32">
          <PostsListView />
        </QueryWrapper>
      </div>
    </HydrationBoundary>
  );
}
