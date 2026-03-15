import { profile } from "@/consts/about";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="my-4 flex flex-col items-center gap-1">
      <div className="flex gap-4">
        <a
          href={`https://github.com/${profile.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
        >
          <SiGithub className="h-3.5 w-3.5" />
          GitHub
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
          Email
        </a>
      </div>
      <span className="text-muted-foreground text-sm">© 2026 Koty. All rights reserved.</span>
    </footer>
  );
}
