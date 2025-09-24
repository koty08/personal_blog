import { queryOptions } from "@tanstack/react-query";
import { PostsPayload, PostsWithCount } from "./interface";
import { axiosInstance } from "@/lib/axiosInstance";

export const postsOptions = (payload: PostsPayload = {}) =>
  queryOptions({
    queryKey: ["posts", payload],
    queryFn: () => axiosInstance.get<PostsPayload, PostsWithCount>("/posts", { params: payload }),
  });
