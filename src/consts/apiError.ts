import { NextResponse } from "next/server";
import { josa } from "es-hangul";

export const apiError = {
  missingParams: NextResponse.json({ message: "필수 파라미터가 누락되었습니다." }, { status: 400 }),
  needLogin: NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 }),
  unauthorized: NextResponse.json({ message: "권한이 없습니다." }, { status: 403 }),
  notFound: (detail: string) => NextResponse.json({ message: `${josa(detail, "을/를")} 찾을 수 없습니다.}` }, { status: 404 }),
  internalServerError: (detail: string) => NextResponse.json({ message: `${detail}중 오류가 발생했습니다.` }, { status: 500 }),
};
