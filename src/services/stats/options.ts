import { queryOptions } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { StatsData } from "./interface";

export const statsOptions = queryOptions({
  queryKey: ["stats"],
  queryFn: () => axiosInstance.get<undefined, StatsData>("/stats"),
});
