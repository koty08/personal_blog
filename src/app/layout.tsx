import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/provider/ThemeProvider";
import QCProvider from "@/provider/QCProvider";
import { Toaster } from "@/components/ui/sonner";
import GlobalBackground from "@/components/common/GlobalBackground";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

const pretendard = localFont({
  src: "../../public/fonts/pretendard/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kotys.dev"),
  title: "Koty's Blog",
  description: "Koty의 개발 블로그",
  openGraph: {
    type: "website",
    siteName: "Koty's Blog",
    title: "Koty's Blog",
    images: [{ url: "/images/common/og-image.png" }],
    description: "Koty의 개발 블로그",
    locale: "ko_KR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-locator-target="vscode" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={pretendard.className}>
        <GlobalBackground />
        <QCProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <TooltipProvider>
              <Header />
              <div id="main" className="container mx-auto min-h-[84vh] max-w-6xl space-y-12 px-5 py-5 md:py-10">
                {children}
              </div>
              <Footer />
              <ScrollToTopButton />
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </QCProvider>
      </body>
    </html>
  );
}
