import PostTOC from "@/components/post/PostTOC";
import PostComment from "@/components/post/PostComment";
import PostSettings from "@/components/admin/PostSettings";
import PostInformation from "@/components/post/PostInformation";
import MarkDownViewer from "@/components/post/MarkDownViewer";
import { categoryOptions } from "@/services/category/options";
import { getQueryClient } from "@/lib/getQueryClient";
import { Params } from "@/lib/serverInterface";
import { postOptions } from "@/services/post/options";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { checkIsKoty } from "@/lib/auth-server";
import { commentsOptions } from "@/services/comment/options";
import QueryWrapper from "@/lib/QueryWrapper";

export default async function PostPage({ params }: { params: Params }) {
  const { uid } = await params;
  if (!uid) notFound();
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(categoryOptions);
  void queryClient.prefetchQuery(commentsOptions({ uid }));
  await queryClient.fetchQuery(postOptions({ uid })).catch((error) => {
    if (error.status === 404) notFound();
  });

  const isKoty = await checkIsKoty();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="pt-4 lg:grid lg:grid-cols-12 lg:gap-x-8">
        <main className="lg:col-span-10">
          <div className="flex flex-col gap-12">
            <QueryWrapper loadingStyle="h-[calc(100vh-10rem)]" errorStyle="h-[calc(100vh-10rem)]">
              <PostInformation />
              <MarkDownViewer />
              {isKoty && <PostSettings />}
            </QueryWrapper>
            <QueryWrapper loadingStyle="h-50" errorStyle="h-50">
              <PostComment />
            </QueryWrapper>
          </div>
        </main>
        <aside className="hidden lg:col-span-2 lg:block">
          <QueryWrapper loadingStyle="h-30">
            <PostTOC />
          </QueryWrapper>
        </aside>
      </div>
    </HydrationBoundary>
  );
}
