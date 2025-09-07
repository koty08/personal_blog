import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";

export async function GET(request: NextRequest) {
  const order = request.nextUrl.searchParams.get("order");
  const page = Number(request.nextUrl.searchParams.get("page"));
  const category = request.nextUrl.searchParams.get("category");

  const posts = await prisma.post.findMany({
    skip: page ? (page - 1) * 8 : 0,
    take: 8,
    where: category
      ? {
          category: {
            name: category,
          },
        }
      : {},
    orderBy: {
      register_date: order === "asc" ? "asc" : "desc",
    },
  });
  const count = await prisma.post.count({
    where: category
      ? {
          category: {
            name: category,
          },
        }
      : {},
  });
  return NextResponse.json({
    count: count,
    posts: posts,
  });
}
