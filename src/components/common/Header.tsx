"use client";

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { CircleUserRound, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LoginButton, LogoutButton } from "./AuthButtons";
import { authClient } from "@/lib/auth-client";

const links = [
  { name: "분류 전체보기", href: "/posts" },
  { name: "About Koty", href: "/about" },
];

export default function Header() {
  const { data: session } = authClient.useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="mx-5 mt-2 mb-4 flex items-center justify-between">
      <Link href={"/"} className="flex items-center gap-x-2 text-lg font-bold">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/43947871?s=40&v=4" />
          <AvatarFallback>K</AvatarFallback>
        </Avatar>
        {"Koty's Blog"}
      </Link>
      <div className="flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.name}>
                <NavigationMenuLink asChild className="rounded-lg">
                  <Link href={link.href}>{link.name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {mounted && (
          <Button
            variant="outline"
            className="hover:cursor-pointer has-[>svg]:px-2.5"
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
          >
            {resolvedTheme === "light" ? <Moon /> : <Sun />}
          </Button>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="has-[>svg]:px-2.5">
              <CircleUserRound />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="flex flex-col items-center justify-center gap-3">
              {!session ? (
                <>
                  <p className="text-sm">로그인 하시면 댓글 작성이 가능합니다!</p>
                  <LoginButton />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <svg className="h-6 w-6" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <p>{session.user.email}</p>
                  </div>
                  <LogoutButton />
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
