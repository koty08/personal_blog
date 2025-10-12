"use client";

import { useRouter } from "next/navigation";
import useForm from "@/hooks/useForm";
import { CustomPreviewImage } from "./MarkDownViewer";
import { Post } from "@prisma/client";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import LabelWrapper from "../ui/LabelWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryOptions } from "@/services/category/options";
import { PostCreatePayload } from "@/services/post/interface";
import { josa } from "es-hangul";
import { postCreateOptions, postUpdateOptions } from "@/services/post/options";
import dynamic from "next/dynamic";
import { fileDeleteOptions, fileUploadOptions } from "@/services/file/option";
import { toast } from "sonner";
import PostCategorys from "./PostCategorys";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const fieldLabel: Record<keyof PostCreatePayload, string> = {
  title: "제목",
  uuid: "UUID",
  content: "내용",
  categoryId: "카테고리",
  readTime: "읽는 시간",
  published: "임시글",
};

interface PostFormProps {
  type: "CREATE" | "UPDATE";
  originalData?: Post;
}

export default function PostForm({ type, originalData }: PostFormProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const { data: categorys } = useQuery(categoryOptions);
  const postCreate = useMutation(postCreateOptions);
  const postUpdate = useMutation(postUpdateOptions);
  const fileUpload = useMutation(fileUploadOptions);
  const fileDelete = useMutation(fileDeleteOptions);

  const { values, isLoading, handleChange, handleChangeWithVal, handleSubmit } = useForm<PostCreatePayload>({
    initialVal: originalData
      ? originalData
      : {
          uuid: "",
          title: "",
          content: "",
          categoryId: 0,
          readTime: 5,
          published: false,
        },
    onSubmit: async (payload) => {
      if (type === "CREATE")
        postCreate.mutate(payload, {
          onSuccess: () => {
            router.push("/posts");
          },
          onError: () => {
            toast("게시글 생성 중 오류가 발생했습니다.", {
              position: "bottom-center",
            });
          },
        });
      else if (type === "UPDATE")
        postUpdate.mutate(payload, {
          onSuccess: () => {
            router.push(`/post/${values.uuid}`);
          },
          onError: () => {
            toast("게시글 수정 중 오류가 발생했습니다.", {
              position: "bottom-center",
            });
          },
        });
    },
    validator: postValidator,
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", resolvedTheme === "dark" ? "dark" : "light");
  }, [resolvedTheme]);

  const onPasted = async (event: React.ClipboardEvent) => {
    const file = event.clipboardData.files.item(0);
    if (file) {
      fileUpload.mutate(file, {
        onSuccess: (res) => {
          handleChangeWithVal({ name: "content", value: values.content + `![](/${res.filename})` });
        },
      });
    }
  };

  const onImageDeleted = async (path: string) => {
    fileDelete.mutate(
      { path },
      {
        onSuccess: () => {
          handleChangeWithVal({ name: "content", value: values.content.replace(`![](${path})`, "") });
        },
      }
    );
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4">
        <LabelWrapper label={fieldLabel.title} orientation="vertical">
          <Input name="title" type="text" placeholder="제목을 입력해주세요." value={values.title} onChange={handleChange} />
        </LabelWrapper>
        <LabelWrapper label={fieldLabel.uuid} orientation="vertical">
          <Input
            name="uuid"
            type="text"
            placeholder="경로로 사용할 UUID를 입력해주세요. (영어, -로만 구성)"
            value={values.uuid}
            onChange={handleChange}
          />
        </LabelWrapper>
        <LabelWrapper label={fieldLabel.content} orientation="vertical">
          <MDEditor
            value={values.content}
            className="w-full rounded resize-none"
            height={700}
            textareaProps={{
              placeholder: "내용을 입력해주세요.",
            }}
            onChange={(val) => handleChangeWithVal({ name: "content", value: val ?? "" })}
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
        </LabelWrapper>
        <div className="flex flex-wrap gap-4 items-center">
          <LabelWrapper label={fieldLabel.categoryId} orientation="horizontal">
            <Select onValueChange={(value) => handleChangeWithVal({ name: "categoryId", value })}>
              <SelectTrigger className="transition-all hover:bg-(--accent) hover:cursor-pointer">
                <SelectValue placeholder={"카테고리 선택"} />
              </SelectTrigger>
              <SelectContent>
                {categorys?.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()} className="transition-all hover:bg-(--accent) hover:cursor-pointer">
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <PostCategorys />
          </LabelWrapper>
          <LabelWrapper label={fieldLabel.readTime} orientation="horizontal">
            <Input name="readTime" type="number" className="w-[60px]" value={values.readTime} onChange={handleChange} />
          </LabelWrapper>
          <LabelWrapper label={fieldLabel.published} orientation="horizontal">
            <Checkbox id="published" className="size-5 cursor-pointer mt-0.5" />
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

function postValidator(form: PostCreatePayload) {
  const validList: (keyof PostCreatePayload)[] = ["title", "uuid", "content", "categoryId", "readTime"];
  const emptyField = validList.find((e) => !form[e]);
  if (emptyField) return `${josa(fieldLabel[emptyField], "을/를")} 입력해주세요.`;
  else if (!form.uuid.match(/^[a-zA-Z0-9-]+$/)) return "올바른 UUID 형식이 아닙니다.";

  return "";
}
