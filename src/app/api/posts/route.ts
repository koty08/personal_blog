import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const order = request.nextUrl.searchParams.get("order");
  const page = Number(request.nextUrl.searchParams.get("page"));
  const category = request.nextUrl.searchParams.get("category");

  let orderBy: Prisma.PostOrderByWithRelationInput;
  if (!order || order === "latest") orderBy = { register_date: "desc" };
  else if (order === "views") orderBy = { views: "desc", register_date: "desc" };
  else if (order === "oldest") orderBy = { register_date: "asc" };
  else orderBy = { register_date: "desc" };

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
    orderBy,
  });
  return NextResponse.json({
    count: posts.length,
    posts: posts,
  });
}
