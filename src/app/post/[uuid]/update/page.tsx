import PostForm from "@/components/post/PostForm";
import { notFound } from "next/navigation";
import { getQueryClient } from "@/lib/getQueryClient";
import { categoryOptions } from "@/services/category/options";
import { postOptions } from "@/services/post/options";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Params } from "@/lib/serverInterface";

export default async function UpdatePost({ params }: { params: Params }) {
  const { uuid } = await params;
  if (!uuid) notFound();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(postOptions({ uuid }));
  await queryClient.prefetchQuery(categoryOptions);

  const post = queryClient.getQueryData(postOptions({ uuid }).queryKey);
  if (!post) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-15 items-center">
        <p className="text-2xl font-bold">게시글 수정</p>
        <PostForm type="UPDATE" originalData={post} />
      </div>
    </HydrationBoundary>
  );
}
