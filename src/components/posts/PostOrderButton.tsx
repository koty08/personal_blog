"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function PostOrderButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSelectChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("order", value);
    router.push(`${pathname}?${params}`);
  };

  return (
    <Select onValueChange={onSelectChange} defaultValue="latest">
      <SelectTrigger className="w-[120px] transition-all hover:bg-(--accent) hover:cursor-pointer">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">최신순</SelectItem>
        <SelectItem value="views">조회순</SelectItem>
        <SelectItem value="oldest">과거순</SelectItem>
      </SelectContent>
    </Select>
  );
}
