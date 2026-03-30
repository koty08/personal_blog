import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";
import { Prisma } from "@my-prisma/client";
import { apiError } from "@/consts/apiError";
import { checkIsKoty } from "@/lib/auth-server";
import { POST_PER_PAGE } from "@/consts/post";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const order = searchParams.get("order");
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || POST_PER_PAGE);
  const temp = Boolean(searchParams.get("temp"));

  let orderBy: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];

  const isKoty = await checkIsKoty();

  switch (order) {
    case "latest":
      orderBy = { register_date: "desc" };
      break;
    case "popularity":
      orderBy = [{ views: "desc" }, { comments: { _count: "desc" } }, { register_date: "desc" }];
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

  const where = {
    ...(category && { category: { name: category } }),
    published: isKoty ? !temp : true,
  };

  try {
    const totalPosts = await prisma.post.count({ where });
    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where,
      orderBy,
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    const formattedPosts = posts.map(({ _count, ...post }) => ({
      ...post,
      commentCount: _count.comments,
    }));

    return NextResponse.json({
      count: totalPosts,
      posts: formattedPosts,
    });
  } catch (error) {
    console.log(error);
    return apiError.internalServerError("게시글 목록 조회");
  }
}
