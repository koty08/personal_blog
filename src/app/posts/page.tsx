import PostListView from "@/components/posts/PostListView";
import commonFetch from "../../lib/commonFetch";
import { PostDataResponse } from "./[category]/page";
import { notFound } from "next/navigation";
import { Category } from "@prisma/client";

export default async function Posts({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { order, page } = await searchParams;
  const data = await commonFetch<PostDataResponse>("/posts", { order, page }, { cache: "no-store" });
  const categorys = await commonFetch<Category[]>("/category", undefined, { cache: "no-store" });
  if (!data) notFound();

  return (
    <div>
      <h1 className="flex text-2xl mb-5 justify-center">게시글 목록</h1>
      <PostListView data={data} categorys={categorys} />
    </div>
  );
}
