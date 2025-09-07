"use client";

import { useRouter } from "next/navigation";
import Button from "../common/Button";
import useForm from "@/hooks/useForm";
import commonFetch from "@/lib/commonFetch";
import dynamic from "next/dynamic";
import { CustomDeleteImage } from "./MarkDownViewer";
import { Category, Post } from "@prisma/client";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface PostPayload {
  title: string;
  content: string;
  categoryId: number;
}

interface PostFormProps {
  type: "CREATE" | "UPDATE";
  post_id?: string;
  originalData?: Post;
  categorys: Category[];
}

export default function PostForm({ type, originalData, categorys }: PostFormProps) {
  const router = useRouter();
  const { values, errors, isLoading, handleChange, handleSubmit, mdEditorChange } = useForm<PostPayload>({
    initialVal: originalData
      ? originalData
      : {
          title: "",
          content: "",
          categoryId: 1,
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
    <div className="w-full border p-5 flex flex-col gap-2">
      <DefaultInput label="제목" name="title" value={values.title} handleChange={handleChange} error={errors?.title} />
      <div className="block">
        <span className="block font-bold text-slate-700">내용</span>
        <MDEditor
          value={values.content}
          className="w-full mt-1 px-2 py-1 border border-teal-400 shadow-sm rounded resize-none"
          height={600}
          onChange={(val) => mdEditorChange(val)}
          onPaste={onPasted}
          previewOptions={{
            components: {
              img: (props) =>
                CustomDeleteImage({
                  ...props,
                  onClick: () => {
                    if (typeof props.src === "string") onImageDeleted(props.src);
                  },
                }),
            },
          }}
        />
        <p className="text-red-600 font-bold text-sm">{errors?.content}</p>
      </div>
      <div className="block">
        <span className="block font-bold text-slate-700">카테고리</span>
        <select name="categoryId" value={values.categoryId} onChange={handleChange} className="mt-1 border border-teal-400">
          {categorys.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex mt-2 gap-2 justify-end">
        <Button text={type === "CREATE" ? "생성" : "수정"} onClick={handleSubmit} className="w-fit" disabled={isLoading} />
        <Button text="뒤로가기" onClick={() => router.back()} className="w-fit" />
      </div>
    </div>
  );
}

function DefaultInput({
  label,
  name,
  value,
  handleChange,
  error,
}: {
  label: string;
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}) {
  return (
    <label className="block">
      <span className="block font-bold text-slate-700">{label}</span>
      <input
        name={name}
        value={value}
        className="w-1/3 mt-1 px-2 py-1 appearance-none border border-teal-400 shadow-sm rounded focus:outline-none focus:border-teal-500"
        onChange={handleChange}
      />
      <p className="text-red-600 font-bold text-sm">{error}</p>
    </label>
  );
}

function PostValidator({ title, content }: PostPayload) {
  const errors: Record<keyof PostPayload, string> = {
    title: "",
    content: "",
    categoryId: "",
  };

  if (!title) {
    errors.title = "제목을 입력해주세요!";
  }

  if (!content) {
    errors.content = "내용을 입력해주세요!";
  }

  return errors;
}
