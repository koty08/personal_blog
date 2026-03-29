import { axiosInstance } from "@/lib/axiosInstance";
import { mutationOptions } from "@tanstack/react-query";
import { FileDTO } from "./interface";

export const fileUploadOptions = mutationOptions({
  mutationKey: ["file", "upload"],
  mutationFn: (file: File) => axiosInstance.post<File, FileDTO>("/file", file, { headers: { "Content-Type": "multipart/form-data" } }),
});

export const fileDeleteOptions = mutationOptions({
  mutationKey: ["file", "delete"],
  mutationFn: (payload: FileDTO) => axiosInstance.delete<FileDTO>("/file", { params: { url: payload.url } }),
});
