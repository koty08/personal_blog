"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { commentCreateOptions, commentsOptions } from "@/services/comment/options";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoginButton } from "../common/AuthButtons";
import PostCommentItem from "./PostCommentItem";
import { CornerDownRight } from "lucide-react";
import { useTypedMutation } from "@/hooks/useTypedMutation";

export default function PostComment() {
  const { data: session } = authClient.useSession();
  const { uid } = useParams<{ uid: string }>();
  const [newComment, setNewComment] = useState("");
  const [replyId, setReplyId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [expandedReplyIds, setExpandedReplyIds] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const { data: comments } = useSuspenseQuery(commentsOptions({ uid }));
  const createComment = useTypedMutation(commentCreateOptions);

  const handleCreate = () => {
    if (!session?.user) return;
    else if (!newComment.trim()) return toast.warning("댓글을 입력해주세요.");

    createComment.mutate(
      { postUid: uid, content: newComment },
      {
        onSuccess: async () => {
          setNewComment("");
          await queryClient.invalidateQueries({ queryKey: commentsOptions({ uid }).queryKey });
          toast.success("댓글이 작성되었습니다.");
        },
        onError: (error) => {
          toast.error(error.response?.data.message ?? "댓글 작성 중 오류가 발생했습니다.");
        },
      }
    );
  };

  const handleReply = () => {
    if (!session?.user || !replyId) return;
    else if (!replyContent.trim()) return toast.warning("답글을 입력해주세요.");

    createComment.mutate(
      { postUid: uid, content: replyContent, parentId: replyId },
      {
        onSuccess: async () => {
          setReplyId(null);
          setReplyContent("");
          await queryClient.invalidateQueries({ queryKey: ["comments", { uid }] });
          toast.success("답글이 작성되었습니다.");
        },
        onError: (error) => {
          toast.error(error.response?.data.message ?? "답글 작성 중 오류가 발생했습니다.");
        },
      }
    );
  };

  const toggleReplies = (commentId: number) => {
    setExpandedReplyIds((prev) => (prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId]));
  };

  return (
    <div className="flex flex-col gap-6 pt-6">
      <Separator />
      <p className="text-xl font-bold">댓글 ({comments.length})</p>
      {session?.user ? (
        <div className="flex flex-col gap-4">
          <Textarea
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={createComment.isPending}
          />
          <div className="text-right">
            <Button type="submit" onClick={handleCreate} disabled={createComment.isPending}>
              등록
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-muted text-muted-foreground flex flex-col gap-4 rounded-lg border p-4 text-center">
          <p>댓글을 작성하려면 로그인이 필요합니다.</p>
          <LoginButton />
        </div>
      )}
      <div className="flex flex-col gap-6">
        {comments
          .filter((c) => !c.parentId)
          .map((comment) => {
            const replies = comments.filter((c) => c.parentId === comment.id);
            const isVisible = expandedReplyIds.includes(comment.id);
            const areRepliesVisible = isVisible && replies.length > 0;
            const isReplying = replyId === comment.id;

            return (
              <div key={comment.id} className="mt-6 flex flex-col gap-2">
                <PostCommentItem comment={comment} userId={session?.user.id} />
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    if (!replies.length) setReplyId((prev) => (!prev ? comment.id : null));
                    toggleReplies(comment.id);
                  }}
                  className="text-muted-foreground h-auto w-fit p-0 text-sm"
                >
                  {isVisible ? "숨기기" : replies.length ? `답글 ${replies.length}개 보기` : `답글 달기`}
                </Button>
                {areRepliesVisible && (
                  <div className="bg-card/40 relative mt-2 ml-8 flex flex-col gap-3 rounded-sm px-4 py-3 shadow-lg">
                    <CornerDownRight className="absolute top-1 -left-7" />
                    {replies.map((reply) => (
                      <PostCommentItem key={reply.id} comment={reply} userId={session?.user.id} parentId={comment.id} />
                    ))}
                    {isReplying ? (
                      <div className="ml-4 flex flex-col gap-2">
                        <Textarea
                          placeholder="답글을 입력하세요..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" onClick={() => setReplyId(null)}>
                            취소
                          </Button>
                          <Button onClick={handleReply} disabled={createComment.isPending}>
                            등록
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button variant="outline" onClick={() => setReplyId(comment.id)}>
                        {"답글 작성"}
                      </Button>
                    )}
                  </div>
                )}
                {!areRepliesVisible && isReplying && (
                  <div className="ml-4 flex flex-col gap-2">
                    <Textarea placeholder="답글을 입력하세요..." value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => setReplyId(null)}>
                        취소
                      </Button>
                      <Button onClick={handleReply} disabled={createComment.isPending}>
                        등록
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
