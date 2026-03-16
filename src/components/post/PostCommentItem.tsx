"use client";

import { useState } from "react";
import { CommentWithUser } from "@/services/comment/interface";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { commentDeleteOptions, commentsOptions, commentUpdateOptions } from "@/services/comment/options";
import { useParams } from "next/navigation";
import { useRelativeTime } from "@/hooks/useRelativeTime";
import dayjs from "dayjs";
import { useTypedMutation } from "@/hooks/useTypedMutation";
import DeleteConfirmDialog from "../common/DeleteConfirmDialog";

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

  const updateComment = useTypedMutation(commentUpdateOptions);
  const deleteComment = useTypedMutation(commentDeleteOptions);

  const handleUpdate = () => {
    if (!editContent.trim()) return toast.warning("댓글을 입력해주세요.");

    updateComment.mutate(
      { id: comment.id, content: editContent },
      {
        onSuccess: async () => {
          setIsEditing(false);
          await queryClient.invalidateQueries({ queryKey: commentsOptions({ uid }).queryKey });
          toast.success("댓글이 수정되었습니다.");
        },
        onError: (error) => {
          toast.error(error.response?.data.message ?? "댓글 수정 중 오류가 발생했습니다.");
        },
      }
    );
  };

  const handleDelete = () => {
    deleteComment.mutate(
      { id: comment.id },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: commentsOptions({ uid }).queryKey });
          toast.success("댓글이 삭제되었습니다.");
        },
        onError: (error) => {
          toast.error(error.response?.data.message ?? "댓글 삭제 중 오류가 발생했습니다.");
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
        <div className="flex gap-2">
          {userId === comment.userId && !isEditing && (
            <>
              <Button size="sm" onClick={() => setIsEditing(true)}>
                수정
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    삭제
                  </Button>
                </AlertDialogTrigger>
                <DeleteConfirmDialog target="댓글" onDelete={handleDelete} />
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
            <Button onClick={handleUpdate} disabled={updateComment.isPending}>
              저장
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-foreground pb-1 whitespace-pre-wrap">{comment.content}</p>
      )}
    </div>
  );
}
