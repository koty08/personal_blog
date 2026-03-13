import { HeadingLevel } from "@/components/post/PostTOC";
import { PostCreatePayload } from "@/services/post/interface";

export const postDefaultValue = {
  uid: "",
  title: "",
  content: "",
  categoryId: 0,
  readTime: 5,
  published: true,
};

export const postFieldLabel: Record<keyof PostCreatePayload, string> = {
  uid: "UID",
  title: "제목",
  content: "내용",
  categoryId: "카테고리",
  readTime: "읽는 시간",
  published: "게시 여부",
};

export const labelByOrder: Record<string, string> = {
  latest: "최신",
  popularity: "인기",
  updated: "최신 수정",
  oldest: "과거",
};

export const imagePath = {
  server: "./public/images/post",
  client: "/images/post",
};

export const marginByHLevel: Record<HeadingLevel, string> = {
  h1: "ml-2.5",
  h2: "ml-5",
  h3: "ml-7.5",
};
