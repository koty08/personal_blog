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

export const projects = [
  {
    title: "Koty's Blog (개인 블로그)",
    desc: ".MD 형식의 게시글을 온라인에서 생성할 수 있는, 개인 개발 경험을 담은 블로그 사이트",
    role: "풀스택 개발 · 디자인 · 배포 전반",
    tech: ["Next.js", "Tailwind CSS", "Tanstack Query", "Prisma"],
    gradient: "from-blue-500/10 to-violet-500/10 dark:from-blue-500/20 dark:to-violet-500/20",
    accent: "border-blue-500/25 dark:border-blue-400/35",
    link: "https://koty.dev",
    githubLink: "https://github.com/koty08/personal_blog",
  },
  {
    title: "부산대학교 SW프로젝트관리시스템 (OPUS)",
    desc: "400명 이상의 실 사용자를 보유한, 부산대학교 학생 프로젝트 관리·전시 플랫폼",
    role: "FE - 어드민 페이지 개발 · 코드 품질 개선",
    tech: ["React", "Tailwind CSS", "Tanstack Query", "Zustand"],
    gradient: "from-emerald-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:to-cyan-500/20",
    accent: "border-emerald-500/25 dark:border-emerald-400/35",
    link: "https://opus.pnu.app/",
    githubLink: "https://github.com/PNUops/opus-frontend",
  },
  {
    title: "KEEPER 동아리 홈페이지",
    desc: "동아리 회원들의 출석 처리 및 게시판 기능이 포함된 사이트",
    role: "BE - 게시판 · 출석부/게임 · 대외활동 수집",
    tech: ["MySQL", "Spring Boot", "Mybatis"],
    gradient: "from-red-500/10 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20",
    accent: "border-red-500/25 dark:border-red-400/35",
    link: "https://keeper.or.kr/",
    githubLink: "https://github.com/KEEPER31337/Homepage-Back",
  },
  {
    title: "부산대학교 학생 연결 플랫폼 - 유소더하",
    desc: "소모임/팀빌딩/위치기반 더치페이, 커뮤니티 및 채팅 기능이 포함된 플랫폼 모바일 앱",
    role: "회원가입/로그인 · 게시판 전반",
    tech: ["Flutter", "Firebase"],
    gradient: "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20",
    accent: "border-purple-500/25 dark:border-purple-400/35",
    githubLink: "https://github.com/koty08/PNU_4th_hackathon_USDH",
  },
];

export type AwardExperience = {
  type: "award" | "experience";
  date: string;
  title: string;
  link?: string;
};

export const awardExperiences: AwardExperience[] = [
  { type: "experience", date: "2025.09 ~ ing", title: "교내 개발 동아리 활동 - PNUops", link: "https://pnuops.github.io/pnu-ops/" },
  { type: "experience", date: "2025.03", title: "2025 정컴 바이브코딩 해커톤", link: "https://github.com/202155570/junvis_pnu" },
  { type: "experience", date: "2020.03 ~ 2023.06", title: "교내 보안 학술 동아리 활동 - KEEPER", link: "https://keeper.or.kr/" },
  {
    type: "experience",
    date: "2021.05 ~ 2021.09",
    title: "부산대학교 제4회 창의융합 소프트웨어 해커톤",
    link: "https://github.com/koty08/PNU_4th_hackathon_USDH",
  },
  { type: "award", date: "2020.11", title: "제6회 정보보안 온라인 경진대회 우수상 수상" },
  { type: "award", date: "2020.11", title: "제5회 부산 ICT 융합 해커톤 최우수상 수상" },
  { type: "experience", date: "2020.07 ~ 2020.09", title: "부울경 화이트해커 양성사업 1기" },
];
