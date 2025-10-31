import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

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
    await prisma.post.create({
      data: {
        ...body,
        categoryId: Number(body.categoryId),
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
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
    await prisma.post.update({
      where: {
        uid,
      },
      data: {
        ...body,
        categoryId: Number(body.categoryId),
        updated_date: new Date(),
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") return NextResponse.json({ success: false }, { status: 409 });
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get("uid");
  if (!uid) {
    return NextResponse.json({}, { status: 404 });
  }

  try {
    await prisma.post.delete({
      where: {
        uid,
      },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
