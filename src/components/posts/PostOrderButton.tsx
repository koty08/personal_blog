"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button, { LinkButton } from "../common/Button";

export default function PostOrderButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const order = searchParams.get("order");
  const isLatest = order !== "asc";

  const router = useRouter();

  const onButtonClicked = () => {
    const params = new URLSearchParams(searchParams);
    if (isLatest) {
      params.set("order", "asc");
    } else {
      params.delete("order");
    }
    router.push(`${pathname}?${params}`);
  };

  return (
    <div className="w-fit flex flex-col gap-3">
      <Button text={isLatest ? "최신 순" : "오래된 순"} className="h-fit" onClick={onButtonClicked}></Button>
      <LinkButton text="게시글 생성" href="/posts/create" />
      <LinkButton text="카테고리 수정" href="/categorys" />
    </div>
  );
}
