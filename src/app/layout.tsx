import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { ThemeProvider } from "@/components/common/ThemeProvider";

const open_sans = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Koty's Blog",
  description: "Koty의 개발 블로그",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-locator-target="vscode" suppressHydrationWarning>
      <body className={open_sans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NavBar />
          <div id="main" className="px-5 min-h-[85vh]">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
