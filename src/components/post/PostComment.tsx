"use client";

import { useTheme } from "next-themes";
import Giscus from "@giscus/react";

export default function PostComment() {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      id="comments"
      repo="koty08/personal_blog"
      repoId="1048253651"
      category="General"
      mapping="pathname"
      emitMetadata="0"
      reactionsEnabled="0"
      inputPosition="top"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      lang="ko"
      loading="lazy"
    />
  );
}
