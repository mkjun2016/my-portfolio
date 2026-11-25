import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  Award,
  Briefcase,
  FileText,
  FlaskConical,
  FolderGit2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Megaphone,
  Menu,
  Moon,
  PenLine,
  Sun,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import NeuralNet from "./components/NeuralNet";
import {
  awards,
  education,
  experience,
  news,
  profile,
  projects,
  research,
  type Entry,
} from "./data";

// Page order: the active-section highlight relies on it.
const NAV = [
  { id: "about", label: "About" },
  { id: "news", label: "News" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
];

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- hooks ---------- */

function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    setTheme(next);
  };
  return { theme, toggle };
}

/** Highlights the nav item of the section currently under the top bar. */
function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 4;
      let current = "";
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(atBottom ? NAV[NAV.length - 1].id : current);
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
    };
  }, []);
  return active;
}

/** Fades `[data-reveal]` elements up into place as they enter the viewport. */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("risen");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- small components ---------- */

function Typed({ text }: { text: string }) {
  const [shown, setShown] = useState(() => (reducedMotion() ? text : ""));
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reducedMotion()) return;
    let i = 0;
    let timer = 0;
    const type = () => {
      setTyping(true);
      i += 1;
      setShown(text.slice(0, i));
      if (i < text.length) {
        timer = window.setTimeout(type, 85 * (0.6 + Math.random() * 0.9));
      } else {
        setTyping(false);
        timer = window.setTimeout(erase, 4000);
      }
    };
    const erase = () => {
      setTyping(true);
      i -= 1;
      setShown(text.slice(0, i));
      if (i > 0) {
        timer = window.setTimeout(erase, 40);
      } else {
        setTyping(false);
        timer = window.setTimeout(type, 700);
      }
    };
    timer = window.setTimeout(type, 600);
    return () => window.clearTimeout(timer);
  }, [text]);

  return (
    <p className="mb-2.5 font-mono text-[13px] font-medium tracking-[0.02em] text-accent">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        <span className="text-muted">&gt; </span>
        {shown}
        <span className={`caret ${typing ? "" : "blink"}`} />
      </span>
    </p>
  );
}

interface ChipProps {
  href: string;
  icon: LucideIcon;
  label: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

function Chip({ href, icon: Icon, label, onClick }: ChipProps) {
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        title={label}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="inline-flex h-11 w-11 items-center justify-center gap-[7px] rounded-full border border-line bg-surface text-sm font-medium text-fg transition hover:-translate-y-0.5 hover:border-accent hover:text-accent md:h-auto md:w-auto md:px-[15px] md:py-2"
      >
        <Icon className="h-[19px] w-[19px] md:h-4 md:w-4" strokeWidth={1.8} aria-hidden="true" />
        <span className="sr-only md:not-sr-only md:whitespace-nowrap">{label}</span>
      </a>
    </li>
  );
}

function Section({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-9">
      <h2
        data-reveal
        className="mb-[22px] flex items-center gap-3 text-[21px] font-bold tracking-[-0.02em]"
      >
        <span
          aria-hidden="true"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-accent-soft text-accent"
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Tile({ item }: { item: Entry }) {
  const base =
    "grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[10px] border border-line sm:h-16 sm:w-16 sm:rounded-xl";
  if (item.logo) {
    return (
      <div className={`${base} bg-white p-1.5`}>
        <img src={asset(item.logo)} alt="" loading="lazy" className="h-full w-full object-contain" />
      </div>
    );
  }
  if (item.icon) {
    const Icon = item.icon;
    return (
      <div className={`${base} bg-accent-soft text-accent`}>
        <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`${base} bg-surface-solid font-mono text-[12px] font-bold tracking-tight text-accent sm:text-[13px]`}
    >
      {item.mark}
    </div>
  );
}

function EntryList({ items }: { items: Entry[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item, i) => (
        <div key={item.title} data-reveal style={{ transitionDelay: `${Math.min(i, 4) * 70}ms` }}>
          <article className="entry flex items-start gap-3.5 rounded-[14px] border border-transparent px-1 py-3.5 sm:gap-5 sm:p-[18px]">
            <Tile item={item} />
            <div className="min-w-0 flex-1 leading-[1.55]">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-base font-bold leading-[1.45] tracking-[-0.01em]">{item.title}</h3>
                {item.date && (
                  <span className="shrink-0 text-sm tabular-nums text-muted sm:whitespace-nowrap">
                    {item.date}
                  </span>
                )}
              </div>
              {item.role && <p className="mt-0.5 font-medium text-accent">{item.role}</p>}
              {item.sub && <p className="text-[14.5px] text-muted">{item.sub}</p>}
              {item.desc && <p className="mt-1 max-w-[64ch] text-[14.5px]">{item.desc}</p>}
              {(item.badge || item.tags || item.href || item.poster) && (
                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  {item.badge && (
                    <span className="rounded-md bg-accent-soft px-2.5 py-0.5 text-[13.5px] font-semibold text-accent">
                      {item.badge}
                    </span>
                  )}
                  {item.tags && (
                    <span className="font-mono text-[12.5px] text-muted">{item.tags.join(" · ")}</span>
                  )}
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link inline-flex items-center gap-1 text-sm font-medium"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      Code
                    </a>
                  )}
                  {item.poster && (
                    <a
                      href={item.poster}
                      target="_blank"
                      rel="noreferrer"
                      className="link inline-flex items-center gap-1 text-sm font-medium"
                    >
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                      Poster
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}

/* ---------- page ---------- */

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const { theme, toggle: toggleTheme } = useTheme();
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<"" | "shown" | "hidden">("");
  const toastTimer = useRef(0);
  useReveal();

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Copy the address instead of relying on a configured mail app; modified clicks still open mailto.
  const copyEmail = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const openMail = () => {
      window.location.href = `mailto:${profile.email}`;
    };
    if (!navigator.clipboard || !window.isSecureContext) return openMail();
    navigator.clipboard.writeText(profile.email).then(() => {
      setToast("shown");
      window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast("hidden"), 4000);
    }, openMail);
  };

  const navLink = (id: string) =>
    `block rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors ${
      active === id ? "bg-accent-soft text-fg" : "text-muted hover:bg-accent-soft hover:text-fg"
    }`;

  return (
    <div className="relative isolate min-h-screen">
      <div aria-hidden="true" className="bg-grid" />
      <NeuralNet anchor={heroRef} />

      <header className="topbar sticky top-0 z-20 border-b border-line bg-[var(--topbar-bg)] backdrop-blur-md backdrop-saturate-[1.8]">
        <nav
          aria-label="Primary"
          className="relative mx-auto flex h-14 max-w-page items-center gap-4 px-[var(--gutter)]"
        >
          <a href="#top" className="shrink-0 font-mono text-base font-bold tracking-[-0.01em] text-fg">
            {profile.handle}
          </a>

          <ul className="ml-auto hidden gap-1 lg:flex">
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className={navLink(id)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-fg transition hover:-rotate-[15deg] hover:border-accent lg:ml-0"
          >
            {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((open) => !open);
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-fg transition hover:border-accent lg:hidden"
          >
            {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>

          {menuOpen && (
            <ul
              id="mobile-nav"
              className="absolute inset-x-0 top-full flex flex-col gap-0.5 border-b border-line bg-bg px-[var(--gutter)] pb-3.5 pt-2 shadow-[var(--shadow)] lg:hidden"
            >
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className={`${navLink(id)} !rounded-[10px] !px-3.5 !py-[11px] !text-[15px]`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-page px-[var(--gutter)]">
        {/* Hero */}
        <section
          ref={heroRef}
          className="grid items-center gap-6 pb-11 pt-10 text-center md:min-h-[440px] md:grid-cols-[minmax(0,1fr)_auto] md:gap-11 md:pt-[72px] md:text-left"
        >
          <div data-reveal>
            <Typed text={profile.eyebrow} />
            <h1 className="text-[clamp(32px,6vw,44px)] font-extrabold leading-[1.15] tracking-[-0.035em]">
              {profile.name}
            </h1>
            <ul className="mt-7 flex flex-wrap justify-center gap-2.5 md:justify-start md:gap-2">
              <Chip href={`mailto:${profile.email}`} icon={Mail} label="Email" onClick={copyEmail} />
              <Chip href={profile.links.resume} icon={FileText} label="Resume" />
              <Chip href={profile.links.linkedin} icon={Linkedin} label="LinkedIn" />
              <Chip href={profile.links.github} icon={Github} label="GitHub" />
              <Chip href={profile.links.blog} icon={PenLine} label="Blog" />
            </ul>
          </div>
          <div
            data-reveal
            className="hero-photo order-first mx-auto h-[150px] w-[150px] md:order-none md:mx-0 md:h-[200px] md:w-[200px]"
          >
            <img src={asset(profile.photo)} alt={`Portrait of ${profile.name}`} width={400} height={400} />
          </div>
        </section>

        <Section id="about" icon={User} title="About">
          <div className="max-w-[68ch] space-y-[0.9em]">
            <p data-reveal>
              I'm an undergraduate at{" "}
              <a className="link" href="https://www.stonybrook.edu/" target="_blank" rel="noreferrer">
                Stony Brook University
              </a>
              , majoring in Computer Science with a minor in Industrial Engineering, and I expect to
              graduate in August 2027. I work on computer vision and XR for medical imaging and
              robotics.
            </p>
            <p data-reveal>
              I'm currently an undergraduate research assistant at the Spatial Intelligence Lab, Stony
              Brook University, advised by Prof. Francois Rameau. Before that, I was a visiting research
              intern at the Artificial Medical Imaging Lab, Pusan National University, and an
              undergraduate researcher at the Computer Vision Lab and the Center for Visual Computing at
              Stony Brook, where I co-authored a paper on real-time XR volumetric medical imaging (under
              review for IEEE VR 2027).
            </p>
            <p data-reveal>Open to research and internship opportunities.</p>
          </div>
        </Section>

        <Section id="news" icon={Megaphone} title="News">
          <ul className="grid gap-1">
            {news.map(({ date, text }, i) => (
              <li
                key={date + text}
                data-reveal
                style={{ transitionDelay: `${Math.min(i, 4) * 70}ms` }}
                className="flex flex-col gap-1 py-1.5 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <time className="w-fit shrink-0 rounded-md bg-accent-soft px-2.5 py-0.5 text-[13px] font-semibold tabular-nums text-accent">
                  {date}
                </time>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="education" icon={GraduationCap} title="Education">
          <EntryList items={education} />
        </Section>

        <Section id="research" icon={FlaskConical} title="Research">
          <EntryList items={research} />
        </Section>

        <Section id="experience" icon={Briefcase} title="Experience">
          <EntryList items={experience} />
        </Section>

        <Section id="projects" icon={FolderGit2} title="Projects">
          <EntryList items={projects} />
        </Section>

        <Section id="awards" icon={Award} title="Honors & Awards">
          <ul className="awards relative pl-[22px]">
            {awards.map(({ title, detail, date }, i) => (
              <li
                key={title}
                data-reveal
                style={{ transitionDelay: `${Math.min(i, 4) * 70}ms` }}
                className="relative py-2 leading-[1.55]"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <strong className="font-bold">{title}</strong>
                  {date && <span className="shrink-0 text-sm tabular-nums text-muted">{date}</span>}
                </div>
                <p className="text-[14.5px] text-muted">{detail}</p>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <footer className="mx-auto max-w-page px-[var(--gutter)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pb-10 pt-6 text-[13px] text-muted">
          <p>© {new Date().getFullYear()} Moonkyu Jun</p>
          <a href="#top" className="link">
            Back to top ↑
          </a>
        </div>
      </footer>

      <div role="status" aria-live="polite" className={`toast ${toast === "shown" ? "is-visible" : ""}`}>
        {toast && (
          <>
            Copied <strong>{profile.email}</strong> ·{" "}
            <a className="link" href={`mailto:${profile.email}`}>
              Open mail app
            </a>
          </>
        )}
      </div>
    </div>
  );
}
