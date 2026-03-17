import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiPrisma,
  SiDocker,
  IconType,
  SiTanstack,
  SiJavascript,
  SiReduxsaga,
  SiStyledcomponents,
  SiCodeceptjs,
  SiNginx,
  SiGithub,
  SiGitlab,
  SiWebpack,
  SiVite,
  SiJira,
  SiConfluence,
  SiExpress,
  SiBetterauth,
  SiSpringboot,
} from "@icons-pack/react-simple-icons";
import { Layers, Users, Zap, Shield } from "lucide-react";

export const heroTitle = "안녕하세요, FE 개발자 Koty입니다.";

export const heroDesc = "빠르게 변화하고 발전되는 기술들에 맞추어 다양하고 폭넓은 경험을 추구합니다.";

export const profile = {
  name: "고태영",
  role: "Frontend Developer",
  githubUsername: "koty08",
  email: "koty0833@gmail.com",
  university: {
    school: "부산대학교",
    major: "정보컴퓨터공학부",
    period: "2020.03 - 2027.02 (졸업 예정)",
  },
  quote: "협업의 가치를 믿고, 기술과 보안의 조화를 추구합니다.",
  traits: [
    {
      icon: Users,
      label: "협업 중심",
      desc: "개인의 성과보다 팀의 시너지를 우선하며, 원활한 소통을 통해 최선의 결과를 만들어냅니다.",
    },
    {
      icon: Zap,
      label: "유연한 학습자",
      desc: "급변하는 프론트엔드 기술 트렌드를 빠르게 습득하고 실무에 적용하는 도전을 즐깁니다.",
    },
    {
      icon: Shield,
      label: "보안 지향",
      desc: "사용자가 안심하고 사용할 수 있도록, 보안 지식을 바탕으로 탄탄하고 안전한 서비스를 설계합니다.",
    },
  ],
} as const;

export const projects = [
  {
    title: "개인 블로그",
    desc: "Next.js 기반의 풀스택 블로그",
    role: "풀스택 개발 · 디자인 · 배포 전반",
    tech: ["Next.js", "Tailwind CSS", "Prisma"],
    gradient: "from-blue-500/15 to-violet-500/15",
    accent: "border-blue-500/30",
  },
];

export const skillCategories: Record<
  string,
  {
    name: string;
    icon: IconType;
  }[]
> = {
  "Frontend Core": [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Javascript", icon: SiJavascript },
  ],
  "State Management": [
    { name: "Tanstack Query", icon: SiTanstack },
    { name: "Zustand", icon: Layers },
    { name: "Redux", icon: SiRedux },
    { name: "Redux Saga", icon: SiReduxsaga },
  ],
  Styling: [
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Styled Components", icon: SiStyledcomponents },
  ],
  "Testing & Building": [
    { name: "Playwright", icon: Layers },
    { name: "CodeceptJS", icon: SiCodeceptjs },
    { name: "Webpack", icon: SiWebpack },
    { name: "Vite", icon: SiVite },
  ],
  Collaboration: [
    { name: "GitHub", icon: SiGithub },
    { name: "GitLab", icon: SiGitlab },
    { name: "Jira", icon: SiJira },
    { name: "Confluence", icon: SiConfluence },
    { name: "Slack", icon: Layers },
  ],
  "Backend & Infra": [
    { name: "Express.js", icon: SiExpress },
    { name: "Prisma", icon: SiPrisma },
    { name: "Better Auth", icon: SiBetterauth },
    { name: "Spring Boot", icon: SiSpringboot },
    { name: "Docker", icon: SiDocker },
    { name: "Nginx", icon: SiNginx },
  ],
};

export const allSkills = Object.values(skillCategories).flat();

export const careers = [
  {
    role: "Frontend Developer",
    company: "AI Spera",
    period: "2022.08 - 2025.07",
    desc: "웹 애플리케이션 설계 및 개발",
  },
];

export const awardExperiences = [{ title: "2020 제 5회 부산 ICT 융합 해커톤", desc: "--" }];
