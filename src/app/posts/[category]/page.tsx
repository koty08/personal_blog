import commonFetch from "@/lib/commonFetch";
import PostListView from "@/components/posts/PostListView";
import { notFound } from "next/navigation";
import { Category, Post } from "@prisma/client";

export interface PostDataResponse {
  count: number;
  posts: Post[];
}

export default async function Posts({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { category: rawCategory } = await params;
  const category = decodeURI(rawCategory);
  const { order, page } = await searchParams;
  const data = await commonFetch<PostDataResponse>("/posts", { order, page, category }, { cache: "no-store" });
  const categorys = await commonFetch<Category[]>("/category", undefined, { cache: "no-store" });
  if (!data || !categorys || !categorys.map((c) => c.name).includes(category)) notFound();

  return (
    <div>
      <h1 className="flex text-2xl mb-5 justify-center">{category}</h1>
      <PostListView data={data} categorys={categorys} />
    </div>
  );
}
