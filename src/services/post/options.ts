import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { PostCreatePayload, PostPayload } from "./interface";
import { axiosInstance } from "@/lib/axiosInstance";
import { Post } from "@my-prisma/client";

export const postOptions = (payload: PostPayload) =>
  queryOptions({
    queryKey: ["post", payload],
    queryFn: () =>
      axiosInstance.get<PostPayload, Post>("/post", { params: payload }),
  });

export const postCreateOptions = mutationOptions({
  mutationKey: ["post", "create"],
  mutationFn: (payload: PostCreatePayload) =>
    axiosInstance.post<PostCreatePayload, undefined>("/post", payload),
});

export const postUpdateOptions = mutationOptions({
  mutationKey: ["post", "update"],
  mutationFn: (payload: PostCreatePayload) =>
    axiosInstance.put<PostCreatePayload, undefined>("/post", payload),
});

export const postDeleteOptions = mutationOptions({
  mutationKey: ["post", "delete"],
  mutationFn: (payload: PostPayload) =>
    axiosInstance.delete<PostPayload, undefined>("/post", { params: payload }),
});
