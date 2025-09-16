"use client";

import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface CustomPaginationProps {
  totalCount: number;
  itemPerPage: number;
}

export default function CustomPagination({ totalCount, itemPerPage }: CustomPaginationProps) {
  const searchParams = useSearchParams();
  const q_page = searchParams.get("page");
  const nowPage = q_page ? parseInt(q_page) : 1;
  const totalPage = Math.ceil(totalCount / itemPerPage);

  const setSearchParams = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return params.toString();
  };

  return (
    <Pagination>
      <PaginationContent>
        {nowPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={{ query: setSearchParams(nowPage - 1) }} />
          </PaginationItem>
        )}
        {[...Array(5)]
          .filter((_, i) => i + nowPage <= totalPage)
          .map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink href={{ query: setSearchParams(i + nowPage) }}>{i + nowPage}</PaginationLink>
            </PaginationItem>
          ))}
        {nowPage + 5 < totalPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {nowPage < totalPage && (
          <PaginationItem>
            <PaginationNext href={{ query: setSearchParams(nowPage + 1) }} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
