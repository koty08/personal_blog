import prisma from "@/app/api/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { headers } from "next/headers";

export const auth = betterAuth({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});

export const checkIsKoty = async () => {
  "use server";
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return false;
  else {
    console.log(`${process.env.ADMIN_KOTY_EMAIL}`);
    return session.user.email === `${process.env.ADMIN_KOTY_EMAIL}` ? true : false;
  }
};
