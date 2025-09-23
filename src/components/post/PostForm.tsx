"use client";

import { useRouter } from "next/navigation";
import useForm from "@/hooks/useForm";
import commonFetch from "@/lib/commonFetch";
import { CustomPreviewImage } from "./MarkDownViewer";
import { Category, Post } from "@prisma/client";
import MDEditor from "@uiw/react-md-editor";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import LabelWrapper from "../ui/LabelWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

interface PostPayload {
  title: string;
  uuid: string;
  content: string;
  categoryId: number;
  readTime: number;
}

interface PostFormProps {
  type: "CREATE" | "UPDATE";
  post_id?: string;
  originalData?: Post;
  categorys: Category[];
}

export default function PostForm({ type, originalData, categorys }: PostFormProps) {
  const router = useRouter();
  const { values, errors, isLoading, handleChange, handleChangeWithVal, handleSubmit, mdEditorChange } = useForm<PostPayload>({
    initialVal: originalData
      ? originalData
      : {
          title: "",
          uuid: "",
          content: "",
          categoryId: 1,
          readTime: 5,
        },
    onSubmit: async (values) => {
      const res = await commonFetch<{ success: boolean }>("/post", undefined, {
        method: type === "CREATE" ? "POST" : "PUT",
        body: JSON.stringify(values),
      });
      if (res && res.success) {
        router.push("/posts");
        router.refresh();
      }
    },
    validator: PostValidator,
  });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", resolvedTheme === "dark" ? "dark" : "light");
  }, [resolvedTheme]);

  const onPasted = async (event: React.ClipboardEvent) => {
    const file = event.clipboardData.files.item(0);
    if (file) {
      const res = await commonFetch<{ success: boolean; filename: string }>("/file", undefined, {
        method: "POST",
        body: file,
      });
      if (res && res.success) {
        mdEditorChange(values.content + `![](/${res.filename})`);
      }
    }
  };

  const onImageDeleted = async (src: string | undefined) => {
    const res = await commonFetch<{ success: boolean }>(
      "/file",
      { path: src },
      {
        method: "DELETE",
      }
    );
    if (res && res.success) {
      mdEditorChange(values.content.replace(`![](${src})`, ""));
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4">
        <LabelWrapper label="제목" orientation="vertical">
          <Input name="title" type="text" placeholder="제목을 입력해주세요." value={values.title} onChange={handleChange} />
        </LabelWrapper>
        <LabelWrapper label="UUID" orientation="vertical">
          <Input
            name="uuid"
            type="text"
            placeholder="경로로 사용할 UUID를 입력해주세요. (영어, -로만 구성)"
            value={values.uuid}
            onChange={handleChange}
          />
        </LabelWrapper>
        <LabelWrapper label="내용" orientation="vertical">
          <MDEditor
            value={values.content}
            className="w-full rounded resize-none"
            height={700}
            textareaProps={{
              placeholder: "내용을 입력해주세요.",
            }}
            onChange={(val) => mdEditorChange(val)}
            onPaste={onPasted}
            previewOptions={{
              components: {
                img: (props) =>
                  CustomPreviewImage({
                    ...props,
                    onClick: () => {
                      if (typeof props.src === "string") onImageDeleted(props.src);
                    },
                  }),
              },
            }}
          />
          <p className="text-red-600 font-bold text-sm">{errors?.content}</p>
        </LabelWrapper>
        <div className="flex flex-wrap gap-4 items-center">
          <LabelWrapper label="카테고리" orientation="horizontal">
            <Select onValueChange={(value) => handleChangeWithVal({ name: "categoryId", value })}>
              <SelectTrigger className="transition-all hover:bg-(--accent) hover:cursor-pointer">
                <SelectValue placeholder={"카테고리 선택"} />
              </SelectTrigger>
              <SelectContent>
                {categorys.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()} className="transition-all hover:bg-(--accent) hover:cursor-pointer">
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </LabelWrapper>
          <LabelWrapper label="읽는 시간" orientation="horizontal">
            <Input name="readTime" type="number" className="w-[60px]" value={values.readTime} onChange={handleChange} />
          </LabelWrapper>
          <LabelWrapper label="임시글" orientation="horizontal">
            <Checkbox id="published" className="size-5 cursor-pointer" />
          </LabelWrapper>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button onClick={handleSubmit} className="hover:cursor-pointer" disabled={isLoading}>
          {type === "CREATE" ? "생성" : "수정"}
        </Button>
        <Button onClick={() => router.back()} variant="secondary" className="hover:cursor-pointer">
          취소
        </Button>
      </CardFooter>
    </Card>
  );
}

function PostValidator({ title, content }: PostPayload) {
  const errors: Record<keyof PostPayload, string> = {
    title: "",
    uuid: "",
    content: "",
    categoryId: "",
    readTime: "",
  };

  if (!title) {
    errors.title = "제목을 입력해주세요!";
  }

  if (!content) {
    errors.content = "내용을 입력해주세요!";
  }

  return errors;
}
