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

  // ===== Customize these =====
  const profile = {
    name: "Moonkyu (Kevin) Jun",
    title: "Computer Science @ Stony Brook • XR + Computer Vision Builder",
    location: "Stony Brook, NY",
    links: {
      github: "https://github.com/mkjun2016",
      linkedin: "https://www.linkedin.com/in/mkjunkevin",
      email: "mailto:moonkyu.jun@stonybrook.edu",
      resume: "#",
    },
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
      desc: "Volume rendering + interactive slicing/annotation prototypes for XR workflows.",
      tags: ["Unity", "XR", "Shaders", "OCT"],
      href: "#",
    },
    {
      title: "AI Defect Analysis Dashboard",
      desc: "React + CV pipeline to review detections, visualize results, and speed up QA decisions.",
      tags: ["React", "YOLO", "FastAPI", "Docker"],
      href: "#",
    },
    {
      title: "EmoAI-Translator",
      desc: "Multimodal app idea: speech + emotion signals → translated, context-aware output.",
      tags: ["Flutter", "Whisper", "DeepFace", "API"],
      href: "#",
    },
  ];

  const experience = [
    {
      role: "Undergraduate Research Assistant",
      org: "CVC Lab, Stony Brook University",
      period: "Oct 2025 – Present",
      bullets: [
        "Built XR visualization for volumetric OCT data; iterated on interaction + rendering stability.",
        "Prototyped tools (slicing, measurement, annotation) to accelerate researcher feedback loops.",
      ],
    },
    {
      role: "Frontend Developer Intern",
      org: "SME / Startup",
      period: "2024 – 2025",
      bullets: [
        "Shipped production UI features with React/TypeScript; improved workflows and reliability.",
        "Collaborated across engineering + stakeholders to refine requirements and deliver fast.",
      ],
    },
  ];

  const writing = [
    {
      title: "How I build demos that don’t break",
      desc: "A practical checklist for shipping reliable prototypes under tight deadlines.",
      href: "#",
    },
    {
      title: "From volume data to interactive XR",
      desc: "Notes on shaders, transfer functions, and interaction design for 3D medical data.",
      href: "#",
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
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#writing">Writing</NavLink>
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
              className="flex flex-col gap-6"
            >
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
          title="Projects"
          kicker="Selected work, shipped or shipping"
        >
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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

          <div className="grid gap-4 md:grid-cols-2">
            {filteredProjects.map((p) => (
              <Card key={p.title} className="h-full">
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold">{p.title}</div>
                      <p className="mt-2 text-sm text-white/70">{p.desc}</p>
                    </div>
                    <a
                      href={p.href}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
                    >
                      <span>Open</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t: string) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-white/50">
                    <FlaskConical className="h-3.5 w-3.5" />
                    <span>Design → build → test → iterate</span>
                  </div>
                </div>
              </Card>
            ))}
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

        {/* Writing */}
        <Section
          id="writing"
          title="Writing"
          kicker="Notes, checklists, and breakdowns"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {writing.map((w) => (
              <Card key={w.title}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold">{w.title}</div>
                    <div className="mt-2 text-sm text-white/70">{w.desc}</div>
                  </div>
                  <a
                    href={w.href}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
                  >
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
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
