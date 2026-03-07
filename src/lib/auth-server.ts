import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { headers } from "next/headers";
import { apiError } from "@/consts/apiError";

export const checkIsKoty = async () => {
  "use server";
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return false;
  else {
    return session.user.email === `${process.env.ADMIN_KOTY_EMAIL}` ? true : false;
  }
};

type RouteHandler = (request: NextRequest) => Promise<NextResponse>;

export const checkIsKotyWrapper = (handler: RouteHandler) => {
  return async (request: NextRequest) => {
    const isKoty = await checkIsKoty();
    if (!isKoty) return apiError.unauthorized;

    const response = await handler(request);
    return response;
  };
};
