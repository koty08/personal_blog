import PostCardView from "@/components/posts/PostCardView";
import commonFetch from "../lib/commonFetch";
import { notFound } from "next/navigation";
import { PostDataResponse } from "./posts/[category]/page";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const data = await commonFetch<PostDataResponse>("/posts", undefined, { cache: "no-store" });
  if (!data) notFound();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center space-x-4 text-sm">
        <Button variant="ghost" className="mr-0">
          최신순
        </Button>
        <Button variant="ghost" className="mr-0">
          인기순
        </Button>
        <Button variant="ghost" className="mr-0">
          최신 수정순
        </Button>
      </div>
      <PostCardView data={data} />
    </div>
  );
}
