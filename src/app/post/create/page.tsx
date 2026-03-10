import PostForm from "@/components/admin/PostForm";
import { checkIsKoty } from "@/lib/auth-server";
import { getQueryClient } from "@/lib/getQueryClient";
import QueryWrapper from "@/lib/QueryWrapper";
import { categoryOptions } from "@/services/category/options";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default async function CreatePost() {
  const isKoty = await checkIsKoty();
  if (!isKoty) notFound();

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(categoryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center gap-15 py-4">
        <p className="text-2xl font-bold">게시글 생성</p>
        <QueryWrapper loadingStyle="h-screen" errorStyle="h-screen">
          <PostForm type="CREATE" />
        </QueryWrapper>
      </div>
    </HydrationBoundary>
  );
}
