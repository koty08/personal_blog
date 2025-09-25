import { Post } from "@prisma/client";

export interface PostPayload {
  uuid: string;
}

export type PostCreatePayload = Omit<Post, "id" | "register_date" | "updated_date" | "views">;

export type PostUpdatePayload = PostCreatePayload & "updated_date";
