import { axiosInstance } from "@/lib/axiosInstance";
import { mutationOptions } from "@tanstack/react-query";
import { FileDeletePayload, FileUploadResult } from "./interface";

export const fileUploadOptions = mutationOptions({
  mutationKey: ["file", "upload"],
  mutationFn: (file: File) =>
    axiosInstance.post<File, FileUploadResult>("/file", file, { headers: { "Content-Type": "multipart/form-data" } }),
});

export const fileDeleteOptions = mutationOptions({
  mutationKey: ["file", "delete"],
  mutationFn: (payload: FileDeletePayload) => axiosInstance.delete<FileDeletePayload>("/file", { params: payload }),
});
