"use client";

import commonFetch from "@/lib/commonFetch";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryLists({ categorys }: { categorys: Category[] }) {
  const router = useRouter();
  const [modifyIdx, setModifyIdx] = useState<number>(-1);
  const [text, setText] = useState<string>("");

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onModifyStart = (name: string, idx: number) => {
    setText(name);
    setModifyIdx(idx);
  };

  const onModifyClicked = async (id: number) => {
    const res = await commonFetch<{ success: boolean }>(
      "/category",
      { id: id },
      {
        method: "PUT",
        body: JSON.stringify({
          name: text,
        }),
      }
    );
    if (res && res.success) {
      setModifyIdx(-1);
      setText("");
      router.refresh();
    }
  };

  const onDeleteClicked = async (id: number) => {
    const res = await commonFetch<{ success: boolean }>(
      "/category",
      { id: id },
      {
        method: "DELETE",
      }
    );
    if (res && res.success) {
      router.refresh();
    }
  };

  return categorys.map((c, i) => {
    const isModifying = modifyIdx === i;
    return (
      <div key={c.id} className="w-fit border p-2 flex gap-3 items-center">
        {isModifying ? <input value={text} onChange={onInputChanged}></input> : <span>{c.name}</span>}
        {isModifying ? (
          <span className="border p-1 text-sm hover:cursor-pointer hover:border-black" onClick={() => onModifyClicked(c.id)}>
            완료
          </span>
        ) : (
          <span className="text-xs hover:cursor-pointer hover:text-green-500 hover:font-bold" onClick={() => onModifyStart(c.name, i)}>
            ✎
          </span>
        )}
        {!isModifying && (
          <span className="text-xs hover:cursor-pointer hover:text-red-500 hover:font-bold" onClick={() => onDeleteClicked(c.id)}>
            ✕
          </span>
        )}
      </div>
    );
  });
}
