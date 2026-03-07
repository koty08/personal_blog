"use client";

import { useState } from "react";
import { CommentWithUser } from "@/services/comment/interface";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentDeleteOptions, commentsOptions, commentUpdateOptions } from "@/services/comment/options";
import { useParams } from "next/navigation";
import { useRelativeTime } from "@/hooks/useRelativeTime";
import dayjs from "dayjs";

interface PostCommentItemProps {
  comment: CommentWithUser;
  userId?: string;
  parentId?: number;
}

export default function PostCommentItem({ comment, userId, parentId }: PostCommentItemProps) {
  const { uid } = useParams<{ uid: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const queryClient = useQueryClient();
  const relativeTime = useRelativeTime(dayjs(comment.createdAt));
  const isReply = !!parentId;

  const { mutate: updateComment, isPending: isUpdating } = useMutation(commentUpdateOptions);
  const { mutate: deleteComment } = useMutation(commentDeleteOptions);

  const handleUpdate = () => {
    if (!userId) return;
    else if (!editContent.trim()) return toast.warning("댓글을 입력해주세요.");

    updateComment(
      { id: comment.id, content: editContent },
      {
        onSuccess: () => {
          setIsEditing(false);
          queryClient.invalidateQueries({ queryKey: commentsOptions({ uid }).queryKey });
          toast.success("댓글이 수정되었습니다.");
        },
        onError: () => {
          toast.error("댓글 수정에 실패했습니다.");
        },
      }
    );
  };

  const handleDelete = () => {
    deleteComment(
      { id: comment.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: commentsOptions({ uid }).queryKey });
          toast.success("댓글이 삭제되었습니다.");
        },
        onError: () => {
          toast.error("댓글 삭제에 실패했습니다.");
        },
      }
    );
  };

  return (
    <div className={`flex flex-col gap-2 ${isReply && "pb-2 not-last:border-b"}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{comment.user?.name ?? "알 수 없음"}</span>
          <span className="text-muted-foreground text-sm">{relativeTime}</span>
        </div>
        <div className="flex gap-1">
          {userId === comment.userId && !isEditing && (
            <>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                수정
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                    삭제
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                    <AlertDialogDescription>삭제된 댓글은 복구할 수 없습니다.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              취소
            </Button>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? "저장 중..." : "저장"}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-foreground pb-1 whitespace-pre-wrap">{comment.content}</p>
      )}
    </div>
  );
}
