import { josa } from "es-hangul";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { buttonVariants } from "../ui/button";

interface DeleteConfirmDialogProps {
  target: string;
  onDelete: () => void;
}

export default function DeleteConfirmDialog({ target, onDelete }: DeleteConfirmDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{`${josa(target, "을/를")} 삭제하시겠습니까?`}</AlertDialogTitle>
        <AlertDialogDescription>{`삭제된 ${josa(target, "은/는")} 복구할 수 없습니다.`}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>취소</AlertDialogCancel>
        <AlertDialogAction className={buttonVariants({ variant: "destructive" })} onClick={onDelete}>
          삭제
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
