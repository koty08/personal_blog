import { Post } from "@my-prisma/client";

export interface PostPayload {
  uid: string;
}

export type PostCreatePayload = Omit<Post, "id" | "register_date" | "updated_date" | "views">;

export type PostUpdatePayload = PostCreatePayload & "updated_date";

export type PostsOrderType = "latest" | "views" | "oldest" | "updated";

export interface PostsPayload {
  order?: PostsOrderType;
  category?: string;
  page?: number;
  limit?: number;
  temp?: boolean;
}

export type PostsWithCommentCount = Post & { commentCount: number };

export interface PostsWithCount {
  posts: PostsWithCommentCount[];
  count: number;
}
