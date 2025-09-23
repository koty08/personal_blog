import { PostsWithCount } from "@/app/api/posts/inteface";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "../ui/card";
import PostImage from "../common/PostImage";
import { removeMDFromContent, getFirstImage } from "@/lib/markdownUtils";

export default async function PostCardView({ data }: { data: PostsWithCount }) {
  return (
    <div className="w-full flex flex-wrap gap-y-[20px] gap-x-[2%]">
      {data.posts.map((post) => {
        const path = getFirstImage(post.content);
        return (
          <Link key={post.uuid} href={`/post/${post.uuid}`}>
            <Card className="py-4 w-[350px] hover:cursor-pointer transition-all hover:border-gray-300 hover:bg-(--accent)">
              <PostImage path={path} alt={"thumbnail"} className="w-full h-[160px]" />
              <CardTitle className="mt-3 mb-2 px-4 truncate">{post.title}</CardTitle>
              <CardContent className="text-sm px-4">
                <p className="line-clamp-2">{removeMDFromContent(post.content)}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
