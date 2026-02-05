import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";
import { Prisma } from "@my-prisma/client";

export async function GET(request: NextRequest) {
  const order = request.nextUrl.searchParams.get("order");
  const category = request.nextUrl.searchParams.get("category");
  const page = Number(request.nextUrl.searchParams.get("page") || 1);
  const limit = Number(request.nextUrl.searchParams.get("limit") || 8);

  let orderBy:
    | Prisma.PostOrderByWithRelationInput
    | Prisma.PostOrderByWithRelationInput[];
  if (!order || order === "latest") orderBy = { register_date: "desc" };
  else if (order === "views")
    orderBy = [{ views: "desc" }, { register_date: "desc" }];
  else if (order === "oldest") orderBy = { register_date: "asc" };
  else orderBy = { register_date: "desc" };

  try {
    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
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
  } catch {
    return NextResponse.json({
      count: 0,
      posts: [],
    });
  }
}
