import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  const uuid = request.nextUrl.searchParams.get("uuid");
  if (!uuid) {
    return NextResponse.json({}, { status: 404 });
  }

  try {
    const post = await prisma.post.update({
      where: {
        uuid,
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
        register_date: new Date().toISOString(),
        views: 0,
        uuid: uuidv4(),
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const uuid = body.uuid;
  if (!uuid) {
    return NextResponse.json({}, { status: 404 });
  }

  try {
    await prisma.post.update({
      where: {
        uuid,
      },
      data: body,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(request: NextRequest) {
  const uuid = request.nextUrl.searchParams.get("uuid");
  if (!uuid) {
    return NextResponse.json({}, { status: 404 });
  }

  try {
    await prisma.post.delete({
      where: {
        uuid,
      },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
