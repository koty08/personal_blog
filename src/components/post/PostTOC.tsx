"use client";

import { marginByHLevel } from "@/consts/posts";
import { postOptions } from "@/services/post/options";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export type HeadingLevel = "h1" | "h2" | "h3";

export interface Heading {
  level: HeadingLevel;
  id: string;
  text: string;
}

export default function PostTOC() {
  const { uid } = useParams<{ uid: string }>();
  const { data } = useSuspenseQuery(postOptions({ uid }));
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const rawHeadings = Array.from(document.querySelectorAll("h1, h2, h3"))
      .filter((el) => el.id !== "title")
      .map((el) => ({
        level: el.tagName.toLowerCase() as HeadingLevel,
        id: el.id.replace("user-content-", ""),
        text: el.textContent ?? "",
      }));
    setHeadings(normalizeHeadings(rawHeadings));
  }, [data.content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id.replace("user-content-", ""));
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id) ?? document.getElementById(`user-content-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="sticky top-15 flex h-fit flex-col gap-1 border-l-4">
      {headings.map((heading) => (
        <Link
          key={heading.id}
          href={{ hash: heading.id }}
          replace
          className={`${marginByHLevel[heading.level]} transition-colors hover:underline ${
            activeId === heading.id ? "text-foreground font-semibold" : "text-muted-foreground"
          }`}
        >
          {heading.text}
        </Link>
      ))}
    </div>
  );
}

const normalizeHeadings = (headings: Heading[]) => {
  const hasH1 = headings.some((h) => h.level === "h1");
  if (hasH1) return headings;

  const hasH2 = headings.some((h) => h.level === "h2");
  if (hasH2) return headings.map((h) => ({ ...h, level: (h.level === "h2" ? "h1" : "h2") as HeadingLevel }));

  return headings.map((h) => ({ ...h, level: "h2" as HeadingLevel }));
};
