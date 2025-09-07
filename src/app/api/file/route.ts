import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function POST(request: NextRequest) {
  const filename = `image-${Date.now()}.png`;

  try {
    const file = await (await request.blob()).arrayBuffer();
    await fs.writeFile(`./public/${filename}`, Buffer.from(file));
    return NextResponse.json({ success: true, filename: filename });
  } catch {
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  if (path) {
    try {
      const fullPath = `./public${path}`;
      await fs.rm(fullPath);
      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json({ success: false });
    }
  } else {
    return NextResponse.json({ success: false });
  }
}
