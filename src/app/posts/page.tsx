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
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[200px_1fr] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-4">
            <span className="text-muted-foreground font-semibold tracking-wider uppercase">카테고리</span>
            <QueryWrapper loadingStyle="h-40" errorStyle="h-40">
              <PostCategoryLinks vertical />
            </QueryWrapper>
          </div>
        </aside>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3 lg:justify-end">
            <div className="lg:hidden">
              <QueryWrapper loadingStyle="h-9" errorStyle="h-9">
                <PostCategoryLinks />
              </QueryWrapper>
            </div>
            <div className="flex items-center gap-2">
              <QueryWrapper loadingStyle="h-9" errorStyle="h-9">
                <PostOrderSelect />
                {isKoty && <PostCreateAndFilter />}
              </QueryWrapper>
            </div>
          </div>
          <QueryWrapper loadingStyle="h-160" errorStyle="h-32">
            <PostsListView />
          </QueryWrapper>
        </div>
      </div>
    </HydrationBoundary>
  );
}
