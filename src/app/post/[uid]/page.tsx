import PostTOC from "@/components/post/PostTOC";
import PostComment from "@/components/post/PostComment";
import PostAdminContents from "@/components/post/PostAdminContents";
import PostInformation from "@/components/post/PostInformation";
import MarkDownViewer from "@/components/post/MarkDownViewer";
import { categoryOptions } from "@/services/category/options";
import { getQueryClient } from "@/lib/getQueryClient";
import { Params } from "@/lib/serverInterface";
import { postOptions } from "@/services/post/options";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function PostPage({ params }: { params: Params }) {
  const { uid } = await params;
  if (!uid) notFound();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(postOptions({ uid }));
  await queryClient.prefetchQuery(categoryOptions);

  const data = queryClient.getQueryData(postOptions({ uid }).queryKey);
  if (!data) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mt-[64px] flex justify-center gap-5 relative">
        <div className="w-full flex flex-col gap-9 md:w-[768px]">
          <PostInformation />
          <div className="mt-[30px]">
            <MarkDownViewer />
          </div>
          <PostAdminContents />
          <PostComment />
        </div>
        <div className="hidden lg:block">
          <PostTOC />
        </div>
      </div>
    </HydrationBoundary>
  );
}
