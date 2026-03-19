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
import { range } from "es-toolkit";

const DISPLAY_PAGE_COUNT = 5;

interface CustomPaginationProps {
  totalCount: number;
  itemPerPage: number;
}

export default function CustomPagination({ totalCount, itemPerPage }: CustomPaginationProps) {
  const searchParams = useSearchParams();
  const q_page = searchParams.get("page");
  const nowPage = q_page ? parseInt(q_page) : 1;
  const totalPage = Math.ceil(totalCount / itemPerPage);
  const currentBlock = Math.ceil(nowPage / DISPLAY_PAGE_COUNT);

  if (totalPage <= 1) return null;

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
        {range(currentBlock * DISPLAY_PAGE_COUNT - 4, Math.min(currentBlock * DISPLAY_PAGE_COUNT + 1, totalPage)).map((i) => (
          <PaginationItem key={i}>
            <PaginationLink href={{ query: setSearchParams(i) }} isActive={i === nowPage}>
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentBlock < Math.ceil(totalPage / DISPLAY_PAGE_COUNT) && (
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
