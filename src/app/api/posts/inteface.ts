import { Post } from "@prisma/client";

export interface PostsWithCount {
  posts: Post[];
  count: number;
}
