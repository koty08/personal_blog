import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { ThemeProvider } from "@/provider/ThemeProvider";
import QCProvider from "@/provider/QCProvider";
import { Toaster } from "@/components/ui/sonner";
import GlobalBackground from "@/components/common/GlobalBackground";

const open_sans = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Koty's Blog",
  description: "Koty의 개발 블로그",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-locator-target="vscode" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={open_sans.className}>
        <GlobalBackground />
        <QCProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <div id="main" className="container mx-auto min-h-[85vh] max-w-6xl space-y-12 px-5 py-5 md:py-10">
              {children}
            </div>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </QCProvider>
      </body>
    </html>
  );
}
