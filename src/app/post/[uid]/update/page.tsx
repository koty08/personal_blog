import PostForm from "@/components/admin/PostForm";
import { notFound } from "next/navigation";
import { getQueryClient } from "@/lib/getQueryClient";
import { categoryOptions } from "@/services/category/options";
import { postOptions } from "@/services/post/options";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Params } from "@/lib/serverInterface";
import { checkIsKoty } from "@/lib/auth-server";

export default async function UpdatePost({ params }: { params: Params }) {
  const isKoty = await checkIsKoty();
  if (!isKoty) notFound();

  const { uid } = await params;
  if (!uid) notFound();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(postOptions({ uid }));
  await queryClient.prefetchQuery(categoryOptions);

  const post = queryClient.getQueryData(postOptions({ uid }).queryKey);
  if (!post) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center gap-15 py-4">
        <p className="text-2xl font-bold">게시글 수정</p>
        <PostForm type="UPDATE" originalData={post} />
      </div>
    </HydrationBoundary>
  );
}
