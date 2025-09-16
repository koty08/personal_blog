"use client";

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const links = [
  { name: "전체 게시글", href: "/posts" },
  { name: "About Koty", href: "/about" },
];

export default function NavBar() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex mx-5 mt-2 mb-4 justify-between items-center">
      <Link href={"/"} className="flex gap-x-2 items-center text-lg font-bold">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/43947871?s=40&v=4" />
          <AvatarFallback>K</AvatarFallback>
        </Avatar>
        {"Koty's Blog"}
      </Link>
      <div className="flex gap-4 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.name}>
                <NavigationMenuLink asChild>
                  <Link href={link.href}>{link.name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Button variant="default" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
          {"변경"}
        </Button>
      </div>
    </div>
  );
}
