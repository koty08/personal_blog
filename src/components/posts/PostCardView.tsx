import getImageFromContents from "@/lib/getImageFromContent";
import { PostDataResponse } from "@/app/posts/[category]/page";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "../ui/card";

export default async function PostCardView({ data }: { data: PostDataResponse }) {
  return (
    <div className="w-full flex flex-wrap gap-y-[20px] gap-x-[2%]">
      {data.posts.map((post) => {
        const path = getImageFromContents(post.content);
        return (
          <Card key={post.uuid} className="py-4 w-[350px] hover:cursor-pointer hover:border-gray-500 transition-colors">
            <Link href={`/post/${post.uuid}`}>
              <div className="flex justify-center relative w-full h-[160px]">
                {path ? (
                  <Image fill src={path} alt="image" style={{ objectFit: "contain" }}></Image>
                ) : (
                  <Image fill src={"/no-image.png"} alt="image" style={{ objectFit: "contain" }}></Image>
                )}
              </div>
              <CardTitle className="mt-3 mb-2 px-4 truncate">{post.title}</CardTitle>
              <CardContent className="text-sm px-4">
                <p className="line-clamp-2">{post.content}</p>
              </CardContent>
            </Link>
          </Card>
        );
      })}
    </div>
  );
}
