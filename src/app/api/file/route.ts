import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { apiError } from "@/consts/apiError";
import { checkIsKotyWrapper } from "@/lib/auth-server";

const imageServerPath = path.join(process.cwd(), "public/images/post");

export const POST = checkIsKotyWrapper(async (request: NextRequest) => {
  const filename = `image-${Date.now()}.png`;

  try {
    const blob = await request.blob();
    const file = await blob.arrayBuffer();
    await fs.writeFile(`${imageServerPath}/${filename}`, Buffer.from(file));
    return NextResponse.json({ filename: filename });
  } catch (error) {
    console.log(error);
    return apiError.internalServerError("이미지 업로드");
  }
});

export const DELETE = checkIsKotyWrapper(async (request: NextRequest) => {
  const path = request.nextUrl.searchParams.get("path");
  if (!path) return apiError.missingParams;

  try {
    const fullPath = `${imageServerPath}${path}`;
    await fs.rm(fullPath);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return apiError.internalServerError("이미지 삭제");
  }
});
