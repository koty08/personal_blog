"use client";

import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import LabelWrapper from "../common/LabelWrapper";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PostCreateAndFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCheckedChange = (value: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("temp", "true");
    else params.delete("temp");
    router.replace(`${pathname}?${params}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="has-[>svg]:px-2.5">
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-2 px-4 py-3" align="end">
        <Link href="/post/create" className="font-semibold hover:underline">
          게시글 생성
        </Link>
        <Separator />
        <LabelWrapper label="임시글 보기" orientation="horizontal">
          <Checkbox
            checked={searchParams.get("temp") === "true"}
            className="mt-0.5 size-4 cursor-pointer"
            onCheckedChange={handleCheckedChange}
          />
        </LabelWrapper>
      </PopoverContent>
    </Popover>
  );
}
