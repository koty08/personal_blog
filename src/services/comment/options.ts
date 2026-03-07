import { axiosInstance } from "@/lib/axiosInstance";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { CommentCreatePayload, CommentUpdatePayload, CommentDeletePayload, CommentWithUser } from "./interface";
import { PostPayload } from "../post/interface";

export const commentsOptions = (payload: PostPayload) =>
  queryOptions({
    queryKey: ["comments", payload],
    queryFn: () => axiosInstance.get<PostPayload, CommentWithUser[]>("/comments", { params: payload }),
  });

export const commentCreateOptions = mutationOptions({
  mutationKey: ["comment", "create"],
  mutationFn: (payload: CommentCreatePayload) => axiosInstance.post<CommentCreatePayload, Comment>("/comment", payload),
});

export const commentUpdateOptions = mutationOptions({
  mutationKey: ["comment", "update"],
  mutationFn: (payload: CommentUpdatePayload) => axiosInstance.put<CommentUpdatePayload, Comment>("/comment", payload),
});

export const commentDeleteOptions = mutationOptions({
  mutationKey: ["comment", "delete"],
  mutationFn: (payload: CommentDeletePayload) => axiosInstance.delete("/comment", { params: payload }),
});
