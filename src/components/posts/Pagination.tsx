"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ count }: { count: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q_page = searchParams.get("page");

  let calcPage = Math.floor(count / 8);
  if (!(count % 8)) calcPage -= 1;

  return (
    <div className="flex gap-3 justify-center">
      {calcPage >= 1 &&
        [...Array(calcPage + 1).keys()].map((e) => {
          const idx = `${e + 1}`;
          const params = new URLSearchParams(searchParams);
          params.set("page", idx);
          return (
            <Link
              href={`${pathname}?${params}`}
              key={idx}
              className={`hover:font-bold hover:underline decoration-2 ${
                (q_page === idx || (!q_page && idx === "1")) && "font-bold underline"
              }`}
            >
              {idx}
            </Link>
          );
        })}
    </div>
  );
}
