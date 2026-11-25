import { Hand, Languages, Satellite, ScanEye, type LucideIcon } from "lucide-react";

export interface Entry {
  title: string;
  date?: string;
  /** Accent line under the title (position, degree). */
  role?: string;
  /** Muted meta line (advisor, location, minor). */
  sub?: string;
  /** One-line description of the work. */
  desc?: string;
  badge?: string;
  tags?: string[];
  /** Repository or project link. */
  href?: string;
  /** Poster PDF link. */
  poster?: string;
  /** Short monogram shown in the logo tile when there is no logo image. */
  mark?: string;
  /** Logo image path inside /public, e.g. "logos/sbu.png". Overrides `mark`. */
  logo?: string;
  icon?: LucideIcon;
}

export const profile = {
  handle: "mkjun2004",
  name: "Moonkyu (Kevin) Jun",
  eyebrow: "Computer Vision · Physical AI · Medical Imaging",
  photo: "profile.jpeg",
  email: "moonkyu.jun@stonybrook.edu",
  links: {
    resume:
      "https://drive.google.com/file/d/1HjMgfU69ibfgoSwFOzx6b1t9hsaVwr0i/view?usp=sharing",
    linkedin: "https://www.linkedin.com/in/mkjunkevin",
    github: "https://github.com/mkjun2016",
    blog: "https://velog.io/@mkjun2022/posts",
  },
};

export const news: { date: string; text: string }[] = [
  {
    date: "2026.11",
    text: "Received the Dean's Award at the SUNY Korea 2026 Research Challenge for \"Ask, Don't Align\".",
  },
  {
    date: "2026.09",
    text: "Joined the Spatial Intelligence Lab at Stony Brook University as an undergraduate research assistant.",
  },
  {
    date: "2026.06",
    text: "Started a visiting research internship at the Artificial Medical Imaging Lab, Pusan National University.",
  },
];

export const education: Entry[] = [
  {
    title: "Stony Brook University",
    date: "Expected Aug 2027",
    role: "B.S. in Computer Science",
    sub: "Minor in Industrial Engineering · School of Engineering & Applied Science",
    desc: "Coursework: Intro to Data Science, System Fundamentals, Analysis of Algorithms, Theory of Computation",
    mark: "SBU",
  },
];

export const research: Entry[] = [
  {
    title: "Spatial Intelligence Lab @ Stony Brook University",
    date: "Sep 2026 – Present",
    role: "Undergraduate Research Assistant",
    sub: "Advised by Prof. Francois Rameau",
    desc: "Ask, Don't Align: robots exchange detector-verified text queries instead of aligning maps, matching map-sharing accuracy at 1/20 of the bytes.",
    badge: "Dean's Award · SUNY Korea 2026 Research Challenge",
    poster: "https://drive.google.com/file/d/1EQv9zJ8bk_JbdhoqDnPTHrOknpGRpgfV/view?usp=sharing",
    mark: "SIL",
  },
  {
    title: "Artificial Medical Imaging Lab @ Pusan National University",
    date: "Jun 2026 – Aug 2026",
    role: "Visiting Research Intern",
    sub: "Advised by Prof. Minwoo Kim",
    desc: "Lightweight deep learning models for real-time echocardiography dehazing.",
    mark: "PNU",
  },
  {
    title: "Computer Vision Lab @ Stony Brook University",
    date: "Mar 2026 – May 2026",
    role: "Undergraduate Research Assistant",
    sub: "Advised by Prof. Zhaozheng Yin",
    desc: "Confidence-aware semi-supervised framework for 3D retinal vessel segmentation from OCT volumes.",
    mark: "CVL",
  },
  {
    title: "Center for Visual Computing @ Stony Brook University",
    date: "Oct 2025 – Sep 2026",
    role: "Undergraduate Research Assistant",
    sub: "Advised by Prof. Arie E. Kaufman",
    desc: "XR system for volumetric OCT imaging in Unity with gaze-driven slicing and a GPU ray-casting pipeline running at real-time frame rates on consumer HMDs.",
    badge: "Co-authored paper under review · IEEE VR 2027",
    mark: "CVC",
  },
];

export const experience: Entry[] = [
  {
    title: "MarkCloud Co., Ltd.",
    date: "Apr 2025 – Jun 2025",
    role: "Full Stack Developer Intern",
    sub: "Seoul, Korea",
    desc: "Real-time YOLOv8 defect detection with a React dashboard for automotive visual inspection, and FastAPI + MongoDB services for an OCR ad-compliance platform with Industrial Bank of Korea.",
    mark: "MC",
  },
  {
    title: "J&J Tech Inc.",
    date: "Jul 2023 – Sep 2023",
    role: "Frontend Developer Intern",
    sub: "Incheon, Korea",
    desc: "Cross-platform pharmacy management app in React Native and TypeScript with shared logic across iOS and Android.",
    mark: "J&J",
  },
];

export const projects: Entry[] = [
  {
    title: "ReChord — Real-Time Hand-Gesture Rehab",
    date: "Apr 2026",
    desc: "Tracks 21 hand landmarks at 30+ fps with MediaPipe and recognizes chord shapes, with temporal filtering to suppress false positives.",
    badge: "CS Prize · SFM Healthcare Innovation Challenge",
    tags: ["MediaPipe", "Computer Vision", "Real-time"],
    href: "https://github.com/ReChord-GHRS/Rechord",
    icon: Hand,
  },
  {
    title: "VisionQuant — Satellite Alternative Data",
    date: "Feb 2026",
    desc: "Sentinel-2 + YOLOv11 pipeline counting cargo aircraft at FedEx/UPS hubs; found a 1-week leading signal for UPS (r = 0.443, p < 0.001) that outperformed SPY.",
    badge: "1st Place · SBU Datathon 2026",
    tags: ["Earth Engine", "YOLOv11", "Quant"],
    href: "https://github.com/mkjun2016/VisionQuant-Datathon",
    icon: Satellite,
  },
  {
    title: "Edge-Optimized CCTV Analytics",
    date: "Jun 2025",
    desc: "Edge video-analytics pipeline that cuts detection latency and bandwidth on constrained networks.",
    tags: ["PyTorch", "YOLOv8", "Edge Computing"],
    href: "https://github.com/mkjun2016/edge-opt-cctv",
    icon: ScanEye,
  },
  {
    title: "EmoAI — Emotion-Aware Translation",
    date: "Jun 2025",
    desc: "Real-time translation that carries the speaker's tone and emotional context.",
    badge: "2nd Place · WolfieTank 2025",
    tags: ["NLP", "Speech", "Emotion Recognition"],
    href: "https://github.com/EmoAI-Translator/EmoAI-Translator",
    icon: Languages,
  },
];

export const awards: { title: string; detail: string; date?: string }[] = [
  { title: "SUNY Korea 2026 Research Challenge", detail: "Dean's Award · Ask, Don't Align", date: "Nov 2026" },
  { title: "3rd Annual SFM Healthcare Innovation Challenge", detail: "CS Prize · ReChord", date: "Apr 2026" },
  { title: "SBU Datathon 2026", detail: "1st Place, Finance & Economics Track · VisionQuant", date: "Feb 2026" },
  { title: "WolfieTank", detail: "2nd Place · EmoAI", date: "Oct 2025" },
  { title: "The Contribution Project", detail: "Grant Recipient" },
];
