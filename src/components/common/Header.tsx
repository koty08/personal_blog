"use client";

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

const links = [
  { name: "분류 전체보기", href: "/posts" },
  { name: "About Koty", href: "/about" },
];

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();

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
        <Button
          variant="outline"
          className="hover:cursor-pointer has-[>svg]:px-2.5"
          onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        >
          {resolvedTheme === "light" ? <Moon /> : <Sun />}
        </Button>
      </div>
    </header>
  );
}
