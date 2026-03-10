import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";
import { apiError } from "@/consts/apiError";
import { checkIsKotyWrapper } from "@/lib/auth-server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: true,
      },
    });
    return NextResponse.json(
      categories.map((e) => ({
        id: e.id,
        name: e.name,
        count: e._count.posts,
      }))
    );
  } catch (error) {
    console.error(error);
    return apiError.internalServerError("카테고리 조회");
  }
}

export const POST = checkIsKotyWrapper(async (request: NextRequest) => {
  const body = await request.json();
  if (!body.name) return apiError.missingParams;

  try {
    const checkDuplicated = await prisma.category.findUnique({ where: { name: body.name } });
    if (checkDuplicated) return apiError.conflict(`이름: ${body.name}의 카테고리`);

    const category = await prisma.category.create({
      data: body,
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return apiError.internalServerError("카테고리 생성");
  }
});

export const PUT = checkIsKotyWrapper(async (request: NextRequest) => {
  const body = await request.json();
  const { id, name } = body;
  if (!id || !name) return apiError.missingParams;

  try {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!existingCategory) return apiError.notFound(`ID: ${id}의 카테고리`);

    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: body,
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return apiError.internalServerError("카테고리 수정");
  }
});

export const DELETE = checkIsKotyWrapper(async (request: NextRequest) => {
  const body = await request.json();
  const { id } = body;
  if (!id) return apiError.missingParams;

  try {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!existingCategory) return apiError.notFound(`ID: ${id}의 카테고리`);

    await prisma.$transaction([
      // 카테고리 삭제전 해당 카테고리에 있는 Post들 전부 1번 카테고리로
      prisma.post.updateMany({
        where: {
          categoryId: Number(id),
        },
        data: {
          categoryId: 1,
        },
      }),
      prisma.category.delete({
        where: {
          id: Number(id),
        },
      }),
    ]);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return apiError.internalServerError("카테고리 삭제");
  }
});
