import { User, Comment } from "@my-prisma/client";

export type CommentWithUser = Comment & {
  user: User;
};

export interface CommentCreatePayload {
  postUid: string;
  content: string;
  parentId?: number;
}

export interface CommentUpdatePayload {
  id: number;
  content: string;
}

export interface CommentDeletePayload {
  id: number;
}
