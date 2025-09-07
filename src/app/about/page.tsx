"use client";

import "aos/dist/aos.css";
import AOS from "aos";
import React, { useEffect, useRef, useState } from "react";

interface CardStyles {
  className: string;
  animationName: string;
}

const stylesByCard: Record<string, CardStyles> = {
  0: {
    className: "bg-gray-100 top-[7%]",
    animationName: "scale-1",
  },
  1: {
    className: "bg-gray-200 top-[14%]",
    animationName: "scale-2",
  },
  2: {
    className: "bg-gray-300 top-[21%]",
    animationName: "scale-3",
  },
  3: {
    className: "bg-gray-400 top-[28%]",
    animationName: "scale-4",
  },
};

export default function About() {
  const scrollRef = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    AOS.init({
      duration: 500,
      disableMutationObserver: false,
      debounceDelay: 50,
    });
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = () => {
    AOS.refresh();
  };

  return (
    <div>
      <div className="h-[100vh] flex flex-col justify-center items-center text-4xl font-bold">
        Scroll To Show
        <div className="animate-bounce w-6 h-6">⬇</div>
      </div>
      <div className="h-[250vh] flex flex-col relative items-center pb-[50px]">
        {[...Array(4).keys()].map((i) => (
          <React.Fragment key={i}>
            <span ref={(el) => (scrollRef.current[i] = el)}></span>
            <div
              className={`border w-[80%] h-[25%] sticky hover:cursor-pointer ${stylesByCard[i].className}`}
              data-aos="fade-up"
              style={{
                animation: `linear ${stylesByCard[i].animationName}`,
                animationTimeline: "view()",
              }}
              onDoubleClick={() => {
                scrollRef.current[i]?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="">{i + 1}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className={`h-[100vh] bg-gray-500`} data-aos="fade-up">
        <div className="">{5}</div>
      </div>
    </div>
  );
}
