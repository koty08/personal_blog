"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import commonFetch from "@/lib/commonFetch";

export default function PostAdminContents() {
  const router = useRouter();
  const pathname = usePathname();

  const onUpdate = () => {
    router.push(`${pathname}/update`);
  };

  const onDelete = async () => {
    const uuid = pathname.split("/").pop();
    const res = await commonFetch<{ success: boolean }>(`/post`, { uuid }, { method: "DELETE" });
    if (res && res.success) {
      router.push("/posts");
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button className="hover:cursor-pointer" onClick={onUpdate}>
        수정
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="hover:cursor-pointer">삭제</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>삭제된 글은 복구할 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
