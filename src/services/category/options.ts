import { axiosInstance } from "@/lib/axiosInstance";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { CategoryCreatePayload, CategoryDeletePayload, CategoryWithPostCount } from "./interface";
import { Category } from "@my-prisma/client";

export const categoryOptions = queryOptions({
  queryKey: ["category"],
  queryFn: () => axiosInstance.get<undefined, CategoryWithPostCount[]>("/category"),
});

export const categoryCreateOptions = mutationOptions({
  mutationKey: ["category", "create"],
  mutationFn: (payload: CategoryCreatePayload) => axiosInstance.post<CategoryCreatePayload, Category>("/category", payload),
});

export const categoryUpdateOptions = mutationOptions({
  mutationKey: ["category", "update"],
  mutationFn: (payload: Category) => axiosInstance.put<Category, Category>("/category", payload),
});

export const categoryDeleteOptions = mutationOptions({
  mutationKey: ["category", "delete"],
  mutationFn: (payload: CategoryDeletePayload) =>
    axiosInstance.delete<CategoryDeletePayload, undefined>("/category", {
      data: payload,
    }),
});
