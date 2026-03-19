import PostForm from "@/components/admin/PostForm";
import { notFound } from "next/navigation";
import { getQueryClient } from "@/lib/getQueryClient";
import { categoryOptions } from "@/services/category/options";
import { postOptions } from "@/services/post/options";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Params } from "@/lib/serverInterface";
import { checkIsKoty } from "@/lib/auth-server";
import QueryWrapper from "@/lib/QueryWrapper";

export default async function UpdatePost({ params }: { params: Params }) {
  const isKoty = await checkIsKoty();
  if (!isKoty) notFound();

  const { uid } = await params;
  if (!uid) notFound();
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(postOptions({ uid }));
  void queryClient.prefetchQuery(categoryOptions);
  const post = await queryClient.fetchQuery(postOptions({ uid })).catch((error) => {
    if (error.status === 404) notFound();
    else return undefined;
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center gap-15 py-4">
        <p className="text-2xl font-bold">게시글 수정</p>
        <QueryWrapper loadingStyle="h-screen" errorStyle="h-screen">
          <PostForm type="UPDATE" originalData={post} />
        </QueryWrapper>
      </div>
    </HydrationBoundary>
  );
}
