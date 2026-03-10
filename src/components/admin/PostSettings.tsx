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
import { postDeleteOptions } from "@/services/post/options";
import { toast } from "sonner";
import { useTypedMutation } from "@/hooks/useTypedMutation";

export default function PostSettings() {
  const router = useRouter();
  const pathname = usePathname();
  const postDelete = useTypedMutation(postDeleteOptions);

  const onUpdate = () => {
    router.push(`${pathname}/update`);
  };

  const onDelete = async () => {
    const uid = pathname.split("/").pop();
    if (uid)
      postDelete.mutate(
        { uid },
        {
          onSuccess: () => {
            toast.success("게시글이 삭제되었습니다.");
            router.push("/posts");
          },
          onError: (error) => {
            toast.error(error.response?.data.message ?? "게시글 삭제 중 오류가 발생했습니다.");
          },
        }
      );
  };

  return (
    <div className="flex justify-end gap-2">
      <Button className="hover:cursor-pointer" onClick={onUpdate}>
        수정
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="hover:cursor-pointer">
            삭제
          </Button>
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
