import commonFetch from "@/lib/commonFetch";
import PostForm from "@/components/post/PostForm";
import { notFound } from "next/navigation";
import { Category, Post } from "@prisma/client";

export default async function UpdatePost({ params }: { params: { uuid: string } }) {
  const { uuid } = await params;
  const post = await commonFetch<Post>("/post", { uuid }, { cache: "no-store" });
  const categorys = await commonFetch<Category[]>(`/category`, undefined, { cache: "no-store" });
  if (!post || !categorys) return notFound();

  return (
    <div className="flex flex-col gap-15 items-center">
      <p className="text-2xl font-bold">게시글 수정</p>
      <PostForm type="UPDATE" originalData={post} post_id={uuid} categorys={categorys} />
    </div>
  );
}
