import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";

export async function GET() {
  const categorys = await prisma.category.findMany({
    include: {
      _count: true,
    },
  });
  return NextResponse.json(
    categorys.map((e) => ({
      id: e.id,
      name: e.name,
      count: e._count.posts,
    }))
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    await prisma.category.create({
      data: body,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({}, { status: 404 });
  }
  const body = await request.json();
  try {
    await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: body,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({}, { status: 404 });
  }
  try {
    // 카테고리 삭제전 해당 카테고리에 있는 Post들 전부 미분류로
    await prisma.post.updateMany({
      where: {
        categoryId: Number(id),
      },
      data: {
        categoryId: 1,
      },
    });
    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
