import { auth } from "./auth";
import { headers } from "next/headers";

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
