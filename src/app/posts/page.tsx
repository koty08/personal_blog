import commonFetch from "../../lib/commonFetch";
import { notFound } from "next/navigation";
import { CategoryWithPostCount } from "../api/category/interface";
import PostCategoryLinks from "@/components/posts/PostCategoryLinks";
import PostOrderButton from "@/components/posts/PostOrderButton";
import { PostsWithCount } from "../api/posts/inteface";
import Link from "next/link";
import dayjs from "dayjs";
import PostImage from "@/components/common/PostImage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { filterMarkdownImages, getFirstImage } from "@/lib/markdownUtils";
import CustomPagination from "@/components/common/CustomPagination";
import { Separator } from "@/components/ui/separator";

const POST_PER_PAGE = 8;

export default async function Posts({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { order, page, category: rawCategory } = await searchParams;
  const category = rawCategory ? decodeURI(rawCategory) : undefined;
  const data = await commonFetch<PostsWithCount>("/posts", { order, page, category }, { cache: "no-store" });
  const categorys = await commonFetch<CategoryWithPostCount[]>("/category", undefined, { cache: "no-store" });
  if (!data || (category && categorys && !categorys.map((e) => e.name).includes(category))) notFound();

  return (
    <div className="flex flex-col gap-8 py-5">
      <div className="flex items-center gap-3 justify-between">
        <PostCategoryLinks categorys={categorys} />
        <PostOrderButton />
      </div>
      <div className="flex flex-col gap-4">
        {data.posts.map((post) => {
          const path = getFirstImage(post.content);
          return (
            <Link key={post.uuid} href={`/post/${post.uuid}`}>
              <Card className="flex flex-row gap-5 flex-wrap p-4 justify-center transition-all hover:bg-(--accent) hover:border-gray-300">
                <PostImage path={path} alt={"thumbnail"} className="w-[260px] h-[160px]" />
                <div className="flex flex-col flex-1 gap-4 min-w-xs">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-2 items-center">
                      <Badge variant={"default"}>{categorys?.find((c) => c.id === post.categoryId)?.name ?? "카테고리"}</Badge>
                      <div className="flex-1 text-xl font-semibold tracking-tight truncate">{post.title}</div>
                    </div>
                    <div className="flex gap-3 text-sm text-(--muted-foreground) items-center">
                      <div>{`조회수: ${post.views}`}</div>
                      <Separator orientation="vertical" />
                      <div>{`읽는 시간: ${post.readTime}분`}</div>
                      <Separator orientation="vertical" />
                      <div>{dayjs(post.register_date).format("YYYY-MM-DD")}</div>
                    </div>
                  </div>
                  <p className="leading-7 line-clamp-3">{filterMarkdownImages(post.content)}</p>
                </div>
              </Card>
            </Link>
          );
        })}
        <CustomPagination totalCount={data.count} itemPerPage={POST_PER_PAGE} />
      </div>
    </div>
  );
}
