import PostForm from "@/components/post/PostForm";
import { getQueryClient } from "@/lib/getQueryClient";
import { categoryOptions } from "@/services/category/options";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function CreatePost() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(categoryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-15 items-center">
        <p className="text-2xl font-bold">게시글 생성</p>
        <PostForm type="CREATE" />
      </div>
    </HydrationBoundary>
  );
}
