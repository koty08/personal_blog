"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Heading {
  type: string;
  id: string;
}

const MarginByHeading: Record<string, string> = {
  h1: "ml-2.5",
  h2: "ml-5",
  h3: "ml-7.5",
};

export default function PostTOC() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
      .filter((e) => e.id !== "title")
      .map((e) => ({ type: e.tagName.toLowerCase(), id: e.id }));
    if (!headings.find((e) => e.type === "h1")) {
      if (!headings.find((e) => e.type === "h2")) setHeadings(headings.map((e) => ({ ...e, type: e.type === "h3" ? "h2" : "h1" })));
      else setHeadings(headings.map((e) => ({ ...e, type: "h1" })));
    } else setHeadings(headings);
  }, []);

  return (
    <div className={"sticky top-[60px] h-fit border-l-4 flex flex-col gap-1"}>
      {headings.map((heading) => (
        <Link key={heading.id} href={`${pathname}#${heading.id}`} className={`${MarginByHeading[heading.type]} hover:underline`}>
          {heading.id.replace("-", " ")}
        </Link>
      ))}
    </div>
  );
}
