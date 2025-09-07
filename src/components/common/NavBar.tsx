import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const links = [
  { name: "전체 게시글", href: "/posts" },
  { name: "About Koty", href: "/about" },
];

export default function NavBar() {
  return (
    <div className="flex mx-5 mt-2 mb-4 justify-between items-center">
      <Link href={"/"} className="flex gap-x-2 items-center text-lg font-bold">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {"Koty's Blog"}
      </Link>
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
    </div>
  );
}
