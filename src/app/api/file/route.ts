import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2, R2_BUCKET_NAME, R2_PUBLIC_URL } from "@/lib/r2";
import { apiError } from "@/consts/apiError";
import { checkIsKotyWrapper } from "@/lib/auth-server";

export const POST = checkIsKotyWrapper(async (request: NextRequest) => {
  const filename = `${Date.now()}.png`;

  try {
    const blob = await request.blob();
    const file = await blob.arrayBuffer();
    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: filename,
        Body: Buffer.from(file),
        ContentType: "image/png",
      })
    );
    return NextResponse.json({ url: `${R2_PUBLIC_URL}/${filename}` });
  } catch (error) {
    console.log(error);
    return apiError.internalServerError("이미지 업로드");
  }
});

export const DELETE = checkIsKotyWrapper(async (request: NextRequest) => {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) return apiError.missingParams;

  try {
    const filename = url.split("/").pop()!;
    await r2.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: filename,
      })
    );
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return apiError.internalServerError("이미지 삭제");
  }
});
