"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export const LoginButton = () => {
  const pathname = usePathname();
  const handleClick = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: `${window.location.origin}${pathname}`,
    });
  };

  return (
    <Button variant={"outline"} onClick={handleClick}>
      GitHub 계정으로 로그인
    </Button>
  );
};

export const LogoutButton = () => {
  const router = useRouter();
  const handleClick = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <Button variant={"outline"} onClick={handleClick}>
      로그아웃
    </Button>
  );
};
