import { NextResponse } from "next/server";
import prisma from "../prisma";
import { apiError } from "@/consts/apiError";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  if (!uid) return apiError.missingParams;

  try {
    const existingPost = await prisma.post.findUnique({ where: { uid } });
    if (!existingPost) return apiError.notFound(`UID: ${uid}의 게시글`);

    const comments = await prisma.comment.findMany({
      where: {
        postUid: uid,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return apiError.internalServerError("댓글 조회");
  }
}
