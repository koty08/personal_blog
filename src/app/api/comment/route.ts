import { NextResponse } from "next/server";
import prisma from "../prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { apiError } from "@/consts/apiError";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return apiError.needLogin;

  const body = await request.json();
  const { postUid, content, parentId } = body;
  if (!postUid || !content) return apiError.missingParams;

  try {
    const existingPost = await prisma.post.findUnique({ where: { uid: postUid } });
    if (!existingPost) return apiError.notFound(`UID: ${postUid}의 게시글`);

    const comment = await prisma.comment.create({
      data: {
        postUid: postUid,
        userId: session.user.id,
        content,
        parentId: parentId ?? null,
      },
    });
    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return apiError.internalServerError("댓글 생성");
  }
}

export async function PUT(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return apiError.needLogin;

  const body = await request.json();
  const { id, content } = body;
  if (!id || !content) return apiError.missingParams;

  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) return apiError.notFound(`ID: ${id}의 댓글`);

    if (existingComment.userId !== session.user.id) return apiError.unauthorized;

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error(error);
    return apiError.internalServerError("댓글 수정");
  }
}

export async function DELETE(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return apiError.needLogin;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return apiError.missingParams;

  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!existingComment) return apiError.notFound(`ID: ${id}의 댓글`);

    if (existingComment.userId !== session.user.id) return apiError.unauthorized;

    await prisma.comment.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return apiError.internalServerError("댓글 삭제");
  }
}
