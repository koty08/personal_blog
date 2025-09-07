import commonFetch from "@/lib/commonFetch";
import DeleteButton from "@/components/post/DeleteButton";
import MarkDownViewer from "@/components/post/MarkDownViewer";
import PostComment from "@/components/post/PostComment";
import PostIndex from "@/components/post/PostIndex";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Post } from "@prisma/client";

export default async function PostPage({ params }: { params: { uuid: string } }) {
  const { uuid } = await params;
  const data = await commonFetch<Post>("/post", { uuid }, { cache: "no-store" });
  // not found handling
  if (!data) return notFound();

  return (
    <div className="mt-[64px] flex justify-center gap-5 relative">
      <div className="w-1/2 flex flex-col gap-5">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <div className="flex gap-2 items-end">
          <span className="h-fit text-sm text-slate-400">{data.register_date}</span>
        </div>
        <div>{`${data.views} Views`}</div>
        <div className="mt-[30px]">
          <MarkDownViewer content={data.content} />
        </div>
        <div className="flex gap-2 justify-end">
          <Link
            href={`/post/${uuid}/update`}
            className="w-fit px-2 border cursor-pointer p-1 hover:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500"
          >
            수정
          </Link>
          <DeleteButton id={uuid} />
        </div>
        <PostComment />
      </div>
      <PostIndex />
    </div>
  );
}
