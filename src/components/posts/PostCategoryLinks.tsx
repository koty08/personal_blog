"use client";

import { Category } from "@prisma/client";
import { LinkButton } from "../common/Button";
import { useParams } from "next/navigation";

export default function PostCategoryLinks({ categorys }: { categorys: Category[] | null }) {
  const params = useParams();
  const category = decodeURI(params.category as string);

  if (!categorys) return <></>;

  return (
    <div className="w-fit flex flex-col gap-3">
      <LinkButton
        href={`/posts`}
        text={"전체"}
        className={`${category === "undefined" && "bg-green-200"}`}
        additionalText={`${categorys.reduce((p, c) => p + 1, 0)}`}
      />
      {categorys.map((c) => (
        <LinkButton
          key={c.id}
          href={`/posts/${c.name}`}
          text={c.name}
          additionalText={`${c.name}`}
          className={`${category === c.name && "bg-green-200"}`}
        />
      ))}
    </div>
  );
}
