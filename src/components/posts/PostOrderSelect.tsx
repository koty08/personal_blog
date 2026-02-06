"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { omit } from "es-toolkit";
import { labelByOrder } from "@/consts/posts";

const postOrderList = [
  { value: "latest", label: "최신순" },
  { value: "views", label: "인기순" },
  { value: "oldest", label: "과거순" },
];

export default function PostOrderSelect() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSelectChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("order", value);
    router.push(`${pathname}?${params}`);
  };

  const currentOrder = searchParams.get("order") || "latest";

  return (
    <Select onValueChange={onSelectChange} defaultValue={currentOrder}>
      <SelectTrigger className="border-border/50 bg-background/50 hover:bg-accent w-32.5 rounded-sm backdrop-blur-sm transition-all hover:cursor-pointer">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(omit(labelByOrder, ["updated"])).map(([key, label]) => (
          <SelectItem key={key} value={key} className="cursor-pointer">
            {`${label}순`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
