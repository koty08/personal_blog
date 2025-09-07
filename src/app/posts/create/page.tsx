import commonFetch from "@/lib/commonFetch";
import PostForm from "@/components/post/PostForm";
import { notFound } from "next/navigation";
import { Category } from "@prisma/client";

export default async function CreatePost() {
  const categorys = await commonFetch<Category[]>("/category", undefined, { cache: "no-store" });
  if (!categorys) notFound();

  return (
    <div className="flex flex-col gap-20 items-center">
      <p className="text-xl font-bold">게시글 생성</p>
      <PostForm type="CREATE" categorys={categorys} />
    </div>
  );
}
