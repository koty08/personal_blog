"use client";

import { useRouter } from "next/navigation";
import Button from "../common/Button";
import commonFetch from "@/lib/commonFetch";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const onDeleteClicked = async () => {
    const res = await commonFetch<{ success: boolean }>(`/post`, { id: id }, { method: "DELETE" });
    if (res && res.success) {
      router.push("/posts");
      router.refresh();
    }
  };

  return <Button text="삭제" className="w-fit px-2" onClick={onDeleteClicked} />;
}
