"use client";

import { useState } from "react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import commonFetch from "@/lib/commonFetch";

export default function CategoryCreate() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  const onCreateClicked = async () => {
    const res = await commonFetch<{ success: boolean }>(`/category`, undefined, {
      method: "POST",
      body: JSON.stringify({
        name: value,
      }),
    });
    if (res && res.success) {
      setValue("");
      router.refresh();
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        className="px-2 py-1 appearance-none border border-teal-400 shadow-sm rounded focus:outline-none focus:border-teal-500"
        value={value}
        maxLength={15}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <Button text="생성" onClick={onCreateClicked} />
    </div>
  );
}
