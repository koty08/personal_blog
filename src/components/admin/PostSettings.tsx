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
import DeleteConfirmDialog from "../common/DeleteConfirmDialog";

export default function PostSettings() {
  const router = useRouter();
  const pathname = usePathname();
  const postDelete = useTypedMutation(postDeleteOptions);

  const handleUpdatePost = () => {
    router.push(`${pathname}/update`);
  };

  const handleDeletePost = async () => {
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
      <Button onClick={handleUpdatePost}>수정</Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">삭제</Button>
        </AlertDialogTrigger>
        <DeleteConfirmDialog target="게시글" onDelete={handleDeletePost} />
      </AlertDialog>
    </div>
  );
}
