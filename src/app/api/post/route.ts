import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";
import { getAllImages } from "@/lib/markdownUtils";
import fs from "fs/promises";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export async function GET(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get("uid");
  if (!uid) {
    return NextResponse.json({}, { status: 404 });
  }

  try {
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
    console.log(post);

    if (post !== null) {
      return NextResponse.json(post);
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    await prisma.$transaction(async (tx) => {
      const newPost = await tx.post.create({
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
            postId: newPost.id,
          })),
        });
      }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    const e = error as Error;
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") return NextResponse.json({ success: false }, { status: 409 });
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const uid = body.uid;
  if (!uid) {
    return NextResponse.json({}, { status: 404 });
  }

  try {
    const existingPost = await prisma.post.findUnique({ where: { uid }, include: { images: true } });
    if (!existingPost) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const existingImagePaths = existingPost.images.map((image) => image.path);
    const newImagePaths = getAllImages(body.content);

    const imagesToAdd = newImagePaths.filter((path) => !existingImagePaths.includes(path));
    const imagesToDelete = existingImagePaths.filter((path) => !newImagePaths.includes(path));

    await prisma.$transaction([
      prisma.post.update({
        where: { uid },
        data: {
          ...body,
          categoryId: Number(body.categoryId),
          updated_date: new Date(),
        },
      }),
      ...(imagesToDelete.length > 0
        ? [prisma.postImage.deleteMany({ where: { path: { in: imagesToDelete }, postId: existingPost.id } })]
        : []),
      ...(imagesToAdd.length > 0
        ? [
            prisma.postImage.createMany({
              data: imagesToAdd.map((path) => ({ path, postId: existingPost.id })),
            }),
          ]
        : []),
    ]);
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") return NextResponse.json({ success: false }, { status: 409 });
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

const basePath = "./public/images/post";

export async function DELETE(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get("uid");
  if (!uid) {
    return NextResponse.json({}, { status: 404 });
  }

  try {
    const existingPost = await prisma.post.findUnique({ where: { uid }, include: { images: true } });
    if (!existingPost) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

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
      await fs.rm(`${basePath}${path}`);
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
