import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";
import { Prisma } from "@my-prisma/client";
import { apiError } from "@/consts/apiError";
import { checkIsKoty } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const order = searchParams.get("order");
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 8);
  const temp = Boolean(searchParams.get("temp"));

  let orderBy: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];

  const isKoty = await checkIsKoty();

  switch (order) {
    case "latest":
      orderBy = { register_date: "desc" };
      break;
    case "views":
      orderBy = [{ views: "desc" }, { register_date: "desc" }];
      break;
    case "oldest":
      orderBy = { register_date: "asc" };
      break;
    case "updated":
      orderBy = { updated_date: "desc" };
      break;
    default:
      orderBy = { register_date: "desc" };
  }

  try {
    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        ...(category && { category: { name: category } }),
        published: isKoty ? !temp : true,
      },
      orderBy,
    });
    return NextResponse.json({
      count: posts.length,
      posts: posts,
    });
  } catch (error) {
    console.log(error);
    return apiError.internalServerError("게시글 목록 조회");
  }
}
