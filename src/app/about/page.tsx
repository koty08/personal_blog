"use client";

import "./about.css";
import { MoveDown } from "lucide-react";
import { useEffect } from "react";

export default function About() {
  const cards = [
    {
      title: "👨‍💻 About Me",
    },
    {
      title: "💡 Skills",
    },
    {
      title: "🚀 Projects",
    },
    {
      title: "💼 Career",
    },
    {
      title: "🏆 Awards & Experience",
    },
  ];

  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      mainEl.style.setProperty("--scroll-progress", progress.toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main>
      <section id="overview" className="relative flex h-screen flex-col items-center justify-center overflow-hidden perspective-[1000px]">
        <div className="absolute inset-0 -top-30 z-0 origin-bottom transform-[rotateX(calc(var(--scroll-progress,0)*70deg))] bg-[radial-gradient(circle_at_1px_1px,var(--muted-foreground)_1px,transparent_0)] mask-[linear-gradient(to_bottom,transparent_10%,white_80%)] bg-size-[45px_45px] transition-transform duration-100 ease-out [-webkit-mask-image:linear-gradient(to_bottom,transparent_10%,white_80%)]" />
        <div className="relative z-10 space-y-4">
          <h1 className="animate-typewriter-h1 overflow-hidden border-r-3 pr-1 text-5xl leading-15 font-bold tracking-tight whitespace-nowrap">
            안녕하세요, FE 개발자 Koty입니다.
          </h1>
          <p className="text-muted-foreground animate-typewriter-p overflow-hidden text-xl whitespace-nowrap">
            빠르게 변화하고 발전되는 기술들에 맞추어 다양하고 폭넓은 경험을 추구합니다.
          </p>
        </div>
        <MoveDown className="absolute bottom-40 z-10 h-10 w-10 animate-bounce" />
      </section>
      <section className="w-full pt-10 pb-20">
        <div className="container mx-auto max-w-3xl space-y-16 px-4 md:px-6">
          {cards.map((card, i) => (
            <div key={i} className="animate-fade-in-up">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{card.title}</h2>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
