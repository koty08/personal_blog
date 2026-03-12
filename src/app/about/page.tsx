"use client";

import "./about.css";
import { useRef, useEffect } from "react";
import { MoveDown, Briefcase, Trophy, Code2, User, FolderOpen, ExternalLink, GraduationCap, Mail } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTypewriter } from "@/hooks/useTypewriter";
import SectionCard from "@/components/about/SectionCard";
import { skillCategories, allSkills, careers, projects, awardExperiences, heroDesc, heroTitle, profile } from "@/consts/about";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const hoverLift: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.06, y: -4, transition: { type: "spring", stiffness: 320, damping: 18 } },
};

function AboutInner() {
  const heroRef = useRef<HTMLElement>(null);
  const dotGridRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);

  useLenis(() => {
    ScrollTrigger.update();
  });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 40, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 18 });
  const textX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const textY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  }

  const { displayed: typedTitle, done: typingDone } = useTypewriter(heroTitle, 68, 500);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.15,
        },
      });

      gsap.to(dotGridRef.current, {
        y: "38%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(heroContentRef.current, {
        y: -90,
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "35% top",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      gsap.to(".about-scroll-indicator", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "12% top",
          end: "28% top",
          scrub: 1,
        },
      });

      ScrollTrigger.batch(".about-reveal", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 64 },
            { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", overwrite: true }
          );
        },
        once: true,
        start: "top 88%",
      });

      const careerLines = gsap.utils.toArray<Element>(".about-career-line");
      if (careerLines.length > 0) {
        gsap.fromTo(
          careerLines,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-career-section",
              start: "top 65%",
              end: "bottom 45%",
              scrub: 1.5,
            },
          }
        );
      }

      gsap.utils.toArray<Element>(".about-project-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -90 : 90, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 87%", once: true },
          }
        );
      });

      if (marqueeRef.current) {
        marqueeTweenRef.current = gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 28,
          repeat: -1,
          ease: "linear",
        });
      }

      gsap.utils.toArray<Element>(".about-award-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={progressBarRef}
        className="from-primary/50 via-primary to-primary/50 fixed top-0 right-0 left-0 z-50 h-1.25 origin-left bg-linear-to-r"
        style={{ transform: "scaleX(0)" }}
      />
      <main>
        <section
          ref={heroRef}
          className="relative -mt-5 flex h-screen flex-col items-center justify-center overflow-hidden md:-mt-10"
          onMouseMove={onMouseMove}
        >
          <div
            ref={dotGridRef}
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,var(--muted-foreground)_1px,transparent_0)] mask-[linear-gradient(to_bottom,transparent_5%,white_75%)] bg-size-[45px_45px] opacity-30 [-webkit-mask-image:linear-gradient(to_bottom,transparent_5%,white_75%)]"
          />
          <div ref={heroContentRef} className="relative z-10 text-center">
            <motion.div style={{ x: textX, y: textY }} className="space-y-5 px-4">
              <h1 className="min-h-[1.2em] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {typedTitle}
                <motion.span
                  animate={{ opacity: typingDone ? [1, 0] : 1 }}
                  transition={typingDone ? { duration: 0.75, repeat: Infinity, repeatType: "reverse", ease: "linear" } : {}}
                  className="ml-0.5 inline-block font-extralight"
                >
                  |
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={typingDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-muted-foreground text-xl"
              >
                {heroDesc}
              </motion.p>
            </motion.div>
          </div>
          <div
            className={`about-scroll-indicator absolute bottom-10 z-10 transition-opacity duration-500 ${typingDone ? "opacity-100" : "opacity-0"}`}
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <MoveDown className="h-10 w-10" />
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto max-w-5xl space-y-24 px-4 py-20 md:px-6">
          <SectionCard icon={<User className="text-primary h-6 w-6" />} title="About Me">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex shrink-0 flex-col items-center gap-4 md:w-52 md:items-start">
                <div className="ring-primary/20 rounded-full ring-2 ring-offset-2 ring-offset-transparent">
                  <Image
                    src={`https://github.com/${profile.githubUsername}.png`}
                    alt={profile.name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xl font-bold">{profile.name}</p>
                  <p className="text-primary text-sm font-medium">{profile.role}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 text-sm">
                    <GraduationCap className="text-primary h-4 w-4 shrink-0" />
                    <span className="font-medium">
                      {profile.university.school} · {profile.university.major}
                    </span>
                  </div>
                  <p className="text-muted-foreground -mt-2 text-center text-xs md:text-left">{profile.university.period}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  <a
                    href={`https://github.com/${profile.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-primary/10 hover:border-primary/30 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                  >
                    <SiGithub className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:bg-primary/10 hover:border-primary/30 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </a>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <blockquote className="border-l-primary/40 text-muted-foreground border-l-2 pl-4 leading-relaxed italic">
                  {profile.quote}
                </blockquote>
                <div className="flex flex-col gap-6">
                  {profile.traits.map((trait) => {
                    const Icon = trait.icon;
                    return (
                      <div key={trait.label} className="flex gap-3">
                        <div className="bg-primary/10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                          <Icon className="text-primary h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{trait.label}</p>
                          <p className="text-muted-foreground mt-0.5 text-sm">{trait.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={<Code2 className="text-primary h-6 w-6" />} title="Skills">
            <div
              className="mb-8 cursor-default overflow-hidden py-2"
              onMouseEnter={() => marqueeTweenRef.current?.timeScale(0.15)}
              onMouseLeave={() => marqueeTweenRef.current?.timeScale(1)}
            >
              <div ref={marqueeRef} className="flex w-max gap-3">
                {[...allSkills, ...allSkills].map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <span
                      key={i}
                      className="bg-primary/8 border-primary/20 text-primary flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5">
              {Object.entries(skillCategories).map(([cat, items]) => (
                <div key={cat}>
                  <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">{cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <motion.div
                          key={skill.name}
                          variants={hoverLift}
                          initial="rest"
                          whileHover="hover"
                          className="bg-secondary/60 hover:bg-primary/10 hover:border-primary/25 flex cursor-default items-center gap-2 rounded-xl border border-transparent px-3.5 py-2 transition-colors"
                        >
                          <Icon className="text-primary/70 h-4 w-4 shrink-0" />
                          <span className="text-sm font-medium">{skill.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={<Briefcase className="text-primary h-6 w-6" />} title="Career">
            <div className="about-career-section space-y-0">
              {careers.map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="border-primary bg-background z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
                    />
                    {i < careers.length - 1 && <div className="about-career-line bg-border mt-2 w-px flex-1 origin-top" />}
                  </div>
                  <div className="pb-6">
                    <h3 className="text-xl font-bold">{item.role}</h3>
                    <p className="text-primary text-sm font-medium">{item.company}</p>
                    <p className="text-muted-foreground text-sm">{item.period}</p>
                    <p className="text-muted-foreground mt-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="space-y-4">
            <div className="about-reveal flex items-center gap-3">
              <div className="bg-primary/10 rounded-xl p-2">
                <FolderOpen className="text-primary h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            </div>

            {projects.map((p) => (
              <motion.div
                key={p.title}
                className={`about-project-card bg-linear-to-br ${p.gradient} bg-card/80 rounded-2xl border ${p.accent} p-6 shadow-sm backdrop-blur-sm`}
                variants={hoverLift}
                initial="rest"
                whileHover="hover"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-xl font-bold">{p.title}</h3>
                    <p className="text-muted-foreground text-sm">{p.desc}</p>
                  </div>
                  <ExternalLink className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="bg-background/70 rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <SectionCard icon={<Trophy className="text-primary h-6 w-6" />} title="Awards & Experience">
            <div className="space-y-4">
              {awardExperiences.map((award, i) => (
                <motion.div
                  key={i}
                  className="about-award-item border-l-primary/40 hover:border-l-primary flex gap-4 border-l-2 pl-4 transition-colors"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div>
                    <p className="font-semibold">{award.title}</p>
                    <p className="text-muted-foreground text-sm">{award.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>
        </div>
      </main>
    </>
  );
}

export default function About() {
  return (
    <ReactLenis root>
      <AboutInner />
    </ReactLenis>
  );
}
