"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const postOrderList = [
  { value: "latest", label: "최신순" },
  { value: "views", label: "조회순" },
  { value: "oldest", label: "과거순" },
];

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
        {postOrderList.map((order) => (
          <SelectItem key={order.value} value={order.value} className="transition-all hover:bg-(--accent) hover:cursor-pointer">
            {order.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
