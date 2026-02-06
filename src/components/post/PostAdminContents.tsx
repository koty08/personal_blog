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
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { postDeleteOptions } from "@/services/post/options";
import { toast } from "sonner";

export default function PostAdminContents() {
  const router = useRouter();
  const pathname = usePathname();
  const postDelete = useMutation(postDeleteOptions);

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
            router.push("/posts");
          },
          onError: () => {
            toast("게시글 삭제중 오류가 발생했습니다.", {
              position: "bottom-center",
            });
          },
        }
      );
  };

  return (
    <div className="flex flex-col gap-4">
      <Separator />
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
    </div>
  );
}
