"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Heading {
  type: string;
  id: string;
}

const MarginByHeading: Record<string, string> = {
  H1: "ml-2",
  H2: "ml-4",
  H3: "ml-6",
};

export default function PostIndex() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    setHeadings(
      [...document.querySelectorAll("h1, h2, h3")]
        .filter((e) => e.id)
        .map((e) => {
          return {
            id: e.id,
            type: e.nodeName,
          };
        })
    );
  }, []);

  return (
    <div className={"sticky top-[60px] h-fit border-l border-l-4 flex flex-col gap-1"}>
      {headings.map((heading) => (
        <Link key={heading.id} href={`${pathname}#${heading.id}`} className={`${MarginByHeading[heading.type]} hover:underline`}>
          {heading.id.replace("-", " ")}
        </Link>
      ))}
    </div>
  );
}
