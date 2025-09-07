import Link from "next/link";
import Pagination from "./Pagination";
import PostCategoryLinks from "./PostCategoryLinks";
import { PostDataResponse } from "@/app/posts/[category]/page";
import PostOrderButton from "./PostOrderButton";
import { Category } from "@prisma/client";

export default async function PostListView({ data, categorys }: { data: PostDataResponse; categorys: Category[] | null }) {
  return (
    <div className="flex gap-[50px] border-y py-10 justify-center">
      <PostCategoryLinks categorys={categorys} />
      <div className="flex flex-col gap-8 w-1/2">
        {data.posts.map((post) => (
          <Link href={`/post/${post.uuid}`} key={post.uuid} className="flex flex-col gap-2.5 hover:bg-gray-100 hover:cursor-pointer">
            <div className="flex justify-between border-b-2">
              <div>
                <span>{post.title}</span>
              </div>
              <span>{new Intl.DateTimeFormat("ko", { dateStyle: "short" }).format(new Date(post.register_date))}</span>
            </div>
            <div className="truncate">{post.content}</div>
          </Link>
        ))}
        <Pagination count={data.count} />
      </div>
      <PostOrderButton />
    </div>
  );
}
