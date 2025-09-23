import commonFetch from "@/lib/commonFetch";
import MarkDownViewer from "@/components/post/MarkDownViewer";
import PostTOC from "@/components/post/PostTOC";
import { notFound } from "next/navigation";
import { Post } from "@prisma/client";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";
import { CategoryWithPostCount } from "@/app/api/category/interface";
import { Badge } from "@/components/ui/badge";
import PostComment from "@/components/post/PostComment";
import PostAdminContents from "@/components/post/PostAdminContents";

export default async function PostPage({ params }: { params: { uuid: string } }) {
  const { uuid } = await params;
  const data = await commonFetch<Post>("/post", { uuid }, { cache: "no-store" });
  const categorys = await commonFetch<CategoryWithPostCount[]>("/category", undefined, { cache: "no-store" });
  if (!data) return notFound();

  return (
    <div className="mt-[64px] flex justify-center gap-5 relative">
      <div className="w-2/3 flex flex-col gap-9">
        <div className="flex flex-col gap-6">
          <h1 id="title" className="text-4xl font-bold">
            {data.title}
          </h1>
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center text-(--primary)">
              <Badge variant={"default"}>{categorys?.find((c) => c.id === data.categoryId)?.name ?? "카테고리"}</Badge>
              <p>{`조회수: ${data.views}`}</p>
              <p>{`읽는 시간: ${data.readTime}분`}</p>
            </div>
            <div className="flex gap-2 items-center text-sm text-slate-400">
              <p>{dayjs(data.register_date).format("YYYY년 MM월 DD일")}</p>
              {dayjs(data.register_date).diff(data.updated_date, "day") > 1 && (
                <>
                  <Separator orientation="vertical" />
                  <p>{`최근 수정: ${dayjs(data.updated_date).format("YYYY년 MM월 DD일")}`}</p>
                </>
              )}
            </div>
          </div>
          <Separator />
        </div>
        <div className="mt-[30px]">
          <MarkDownViewer content={data.content} />
        </div>
        <PostAdminContents />
        <PostComment />
      </div>
      <PostTOC />
    </div>
  );
}
