import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";
import { getAllImages } from "@/lib/markdownUtils";
import fs from "fs/promises";
import { apiError } from "@/consts/apiError";
import { checkIsKotyWrapper } from "@/lib/auth-server";
import { imagePath } from "@/consts/posts";

export async function GET(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get("uid");
  if (!uid) return apiError.missingParams;

  try {
    const existingPost = await prisma.post.findUnique({ where: { uid } });
    if (!existingPost) return apiError.notFound(`UID: ${uid}의 게시글`);

    const post = await prisma.post.update({
      where: {
        uid,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return apiError.internalServerError("게시글 조회");
  }
}

export const POST = checkIsKotyWrapper(async (request: NextRequest) => {
  const body = await request.json();
  if (!checkPostKeys(body)) return apiError.missingParams;
  const uid = body.uid;

  try {
    const checkDuplicated = await prisma.post.findUnique({ where: { uid } });
    if (checkDuplicated) return apiError.conflict(`UID: ${uid}의 게시글`);

    const newPost = await prisma.$transaction(async (tx) => {
      const post = await tx.post.create({
        data: {
          ...body,
          categoryId: Number(body.categoryId),
        },
      });
      const images = getAllImages(body.content);
      if (images.length > 0) {
        await tx.postImage.createMany({
          data: images.map((path) => ({
            path,
            postId: post.id,
          })),
        });
      }
      return post;
    });
    return NextResponse.json(newPost);
  } catch (error) {
    console.log(error);
    return apiError.internalServerError("게시글 생성");
  }
});

export const PUT = checkIsKotyWrapper(async (request: NextRequest) => {
  const body = await request.json();
  if (!checkPostKeys(body)) return apiError.missingParams;
  const uid = body.uid;

  try {
    const existingPost = await prisma.post.findUnique({ where: { uid }, include: { images: true } });
    if (!existingPost) return apiError.notFound(`UID: ${uid}의 게시글`);

    const existingImagePaths = existingPost.images.map((image) => image.path);
    const newImagePaths = getAllImages(body.content);

    const imagesToAdd = newImagePaths.filter((path) => !existingImagePaths.includes(path));
    const imagesToDelete = existingImagePaths.filter((path) => !newImagePaths.includes(path));

    const newPost = await prisma.$transaction(async (tx) => {
      const post = await prisma.post.update({
        where: { uid },
        data: {
          ...body,
          categoryId: Number(body.categoryId),
          updated_date: new Date(),
        },
      });

      if (imagesToDelete.length) await prisma.postImage.deleteMany({ where: { path: { in: imagesToDelete }, postId: existingPost.id } });
      if (imagesToAdd.length)
        await prisma.postImage.createMany({
          data: imagesToAdd.map((path) => ({ path, postId: existingPost.id })),
        });

      return post;
    });

    return NextResponse.json(newPost);
  } catch (error) {
    console.log(error);
    return apiError.internalServerError("게시글 수정");
  }
});

export const DELETE = checkIsKotyWrapper(async (request: NextRequest) => {
  const uid = request.nextUrl.searchParams.get("uid");
  if (!uid) return apiError.missingParams;

  try {
    const existingPost = await prisma.post.findUnique({ where: { uid }, include: { images: true } });
    if (!existingPost) return apiError.notFound(`UID: ${uid}의 게시글`);

    const existingImagePaths = existingPost.images.map((image) => image.path);
    await prisma.$transaction([
      prisma.postImage.deleteMany({ where: { path: { in: existingImagePaths }, postId: existingPost.id } }),
      prisma.post.delete({
        where: {
          uid,
        },
      }),
    ]);
    existingImagePaths.forEach(async (path) => {
      await fs.rm(`${imagePath.server}${path}`);
    });
    return NextResponse.json({}, { status: 204 });
  } catch {
    return apiError.internalServerError("게시글 삭제");
  }
});

const checkPostKeys = (body: any) => {
  const keys = ["uid", "title", "content", "categoryId", "readTime", "published"];
  return keys.every((key) => {
    if (!body[key]) return false;
    return true;
  });
};
