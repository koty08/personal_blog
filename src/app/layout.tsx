import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

const open_sans = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next 13 App Test",
  description: "App Router 공부",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-locator-target="vscode">
      <body className={open_sans.className}>
        <NavBar />
        <div id="main" className="px-5 min-h-[85vh]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
