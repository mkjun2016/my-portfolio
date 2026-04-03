import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Sparkles,
  Code2,
  FlaskConical,
  Layers,
  Cpu,
  Search,
  Satellite,
} from "lucide-react";

/**
 * Mastra.ai-inspired portfolio landing page (dark, bold headline, subtle grid, glossy cards).
 * Drop this into a Next.js page (app/page.tsx) or any React app with Tailwind.
 */

interface SectionProps {
  id: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}

interface PillProps {
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

type YutSide = "front" | "back";

interface YutThrowResult {
  sticks: YutSide[];
  name: "Do" | "Gae" | "Geol" | "Yut" | "Mo" | "Back Do";
  score: number;
  layout: Array<{
    x: number;
    y: number;
    rotate: number;
    scale: number;
  }>;
}

const TAGS = [
  "XR",
  "Computer Vision",
  "Unity",
  "TypeScript",
  "Python",
  "FastAPI",
  "React",
  "Vision Pro",
];

const HERO_TITLE_LINE_1 = "Build impactful systems";
const HERO_TITLE_LINE_2 = "from idea to shipped demo.";

const makeBinaryLine = (length: number) =>
  Array.from({ length }, () => (Math.random() < 0.5 ? "0" : "1")).join("");

const scrambleToBinary = (target: string, revealProgress: number) =>
  target
    .split("")
    .map((ch) => {
      if (ch === " ") return " ";
      if (ch === "." || ch === ",") return ch;
      if (Math.random() < revealProgress) return ch;
      return Math.random() < 0.5 ? "0" : "1";
    })
    .join("");

const Section = ({ id, title, kicker, children }: SectionProps) => (
  <section id={id} className="scroll-mt-24 py-16">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-8">
        {kicker && (
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{kicker}</span>
          </div>
        )}
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </div>
  </section>
);

const Pill = ({ children }: PillProps) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
    {children}
  </span>
);

const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={
      "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_80px_rgba(0,0,0,0.65)] " +
      className
    }
  >
    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
    </div>
    <div className="relative p-6">{children}</div>
  </div>
);

const NavLink = ({ href, children }: NavLinkProps) => (
  <a
    href={href}
    className="rounded-full px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
  >
    {children}
  </a>
);

export default function MastraStylePortfolio() {
  const [query, setQuery] = useState("");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [yutResult, setYutResult] = useState<YutThrowResult | null>(null);
  const [throwCount, setThrowCount] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [introFading, setIntroFading] = useState(false);
  const [heroTitleDone, setHeroTitleDone] = useState(false);
  const [heroScrambleProgress, setHeroScrambleProgress] = useState(0);
  const [heroTitleLine1, setHeroTitleLine1] = useState(() =>
    scrambleToBinary(HERO_TITLE_LINE_1, 0),
  );
  const [heroTitleLine2, setHeroTitleLine2] = useState(() =>
    scrambleToBinary(HERO_TITLE_LINE_2, 0),
  );
  const [binaryLines] = useState(() =>
    Array.from({ length: 14 }, () => makeBinaryLine(64)),
  );
  const profileImageSrc = `${import.meta.env.BASE_URL}profile.jpeg`;

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIntroFading(true), 2400);
    const hideTimer = setTimeout(() => setShowIntro(false), 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (showIntro) return;

    const duration = 3000;
    const tick = 70;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += tick;
      const progress = Math.min(elapsed / duration, 1);
      setHeroScrambleProgress(progress);

      setHeroTitleLine1(scrambleToBinary(HERO_TITLE_LINE_1, progress));
      setHeroTitleLine2(scrambleToBinary(HERO_TITLE_LINE_2, progress));

      if (progress >= 1) {
        clearInterval(timer);
        setHeroTitleLine1(HERO_TITLE_LINE_1);
        setHeroTitleLine2(HERO_TITLE_LINE_2);
        setHeroScrambleProgress(1);
        setHeroTitleDone(true);
      }
    }, tick);

    return () => clearInterval(timer);
  }, [showIntro]);

  const defaultYutLayout = [
    { x: 35, y: 36, rotate: -34, scale: 1 },
    { x: 44, y: 62, rotate: 18, scale: 1 },
    { x: 60, y: 60, rotate: 26, scale: 1 },
    { x: 68, y: 38, rotate: -20, scale: 1 },
  ];

  const throwYut = () => {
    // Stick index 0 is treated as the marked stick used for Back Do.
    const sticks: YutSide[] = Array.from({ length: 4 }, () =>
      Math.random() < 0.5 ? "front" : "back",
    );
    const frontCount = sticks.filter((side) => side === "front").length;
    const isBackDo = frontCount === 1 && sticks[0] === "back";

    let name: YutThrowResult["name"] = "Do";
    if (frontCount === 0) name = "Mo";
    if (frontCount === 1) name = isBackDo ? "Back Do" : "Do";
    if (frontCount === 2) name = "Gae";
    if (frontCount === 3) name = "Geol";
    if (frontCount === 4) name = "Yut";

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    // Spread sticks to random directions while keeping each one inside the board.
    const baseAngle = Math.random() * 360;
    const sectorOrder = [0, 90, 180, 270].sort(() => Math.random() - 0.5);
    const layout = sectorOrder.map((sectorAngle) => {
      const angleDeg = baseAngle + sectorAngle + (-20 + Math.random() * 40);
      const angleRad = (angleDeg * Math.PI) / 180;
      const radius = 12 + Math.random() * 10;
      const offsetX = Math.cos(angleRad) * radius;
      const offsetY = Math.sin(angleRad) * radius * 0.65;

      return {
        x: clamp(50 + offsetX, 28, 72),
        y: clamp(50 + offsetY, 10, 30),
        rotate: -58 + Math.random() * 116,
        scale: 0.95 + Math.random() * 0.12,
      };
    });

    setYutResult({
      sticks,
      name,
      score: isBackDo ? -1 : frontCount === 0 ? 5 : frontCount,
      layout,
    });
    setThrowCount((prev) => prev + 1);
  };

  // ===== Customize these =====
  const profile = {
    name: "Moonkyu (Kevin) Jun",
    title: "Computer Science @ Stony Brook • XR + Computer Vision Builder",
    tagline:
      "B.S. in Computer Science (Minor in Industrial Engineering) • Stony Brook University",
    location: "Stony Brook, NY",
    links: {
      github: "https://github.com/mkjun2016",
      blog: "https://velog.io/@mkjun2022/posts",
      linkedin: "https://www.linkedin.com/in/mkjunkevin",
      email: "mailto:moonkyu.jun@stonybrook.edu",
      resume:
        "https://drive.google.com/file/d/1lPvVYdwD3CBrGHX4_Wk_4db6Fi_SEFYS/view?usp=sharing",
    },
  };

  const skills = {
    languages: ["Python", "C/C++", "JavaScript", "TypeScript"],
    mlcv: ["PyTorch", "YOLOv8", "Applied Computer Vision Pipelines"],
    platforms: ["Docker", "FastAPI", "MongoDB", "React.js", "React Native"],
    xr: ["Unity", "Real-time Rendering", "Interactive 3D Systems"],
  };

  const highlights = [
    {
      icon: <Layers className="h-5 w-5" />,
      title: "XR volumetric visualization",
      body: "Built interactive OCT volume rendering prototypes with custom shaders and gaze/pinch interactions.",
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "Computer vision systems",
      body: "Shipped inspection/analysis features across frontend + backend, focusing on performance and reliability.",
    },
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "Product-minded engineering",
      body: "I like turning messy ideas into clean UX with measurable outcomes and iteration loops.",
    },
  ];

  const projects = [
    {
      title: "XR / OCT Volumetric Viewer",
      desc: "Built an XR visualization system for volumetric OCT data using Unity, enabling real-time gaze-driven interaction and volumetric slicing. Designed data pipelines bridging raw 3D medical imaging data and interactive visualization, improving rendering performance and enabling real-time interaction with high-resolution volumes.",
      tags: ["Unity", "XR", "Real-time Rendering", "OCT", "3D Systems"],
      icon: <Layers className="h-8 w-8 text-white/80" />,
      href: "#",
      featured: true,
      date: "Oct 2025 – Apr 2026",
      links: {
        github: "#",
        demo: "#",
        paper: "#",
      },
    },
    {
      title: "Edge-Optimized CCTV Analytics System",
      desc: "Designed an edge-based video analytics pipeline for real-time object detection, focusing on reducing inference latency under constrained network environments. Implemented computer vision models and system-level optimizations to reduce bandwidth usage and improve end-to-end responsiveness by analyzing trade-offs between edge and server-side inference.",
      tags: ["PyTorch", "YOLOv8", "Edge Computing", "Computer Vision"],
      icon: <Search className="h-8 w-8 text-white/80" />,
      href: "#",
      featured: true,
      date: "June 2025",
      links: {
        github: "https://github.com/mkjun2016/edge-opt-cctv.git",
      },
    },
    {
      title: "EmoAI – Emotion-Aware Translation System",
      desc: "Developed an AI-powered emotion-aware translation system that analyzes speaker tone and emotional context to generate real-time, contextually aligned translations. Combines speech recognition with emotion analysis to provide emotionally-intelligent language translation.",
      tags: ["AI", "NLP", "Emotion Recognition", "Translation"],
      icon: <Cpu className="h-8 w-8 text-white/80" />,
      href: "#",
      featured: true,
      date: "June 2025",
      links: {
        github: "https://github.com/EmoAI-Translator/EmoAI-Translator.git",
      },
    },
    {
      title: "VisionQuant - Satellite-based Quantitative Analysis",
      desc: "Built VisionQuant, a satellite-based alternative data pipeline using YOLOv11 object detection on Sentinel-2 satellite imagery to quantify cargo activity at Memphis FedEx Hub and Louisville UPS Hub. FDX satellite strategy returned +24.6% vs SPY +18.3%. UPS correlation: r=0.443, p<0.001.",
      tags: [
        "AI",
        "Computer Vision",
        "Satellite Imagery",
        "Quantitative Analysis",
      ],
      icon: <Satellite className="h-8 w-8 text-white/80" />,
      href: "#",
      featured: true,
      date: "Mar 2026",
      links: {
        github: "https://github.com/mkjun2016/VisionQuant-Datathon.git",
      },
    },
  ];

  const experience = [
    {
      role: "Undergraduate Research Assistant",
      org: "Center for Visual Computing, Stony Brook University",
      location: "Stony Brook, NY",
      period: "Oct 2025 – Apr 2026",
      bullets: [
        "Built an XR visualization system for volumetric OCT data using Unity, enabling real-time gaze-driven interaction and volumetric slicing, reducing manual data curation for researchers",
        "Designed data pipelines bridging raw 3D medical imaging data and interactive visualization, improving rendering performance and enabling real-time interaction with high-resolution volumes",
      ],
    },
    {
      role: "Full Stack Developer Intern",
      org: "MarkCloud Co., Ltd.",
      location: "Seoul, Korea",
      period: "Apr 2025 – June 2025",
      bullets: [
        "Developed an AI-powered defect analysis interface using React.js and YOLOv8, enabling real-time visual QA and improving defect detection efficiency for automotive inspection workflows",
        "Led backend system design using FastAPI and MongoDB for an OCR-based ad compliance platform in collaboration with Industrial Bank of Korea, supporting enterprise-scale data processing and regulatory validation",
        "Built enterprise-grade groupware and containerized services using Docker, supporting MSA-based deployment and improving system scalability and maintainability",
      ],
    },
    {
      role: "Frontend Developer Intern",
      org: "J&J Tech Inc.",
      location: "Incheon, Korea",
      period: "July 2023 – Sep 2023",
      bullets: [
        'Developed and launched "YakManager Global," a cross-platform pharmacy app using React Native, scaling to 50K+ global users with high performance and reliability',
        "Built scalable UI/UX components with multi-language support and API integrations, improving responsiveness and usability across iOS and Android platforms",
        "Led overseas usability testing, identified latency issues caused by Naver Cloud infrastructure, and proposed AWS migration to improve international performance and scalability",
      ],
    },
  ];

  const filteredProjects = query.trim()
    ? projects.filter((p) =>
        [p.title, p.desc, ...(p.tags || [])].some((s) =>
          String(s).toLowerCase().includes(query.trim().toLowerCase()),
        ),
      )
    : projects;

  const visibleProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, 3);
  const hasMoreProjects = filteredProjects.length > 3;

  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      {/* Background: subtle grid + vignette */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.8)_80%)]" />
      </div>

      {showIntro && (
        <div
          className={`fixed inset-0 z-[90] flex items-center justify-center bg-[#040407]/95 transition-opacity duration-700 ${
            introFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative mx-auto w-[92%] max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/50 px-6 py-8 backdrop-blur md:px-10 md:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:22px_22px] opacity-40" />
            <div className="relative space-y-2 font-mono text-[10px] leading-relaxed text-emerald-300/70 md:text-xs">
              {binaryLines.map((line, idx) => (
                <motion.div
                  key={`${line}-${idx}`}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: idx * 0.045 }}
                  className="whitespace-nowrap"
                >
                  {line}
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="relative mt-6 flex items-center gap-2 font-mono text-sm text-white/85"
            >
              <span>system.boot("portfolio")</span>
              <span className="h-4 w-[2px] animate-pulse bg-white/70" />
            </motion.div>
          </div>
        </div>
      )}

      <div
        className={`transition-opacity duration-700 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Top Nav */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07070a]/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a
              href="#"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-white/90">{profile.name}</span>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={profile.links.github}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href={profile.links.blog}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Blog</span>
              </a>
              <a
                href={profile.links.resume}
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-black transition hover:opacity-90"
              >
                <span>Resume</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <main className="relative">
          <div className="mx-auto max-w-6xl px-6">
            <div className="py-16 md:py-20">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-6 md:gap-8"
              >
                <motion.img
                  src={profileImageSrc}
                  alt="Profile"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-48 w-48 md:h-64 md:w-64 mx-auto md:mx-0 rounded-3xl border-2 border-white/20 bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.15)] object-cover"
                />

                <div className="flex flex-1 flex-col gap-6">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                    <span>
                      {heroTitleDone
                        ? profile.location
                        : scrambleToBinary(
                            profile.location,
                            heroScrambleProgress,
                          )}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="hidden sm:inline">
                      {heroTitleDone
                        ? "Open to research + internships"
                        : scrambleToBinary(
                            "Open to research + internships",
                            heroScrambleProgress,
                          )}
                    </span>
                  </div>

                  {heroTitleDone ? (
                    <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                      Build <span className="text-white/60">impactful</span>{" "}
                      systems
                      <br />
                      <span className="bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent">
                        from idea to shipped demo.
                      </span>
                    </h1>
                  ) : (
                    <h1 className="font-mono text-balance text-4xl font-semibold tracking-tight text-white/90 md:text-6xl">
                      {heroTitleLine1}
                      <br />
                      <span className="text-white/70">{heroTitleLine2}</span>
                    </h1>
                  )}

                  <p className="max-w-2xl text-pretty text-base text-white/70 md:text-lg">
                    {heroTitleDone
                      ? "I’m a CS student focused on XR + computer vision. I like clean UX, measurable loops, and prototypes that survive real usage."
                      : scrambleToBinary(
                          "I’m a CS student focused on XR + computer vision. I like clean UX, measurable loops, and prototypes that survive real usage.",
                          heroScrambleProgress,
                        )}
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-sm text-white/80">
                      {heroTitleDone
                        ? profile.tagline
                        : scrambleToBinary(
                            profile.tagline,
                            heroScrambleProgress,
                          )}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {TAGS.map((t) => (
                      <Pill key={t}>
                        {heroTitleDone
                          ? t
                          : scrambleToBinary(t, heroScrambleProgress)}
                      </Pill>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#projects"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                    >
                      {heroTitleDone
                        ? "View Projects"
                        : scrambleToBinary(
                            "View Projects",
                            heroScrambleProgress,
                          )}{" "}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={profile.links.email}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                    >
                      {heroTitleDone
                        ? "Email me"
                        : scrambleToBinary(
                            "Email me",
                            heroScrambleProgress,
                          )}{" "}
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {highlights.map((h) => (
                  <Card key={h.title}>
                    <div className="flex items-start gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        {h.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{h.title}</div>
                        <div className="mt-1 text-sm text-white/70">
                          {h.body}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Projects */}
          <Section
            id="projects"
            title="Selected Projects"
            kicker="Featured work & research"
          >
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-white/60">
                Search projects by keyword (title, description, tags).
              </div>
              <div className="relative w-full md:w-96">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowAllProjects(false);
                  }}
                  placeholder="Search…"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20"
                />
              </div>
            </div>

            <div className="space-y-6">
              {visibleProjects.map((p, idx) => (
                <Card key={`${p.title}-${idx}`} className="group/project">
                  <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                    {/* Project Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 md:h-44 md:w-56">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {p.featured ? (
                            <div className="flex flex-col items-center gap-3">
                              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                                {p.icon ?? (
                                  <Code2 className="h-8 w-8 text-white/80" />
                                )}
                              </div>
                              <div className="text-xs text-white/50">
                                Featured Project
                              </div>
                            </div>
                          ) : (
                            <Code2 className="h-12 w-12 text-white/40" />
                          )}
                        </div>
                        {p.featured && (
                          <div className="absolute right-2 top-2">
                            <div className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/80 backdrop-blur">
                              ⭐ Featured
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-white group-hover/project:text-white/90">
                              {p.title}
                            </h3>
                            <span className="text-sm text-white/40">
                              {p.date}
                            </span>
                          </div>
                          <p className="mt-3 text-base leading-relaxed text-white/70">
                            {p.desc}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t: string) => (
                          <Pill key={t}>{t}</Pill>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        {p.links.github && (
                          <a
                            href={p.links.github}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
                          >
                            <Github className="h-4 w-4" />
                            <span>Code</span>
                          </a>
                        )}
                        {p.links.demo && (
                          <a
                            href={p.links.demo}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Demo</span>
                          </a>
                        )}
                        {"paper" in p.links && p.links.paper && (
                          <a
                            href={p.links.paper}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
                          >
                            <FlaskConical className="h-4 w-4" />
                            <span>Paper</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {hasMoreProjects && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllProjects((prev) => !prev)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                >
                  {showAllProjects ? "Show less" : "Show more"}
                </button>
              </div>
            )}

            {filteredProjects.length === 0 && (
              <div className="py-12 text-center text-white/50">
                No projects found matching "{query}"
              </div>
            )}
          </Section>

          {/* Skills */}
          <Section
            id="skills"
            title="Technical Skills"
            kicker="Tools & technologies"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <div className="flex items-start gap-3">
                  <Code2 className="h-5 w-5 text-white/80" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">Languages</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skills.languages.map((lang) => (
                        <Pill key={lang}>{lang}</Pill>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-3">
                  <Cpu className="h-5 w-5 text-white/80" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">ML/CV</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skills.mlcv.map((tech) => (
                        <Pill key={tech}>{tech}</Pill>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-3">
                  <Layers className="h-5 w-5 text-white/80" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">Platforms</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skills.platforms.map((platform) => (
                        <Pill key={platform}>{platform}</Pill>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-3">
                  <FlaskConical className="h-5 w-5 text-white/80" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">
                      Visualization/XR
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skills.xr.map((xr) => (
                        <Pill key={xr}>{xr}</Pill>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Section>

          {/* Experience */}
          <Section
            id="experience"
            title="Experience"
            kicker="Things I’ve done that I can prove"
          >
            <div className="grid gap-4">
              {experience.map((e) => (
                <Card key={e.role + e.org}>
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="text-base font-semibold">{e.role}</div>
                      <div className="mt-1 text-sm text-white/70">{e.org}</div>
                      {e.location && (
                        <div className="text-sm text-white/50">
                          {e.location}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-white/50">{e.period}</div>
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
                    {e.bullets.map((b: string) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Section>

          {/* Contact */}
          <Section
            id="contact"
            title="Contact"
            kicker="Let’s build something useful"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-2">
                <div className="text-sm text-white/70">
                  The fastest way to reach me is email. If you’re contacting
                  about research/internship, include: (1) what you’re building,
                  (2) timeline, (3) what success looks like.
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={profile.links.email}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    Email <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                  >
                    LinkedIn <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </Card>

              <Card>
                <div className="text-sm font-semibold">Quick links</div>
                <div className="mt-4 space-y-2">
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Github className="h-4 w-4" /> GitHub
                    </span>
                    <ExternalLink className="h-4 w-4 text-white/40" />
                  </a>
                  <a
                    href={profile.links.resume}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
                  >
                    <span className="inline-flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" /> Resume
                    </span>
                    <ExternalLink className="h-4 w-4 text-white/40" />
                  </a>
                </div>

                <div className="mt-6 text-xs text-white/50">
                  © {new Date().getFullYear()} {profile.name}
                </div>
              </Card>
            </div>
          </Section>

          {/* Yutnori mini game */}
          <Section
            id="yutnori"
            title="Quick Yut Toss"
            kicker="Play Traditional Korean Game!"
          >
            <div className="mx-auto max-w-3xl">
              <Card>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-white/70">
                      Toss the sticks and see how they land. Marked stick
                      enables Back Do.
                    </p>
                    <button
                      type="button"
                      onClick={throwYut}
                      className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                    >
                      Throw Yut
                    </button>
                  </div>

                  <div className="relative h-72 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:30px_30px] opacity-25" />
                    {(
                      yutResult?.sticks ??
                      Array.from({ length: 4 }, () => "back")
                    ).map((side, index) => {
                      const isFront = side === "front";
                      const isMarkedStick = index === 0;
                      const layout =
                        yutResult?.layout[index] ?? defaultYutLayout[index];

                      return (
                        <motion.div
                          key={`${throwCount}-${index}`}
                          initial={{
                            left: "50%",
                            top: "50%",
                            rotate: 0,
                            scale: 0.8,
                            opacity: 0,
                          }}
                          animate={{
                            left: `${layout.x}%`,
                            top: `${layout.y}%`,
                            rotate: layout.rotate,
                            scale: layout.scale,
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.55,
                            delay: index * 0.06,
                            type: "spring",
                            stiffness: 170,
                            damping: 14,
                          }}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{ zIndex: index + 1 }}
                        >
                          <div
                            className={`relative h-36 w-11 rounded-[999px] border shadow-[0_14px_24px_rgba(0,0,0,0.45)] sm:h-40 sm:w-12 ${
                              isFront
                                ? "border-[#8a5a2a]/80 bg-gradient-to-b from-[#d6b785] via-[#b98a55] to-[#7a4e26]"
                                : "border-[#c8b487]/80 bg-gradient-to-b from-[#f0e2bd] via-[#e7d7af] to-[#cfbb8d]"
                            }`}
                          >
                            <div className="pointer-events-none absolute inset-x-[18%] top-3 h-[1px] bg-white/35" />
                            <div className="pointer-events-none absolute inset-x-[22%] bottom-3 h-[1px] bg-black/25" />

                            {isFront ? (
                              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                                {Array.from({ length: 3 }).map(
                                  (_, markIndex) => (
                                    <div
                                      key={markIndex}
                                      className="relative h-4 w-4 opacity-85"
                                    >
                                      <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#4f3017]" />
                                      <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#4f3017]" />
                                    </div>
                                  ),
                                )}
                              </div>
                            ) : (
                              <div className="pointer-events-none absolute inset-0 opacity-60">
                                <span className="absolute left-[30%] top-[22%] h-[1px] w-7 rotate-6 bg-[#b59766]/75" />
                                <span className="absolute left-[22%] top-[38%] h-[1px] w-8 -rotate-3 bg-[#b59766]/75" />
                                <span className="absolute left-[28%] top-[54%] h-[1px] w-6 rotate-12 bg-[#b59766]/75" />
                                <span className="absolute left-[26%] top-[70%] h-[1px] w-8 -rotate-8 bg-[#b59766]/75" />
                              </div>
                            )}

                            {isMarkedStick && (
                              <div className="absolute right-1 top-1 rounded-full border border-black/20 bg-black/25 px-1.5 py-0.5 text-[10px] font-semibold text-white/90">
                                M
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}

                    {!yutResult && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white/70">
                        Click Throw Yut to toss
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    {yutResult ? (
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="text-white/60">Result</span>
                        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-semibold text-white">
                          {yutResult.name}
                        </span>
                        <span className="text-white/60">Score</span>
                        <span className="font-semibold text-white/90">
                          {yutResult.score}
                        </span>
                        <span className="text-white/40">|</span>
                        <span className="text-white/60">
                          {yutResult.sticks.map((side, idx) => (
                            <span
                              key={`${side}-${idx}`}
                              className="mr-2 inline-block"
                            >
                              S{idx + 1}:{side === "front" ? "F" : "B"}
                              {idx === 0 ? "*" : ""}
                            </span>
                          ))}
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-white/50">
                        No throw yet. Press "Throw Yut".
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </Section>

          {/* Footer */}
          <footer className="border-t border-white/10 py-10">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs text-white/50">
              <span>Built with React + Tailwind.</span>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-white/80">
                  Top
                </a>
                <a
                  href={profile.links.email}
                  className="inline-flex items-center gap-1 hover:text-white/80"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
