import PostTOC from "@/components/post/PostTOC";
import PostComment from "@/components/post/PostComment";
import PostAdminContents from "@/components/admin/PostAdminContents";
import PostInformation from "@/components/post/PostInformation";
import MarkDownViewer from "@/components/post/MarkDownViewer";
import { categoryOptions } from "@/services/category/options";
import { getQueryClient } from "@/lib/getQueryClient";
import { Params } from "@/lib/serverInterface";
import { postOptions } from "@/services/post/options";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { checkIsKoty } from "@/lib/auth-server";

export default async function PostPage({ params }: { params: Params }) {
  const { uid } = await params;
  if (!uid) notFound();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(postOptions({ uid }));
  await queryClient.prefetchQuery(categoryOptions);

  const data = queryClient.getQueryData(postOptions({ uid }).queryKey);
  if (!data) notFound();

  const isKoty = await checkIsKoty();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto mt-16 px-4">
        <div className="grid grid-cols-12 gap-x-8">
          <main className="col-span-12 lg:col-span-10">
            <div className="flex flex-col gap-12">
              <PostInformation />
              <MarkDownViewer />
              {isKoty && <PostAdminContents />}
              <PostComment />
            </div>
          </main>
          <aside className="hidden lg:col-span-2 lg:block">
            <div className="sticky top-24">
              <PostTOC />
            </div>
          </aside>
        </div>
      </div>
    </HydrationBoundary>
  );
}
