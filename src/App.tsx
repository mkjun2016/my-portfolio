import { useState } from "react";
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
  const profileImageSrc = `${import.meta.env.BASE_URL}profile.jpeg`;

  // ===== Customize these =====
  const profile = {
    name: "Moonkyu (Kevin) Jun",
    title: "Computer Science @ Stony Brook • XR + Computer Vision Builder",
    tagline:
      "B.S. in Computer Science (Minor in Industrial Engineering) • Expected Aug 2027",
    location: "Stony Brook, NY",
    links: {
      github: "https://github.com/mkjun2016",
      linkedin: "https://www.linkedin.com/in/mkjunkevin",
      email: "mailto:moonkyu.jun@stonybrook.edu",
      resume:
        "https://drive.google.com/file/d/1lPvVYdwD3CBrGHX4_Wk_4db6Fi_SEFYS/view?usp=sharing",
    },
  };

  const education = {
    school: "Stony Brook University",
    degree: "B.S. in Computer Science",
    minor: "Minor in Industrial Engineering",
    graduation: "Expected Aug 2027",
    location: "Stony Brook, NY",
    coursework: [
      "Computer Vision",
      "System Fundamentals",
      "Analysis of Algorithms",
    ],
    honors: ["Dean's List"],
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
      href: "#",
      featured: true,
      date: "Oct 2025 – Present",
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
      href: "#",
      featured: true,
      date: "June 2025",
      links: {
        github: "https://github.com/EmoAI-Translator/EmoAI-Translator.git",
      },
    },
  ];

  const experience = [
    {
      role: "Undergraduate Research Assistant",
      org: "CVC Lab, Stony Brook University",
      location: "Stony Brook, NY",
      period: "Oct 2025 – Present",
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

      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07070a]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 text-sm font-semibold">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-white/90">{profile.name}</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#education">Education</NavLink>
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
                  <span>{profile.location}</span>
                  <span className="text-white/30">•</span>
                  <span className="hidden sm:inline">
                    Open to research + internships
                  </span>
                </div>

                <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                  Build <span className="text-white/60">impactful</span> systems
                  <br />
                  <span className="bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent">
                    from idea to shipped demo.
                  </span>
                </h1>

                <p className="max-w-2xl text-pretty text-base text-white/70 md:text-lg">
                  I’m a CS student focused on XR + computer vision. I like clean
                  UX, measurable loops, and prototypes that survive real usage.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-sm text-white/80">{profile.tagline}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {TAGS.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    View Projects <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={profile.links.email}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                  >
                    Email me <Mail className="h-4 w-4" />
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
                      <div className="mt-1 text-sm text-white/70">{h.body}</div>
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
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20"
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredProjects.map((p, idx) => (
              <Card key={p.title} className="group/project">
                <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                  {/* Project Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 md:h-44 md:w-56">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {p.featured ? (
                          <div className="flex flex-col items-center gap-3">
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                              {idx === 0 && (
                                <Layers className="h-8 w-8 text-white/80" />
                              )}
                              {idx === 1 && (
                                <Search className="h-8 w-8 text-white/80" />
                              )}
                              {idx === 2 && (
                                <Cpu className="h-8 w-8 text-white/80" />
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

          {filteredProjects.length === 0 && (
            <div className="py-12 text-center text-white/50">
              No projects found matching "{query}"
            </div>
          )}
        </Section>

        {/* Education */}
        <Section
          id="education"
          title="Education"
          kicker="Academic background & achievements"
        >
          <Card>
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {education.school}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">
                      {education.degree}
                    </p>
                    <p className="text-sm text-white/60">{education.minor}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-white/50">
                      Relevant Coursework
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {education.coursework.map((course) => (
                        <Pill key={course}>{course}</Pill>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-white/50">
                      Honors & Awards
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {education.honors.map((honor) => (
                        <span
                          key={honor}
                          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                        >
                          <span>🏆</span>
                          {honor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-right">
                <div className="text-sm font-semibold text-white/80">
                  {education.location}
                </div>
                <div className="text-sm text-white/60">
                  {education.graduation}
                </div>
              </div>
            </div>
          </Card>
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
                  <div className="text-sm font-semibold">Visualization/XR</div>
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
                      <div className="text-sm text-white/50">{e.location}</div>
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
                The fastest way to reach me is email. If you’re contacting about
                research/internship, include: (1) what you’re building, (2)
                timeline, (3) what success looks like.
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
  );
}
