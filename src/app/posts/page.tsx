import PostCategoryLinks from "@/components/posts/PostsCategoryLinks";
import PostOrderSelect from "@/components/posts/PostOrderSelect";
import { getQueryClient } from "@/lib/getQueryClient";
import { categoryOptions } from "@/services/category/options";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PostsListView from "@/components/posts/PostsListView";
import QueryWrapper from "@/lib/QueryWrapper";
import { checkIsKoty } from "@/lib/auth-server";
import PostCreateAndFilter from "@/components/admin/PostCreateAndFilter";

export default async function Posts() {
  const queryClient = getQueryClient();
  const isKoty = await checkIsKoty();

  void queryClient.prefetchQuery(categoryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-3">
          <QueryWrapper loadingStyle="h-9" errorStyle="h-9">
            <PostCategoryLinks />
            <div className="flex items-center gap-2">
              <PostOrderSelect />
              {isKoty && <PostCreateAndFilter />}
            </div>
          </QueryWrapper>
        </div>
        <QueryWrapper loadingStyle="h-160" errorStyle="h-32">
          <PostsListView />
        </QueryWrapper>
      </div>
    </HydrationBoundary>
  );
}
