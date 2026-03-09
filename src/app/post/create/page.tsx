import PostForm from "@/components/admin/PostForm";
import { checkIsKoty } from "@/lib/auth-server";
import { getQueryClient } from "@/lib/getQueryClient";
import { categoryOptions } from "@/services/category/options";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default async function CreatePost() {
  const isKoty = await checkIsKoty();
  if (!isKoty) notFound();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(categoryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center gap-15">
        <p className="text-2xl font-bold">게시글 생성</p>
        <PostForm type="CREATE" />
      </div>
    </HydrationBoundary>
  );
}
