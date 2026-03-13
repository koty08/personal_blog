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
import { SiGithub } from "@icons-pack/react-simple-icons";

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
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className={`hover:cursor-pointer has-[>svg]:px-2.5 transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            disabled={!mounted}
          >
            {mounted && resolvedTheme === "light" ? <Moon /> : <Sun />}
          </Button>
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
                      <SiGithub className="h-6 w-6" />
                      <p>{session.user.email}</p>
                    </div>
                    <LogoutButton />
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
