import { axiosInstance } from "@/lib/axiosInstance";
import { queryOptions } from "@tanstack/react-query";
import { CategoryWithPostCount } from "./interface";

export const categoryOptions = queryOptions({
  queryKey: ["category"],
  queryFn: () => axiosInstance.get<undefined, CategoryWithPostCount[]>("/category"),
});
