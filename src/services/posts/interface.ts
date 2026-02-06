import { Post } from "@my-prisma/client";

export type PostsOrderType = "latest" | "views" | "oldest" | "updated";

export interface PostsPayload {
  order?: PostsOrderType;
  category?: string;
  page?: number;
  limit?: number;
}

export interface PostsWithCount {
  posts: Post[];
  count: number;
}
