import { useEffect, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react';

type Theme = 'light' | 'dark';

const EMAIL = 'marufh2894@gmail.com';
const GITHUB = 'https://github.com/marufHtuhin';
const LINKEDIN = 'https://www.linkedin.com/in/marufhtuhin';
const LEETCODE = 'https://leetcode.com/u/marufHtuhin';

const TYPE_PHRASES = ['Maruf Hasan', 'a Backend Developer', 'a Python Developer'];

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

type Project = {
  title: string;
  annotation?: string;
  liveDot?: boolean;
  shot: string;
  shotAlt: string;
  desc: string;
  feats?: string[];
  stack: string[];
  live?: string;
  repo: string;
  /* flip-card fields (grid projects only) */
  category?: string;
  short?: string;
  built?: string[];
  ai?: boolean;
};

const FARM_MARKET: Project = {
  title: 'FarmMarket',
  annotation: 'live',
  liveDot: true,
  shot: '/shots/farmmarket.jpg',
  shotAlt: 'FarmMarket marketplace — product listings with prices in Bangla and English',
  desc: 'Fair-price agricultural marketplace for Bangladesh — farmers list produce, buyers post demand, and the two meet without the middleman taking the margin. Built with Team Agronexis for a hackathon; bilingual BN/EN throughout.',
  feats: [
    'Smart demand matching — rule-based weighted score',
    '8-week price forecast (scikit-learn)',
    'Krishi Bondhu AI assistant, powered by Google Gemini',
    'Logistics planner + Digital Twin batch tracking with QR',
  ],
  stack: [
    'React',
    'TypeScript',
    'Vite',
    'FastAPI',
    'MySQL · TiDB Cloud',
    'JWT',
    'Google Gemini',
    'scikit-learn',
    'Open-Meteo',
    'OpenStreetMap',
    'Docker',
    'Render',
  ],
  live: 'https://farmmarket-gdcm.onrender.com',
  repo: 'https://github.com/marufHtuhin/FarmMarket',
  ai: true,
};

const AMADER_KRISHI: Project = {
  title: 'AmaderKrishi AI',
  shot: '/shots/amaderkrishi.jpg',
  shotAlt: 'AmaderKrishi AI — crop disease diagnosis: a papaya plant photo with a detailed Bangla answer from Gemini',
  desc: 'Bengali agriculture assistant — chat with Gemini in Bangla, photograph a crop to check for disease, and hear answers spoken aloud. My SDP-II project.',
  stack: ['FastAPI', 'MySQL', 'Google Gemini', 'Web Speech API'],
  repo: 'https://github.com/marufHtuhin/AmaderKrishi_AI',
  category: 'AI · Python',
  short: 'Bengali agriculture assistant — Gemini chat, crop-disease image analysis, voice.',
  built: ['Gemini chat in Bangla', 'Crop-disease detection from photos', 'Spoken answers via Web Speech API'],
  ai: true,
};

const ECOMMERCE: Project = {
  title: 'E-commerce Sales & Inventory System',
  shot: '/shots/ecommerce.jpg',
  shotAlt: 'E-commerce POS landing page — Elevate Your Sales Game with Our Powerful POS Application',
  desc: 'Full-stack point-of-sale and inventory system: JWT auth, product and stock CRUD, sales and invoices with automatic stock deduction, VAT and discounts, dashboard stats, and printable invoices. Built for a database course.',
  stack: ['FastAPI', 'SQLAlchemy', 'MySQL', 'SQLite', 'JWT'],
  repo: 'https://github.com/marufHtuhin/Ecommerce-Sales-Inventory-System',
  category: 'Full-stack · POS',
  short: 'Point-of-sale and inventory system with JWT auth and printable invoices.',
  built: [
    'JWT auth + product and stock CRUD',
    'Sales & invoices with automatic stock deduction',
    'VAT, discounts, printable invoices',
  ],
  ai: false,
};

const SNAKE: Project = {
  title: 'Snake Game AI',
  annotation: 'live demo',
  shot: '/shots/snake.jpg',
  shotAlt: 'Snake Game AI — AI autopilot playing with the A* path shown as dots',
  desc: 'Classic snake in Python and Pygame with an A* pathfinding brain — watch the AI play itself, or take the keyboard and play manually.',
  stack: ['Python', 'Pygame', 'A* pathfinding'],
  live: 'https://marufhtuhin.github.io/Snake-Game-AI/',
  repo: 'https://github.com/marufHtuhin/Snake-Game-AI',
  category: 'Game · AI',
  short: 'Classic snake with an A* pathfinding brain — watch the AI play, or play yourself.',
  built: ['A* pathfinding autopilot', 'Manual play — keyboard + touch', 'Runs in the browser via pygbag'],
  ai: true,
};

const PULSEWATCH: Project = {
  title: 'PulseWatch AI',
  annotation: 'live',
  liveDot: true,
  shot: '/shots/pulsewatch.png',
  shotAlt: 'PulseWatch AI — FarmMarket monitor detail: 100% uptime, P95 latency and check history',
  desc: 'API monitoring that explains itself — real HTTP checks, a deterministic anomaly engine, and AI incident explanations, with Telegram alerts when something breaks. Multi-user SaaS: open registration, per-user monitors and settings, forgot-password OTP, and an admin panel.',
  feats: [
    'Anomaly detection — latency, errors, timeouts, baseline drift, SSL expiry',
    'AI incident explanations via OpenRouter — verified live on a real alert',
    'Telegram alerts + P50/P95/P99 latency + consecutive-failure detection',
  ],
  stack: [
    'React',
    'JavaScript',
    'Vite',
    'FastAPI',
    'SQLAlchemy',
    'MySQL · TiDB Cloud',
    'JWT',
    'OpenRouter',
    'Telegram Bot API',
    'APScheduler',
    'Render',
  ],
  live: 'https://pulsewatchai.vercel.app',
  repo: 'https://github.com/marufHtuhin/PulseWatch-AI',
  category: 'SaaS · Monitoring',
  short: 'API monitoring with AI incident explanations and Telegram alerts.',
  built: [
    'Real HTTP checks + 11-rule anomaly engine',
    'AI incident explanations via OpenRouter',
    'Telegram alerts, SSL expiry, admin panel',
  ],
  ai: true,
};

/* Featured card (shown when it matches the active filter) + flip-card grid below the filters. Counts include the featured card, so they match the projects actually visible. */
const FLIP_PROJECTS = [PULSEWATCH, AMADER_KRISHI, ECOMMERCE, SNAKE];
const ALL_PROJECTS = [FARM_MARKET, ...FLIP_PROJECTS];

type Filter = 'all' | 'live' | 'ai';

const FILTERS: { id: Filter; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: ALL_PROJECTS.length },
  { id: 'live', label: 'Live demo', count: ALL_PROJECTS.filter((p) => p.live).length },
  { id: 'ai', label: 'AI-powered', count: ALL_PROJECTS.filter((p) => p.ai).length },
];

const REPOS = [
  {
    name: 'FarmMarket',
    desc: 'Fair-price agricultural marketplace for Bangladesh.',
    url: 'https://github.com/marufHtuhin/FarmMarket',
  },
  {
    name: 'PulseWatch-AI',
    desc: 'API monitoring with anomaly detection, AI explanations and Telegram alerts.',
    url: 'https://github.com/marufHtuhin/PulseWatch-AI',
  },
  {
    name: 'AmaderKrishi_AI',
    desc: 'Bengali agriculture assistant: Gemini chat, crop-disease image analysis, voice.',
    url: 'https://github.com/marufHtuhin/AmaderKrishi_AI',
  },
  {
    name: 'Ecommerce-Sales-Inventory-System',
    desc: 'Full-stack POS and inventory with JWT auth and printable invoices.',
    url: 'https://github.com/marufHtuhin/Ecommerce-Sales-Inventory-System',
  },
  {
    name: 'Snake-Game-AI',
    desc: 'Snake with A* pathfinding — autonomous AI and manual play.',
    url: 'https://github.com/marufHtuhin/Snake-Game-AI',
  },
  {
    name: 'LeetCode',
    desc: 'My LeetCode solutions — 300+ problems solved.',
    url: 'https://github.com/marufHtuhin/LeetCode',
  },
];

const JOURNEY = [
  {
    dates: '2024 — 2028',
    title: 'B.Sc. CSE, BUBT',
    org: 'Bangladesh University of Business and Technology · Dhaka',
    now: true,
    duration: '3rd year · now',
    desc: 'CGPA 3.70. Backend focus — APIs, databases, and FarmMarket, the biggest thing I have built so far.',
  },
  {
    dates: '2025 — 2026',
    title: 'Web Development with Python, Django',
    org: 'Interactive Cares · certification',
    now: false,
    duration: 'certificate',
    desc: 'Full Django certificate course — models, views, templates, auth, and deploying a real app.',
  },
  {
    dates: '2022',
    title: 'HSC, Rajshahi Govt. City College',
    org: 'Higher Secondary Certificate · Science',
    now: false,
    duration: 'GPA 5.00',
    desc: 'Finished school in Rajshahi with a perfect GPA, then moved to Dhaka for university.',
  },
  {
    dates: '2020',
    title: 'SSC, Rajshahi Govt. Model School and College',
    org: 'Secondary School Certificate · Science',
    now: false,
    duration: 'GPA 5.00',
    desc: 'Where it started — Science stream, Rajshahi.',
  },
];

const CORE_STACK = ['Python', 'FastAPI', 'Django', 'MySQL', 'PostgreSQL', 'React', 'Docker'];

const SKILL_GROUPS = [
  { title: 'Backend', glyph: 'BE', items: ['FastAPI', 'Django', 'DRF', 'REST APIs', 'JWT auth'] },
  { title: 'Languages', glyph: 'PY', items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C++', 'Java'] },
  { title: 'Data', glyph: 'DB', items: ['MySQL', 'PostgreSQL', 'SQLite', 'SQLAlchemy', 'Alembic'] },
  { title: 'AI & ML', glyph: 'AI', items: ['Google Gemini', 'scikit-learn', 'RAG-lite', 'Open-Meteo'] },
  { title: 'Tools', glyph: 'TL', items: ['Git & GitHub', 'Docker', 'Postman', 'pytest', 'Vitest'] },
  { title: 'Deploy', glyph: 'CD', items: ['Render', 'Vercel', 'TiDB Cloud'] },
];

/* Honest labels only — no paid jobs yet, so every entry says what it is. */
const EXPERIENCE = [
  {
    dates: 'Nov 2026',
    title: 'FarmMarket',
    org: 'Team Agronexis · International AI Builders Congress 2026',
    label: 'Hackathon',
    bullets: [
      'Bilingual fair-price marketplace — React + TypeScript frontend, FastAPI + MySQL/TiDB backend',
      'Smart demand matching, 8-week price forecasting, Gemini-powered Krishi Bondhu assistant',
    ],
  },
  {
    dates: 'Nov 2026',
    title: 'Snake Game AI',
    org: 'AI course · BUBT',
    label: 'Course project',
    bullets: [
      'A* pathfinding AI that plays snake by itself',
      'Python + Pygame, playable in the browser via pygbag',
    ],
  },
  {
    dates: '2026',
    title: 'AmaderKrishi AI',
    org: 'SDP-II · BUBT',
    label: 'Academic project',
    bullets: [
      'Bengali agriculture assistant — Gemini chat, crop-disease detection from photos',
      'Spoken answers via the Web Speech API',
    ],
  },
  {
    dates: '2025 — 2026',
    title: 'E-commerce Sales & Inventory System',
    org: 'Database course · BUBT',
    label: 'Course project',
    bullets: [
      'Full-stack POS + inventory — JWT auth, product and stock CRUD',
      'Sales and invoices with automatic stock deduction, VAT and discounts',
    ],
  },
];

const SERVICES = [
  {
    title: 'REST API Development',
    desc: 'FastAPI and Django APIs with JWT auth, validation, and clean, documented endpoints.',
    tags: ['FastAPI', 'Django', 'JWT'],
  },
  {
    title: 'Database Design',
    desc: 'MySQL and PostgreSQL schemas, SQLAlchemy models, and Alembic migrations that keep data safe.',
    tags: ['MySQL', 'PostgreSQL', 'SQLAlchemy'],
  },
  {
    title: 'Full-Stack Web Apps',
    desc: 'React + TypeScript frontends on FastAPI backends, deployed on Render and Vercel.',
    tags: ['React', 'TypeScript', 'Render'],
  },
  {
    title: 'AI Features',
    desc: 'Gemini chat and vision, RAG-lite retrieval over your own notes, and scikit-learn forecasting.',
    tags: ['Gemini', 'scikit-learn', 'RAG-lite'],
  },
];

/* ---------- tiny inline icons (line style, no emoji) ---------- */

function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  );
}

function BranchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <text x="12" y="17" textAnchor="middle" fontSize="11" fontWeight="800" fill="currentColor" stroke="none" fontFamily="inherit">
        in
      </text>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </svg>
  );
}

function FlipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-2.6-6.3" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function UpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

/* ---------- typewriter ---------- */

/* Types each phrase char by char, pauses, deletes, loops forever.
   The line is never left blank: it starts with the first character already
   shown, and the next phrase begins the moment the old one is deleted. */
function useTypewriter(phrases: string[]) {
  const [text, setText] = useState(phrases[0].slice(0, 1));
  useEffect(() => {
    let phrase = 0;
    let char = 1;
    let deleting = false;
    let timer = 0;
    const tick = () => {
      const current = phrases[phrase];
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1200);
          return;
        }
        timer = window.setTimeout(tick, 70);
      } else {
        char -= 1;
        if (char === 0) {
          /* Deleted fully — start the next phrase at once, no empty pause. */
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          char = 1;
          setText(phrases[phrase].slice(0, 1));
          timer = window.setTimeout(tick, 70);
          return;
        }
        setText(current.slice(0, char));
        timer = window.setTimeout(tick, 35);
      }
    };
    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [phrases]);
  return text;
}

/* ---------- featured project card (FarmMarket — no flip) ---------- */

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="proj-featured">
      <a
        className="featured-shot"
        href={project.live ?? project.repo}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.title} — open ${project.live ? 'live site' : 'repo'}`}
      >
        <img className="featured-img" src={project.shot} alt={project.shotAlt} loading="lazy" />
      </a>
      <div className="featured-body">
        {project.annotation && (
          <span className="featured-live">
            {project.liveDot && <span className="red-dot" aria-hidden="true" />}
            {project.annotation}
          </span>
        )}
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        {project.feats && (
          <ul className="proj-feats">
            {project.feats.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
        <div className="pills">
          {project.stack.map((s) => (
            <span className="pill" key={s}>
              {s}
            </span>
          ))}
        </div>
        <div className="proj-links">
          {project.live && (
            <a className="text-link" href={project.live} target="_blank" rel="noreferrer">
              Live site <ArrowIcon />
            </a>
          )}
          <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">
            Repo <ArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ---------- flip card (click to flip; hover never flips) ---------- */

function FlipCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);
  const link = project.live ?? project.repo;
  const linkLabel = project.live ? 'Live site' : 'Repo';

  /* Clicks on links inside the card navigate instead of flipping. */
  const flipOnClick = (e: ReactMouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('a')) return;
    setFlipped((f) => !f);
  };
  const flipOnKey = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if ((e.target as HTMLElement).closest('a')) return;
    e.preventDefault();
    setFlipped((f) => !f);
  };

  return (
    <article
      className={`flip-card${flipped ? ' flipped' : ''}`}
      onClick={flipOnClick}
      onKeyDown={flipOnKey}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`${project.title} — ${flipped ? 'show front' : 'show what I built'}`}
    >
      <div className="flip-inner">
        {/* front */}
        <div className="flip-face flip-front">
          <div className="flip-shot-wrap">
            <img className="flip-shot" src={project.shot} alt={project.shotAlt} loading="lazy" />
            <span className="flip-cat">{project.category}</span>
            <span className="flip-icon" aria-hidden="true">
              <FlipIcon />
            </span>
          </div>
          <div className="flip-body">
            <h3>{project.title}</h3>
            <p>{project.short}</p>
            <div className="pills">
              {project.stack.map((s) => (
                <span className="pill" key={s}>
                  {s}
                </span>
              ))}
            </div>
            <div className="flip-foot">
              <span>Click for details</span>
              <a className="text-link" href={link} target="_blank" rel="noreferrer">
                {linkLabel} <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
        {/* back */}
        <div className="flip-face flip-back">
          <div className="flip-body">
            <h3>{project.title}</h3>
            <span className="flip-cat flip-cat-back">{project.category}</span>
            <div className="eyebrow flip-eyebrow">What I built</div>
            <ul className="flip-built">
              {(project.built ?? []).map((b) => (
                <li key={b}>
                  <CheckIcon />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="flip-foot">
              <span>Click to flip back</span>
              <a className="btn flip-btn" href={link} target="_blank" rel="noreferrer">
                {linkLabel} <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- app ---------- */

function readInitialTheme(): Theme {
  if (typeof document !== 'undefined') {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  return 'light';
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedContact, setCopiedContact] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const typed = useTypewriter(TYPE_PHRASES);

  // Theme: persist + apply to <html>.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    try {
      localStorage.setItem('maruf-theme', theme);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }, [theme]);

  // Scroll progress bar + back-to-top visibility.
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
      setShowTop(el.scrollTop > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy for the nav highlight.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Scroll-reveal: fade + rise as sections enter the viewport.
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const copyEmail = async (contact: boolean) => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (contact) {
      setCopiedContact(true);
      window.setTimeout(() => setCopiedContact(false), 2000);
    } else {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const visibleFlip = FLIP_PROJECTS.filter((p) => {
    if (filter === 'live') return Boolean(p.live);
    if (filter === 'ai') return Boolean(p.ai);
    return true;
  });

  /* The featured card follows the same filter, so the pill counts (which
     include it) always match the projects actually on screen. */
  const featuredVisible =
    filter === 'all' ||
    (filter === 'live' && Boolean(FARM_MARKET.live)) ||
    (filter === 'ai' && Boolean(FARM_MARKET.ai));

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <header className="site-header">
        <div className="wrap header-inner">
          <a className="brand" href="#top" aria-label="Maruf Hasan — back to top">
            <span className="brand-mark">MH</span>
            <span className="brand-name">Maruf</span>
          </a>
          <nav className="nav" aria-label="Sections">
            {NAV.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="btn say-hello" href="#contact">
            Say hello
          </a>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="hero-greet-row">
                <span className="hero-greet">hi, I&rsquo;m Maruf</span>
              </div>
              <h1 aria-label="Maruf Hasan, a Backend Developer, a Python Developer">
                <span aria-hidden="true">
                  {typed}
                  <span className="type-caret">|</span>
                </span>
              </h1>
              <p className="hero-sub">
                I build <span className="hl">backend</span> systems that actually run.
              </p>
              <p className="hero-lede">
                I&rsquo;m a CSE student in Dhaka building APIs, databases and the unglamorous
                parts that make an app run — mostly <strong>Python</strong>, with{' '}
                <strong>FastAPI</strong> and <strong>Django</strong>. My biggest build so far is{' '}
                <strong>FarmMarket</strong>, a fair-price marketplace for Bangladeshi farmers.
              </p>
              <div className="hero-actions">
                <a className="btn" href="#projects">
                  View Projects
                </a>
                <a className="btn" href="/cv.pdf" download>
                  <DownloadIcon /> Download CV
                </a>
                <button className="email-pill" type="button" onClick={() => copyEmail(false)}>
                  {EMAIL} {copied ? <span className="copied">Copied</span> : <CopyIcon />}
                </button>
              </div>
              <div className="hero-links">
                <a className="text-link" href={GITHUB} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a className="text-link" href={LINKEDIN} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="text-link" href={LEETCODE} target="_blank" rel="noreferrer">
                  LeetCode
                </a>
              </div>
            </div>

            <div>
              <div className="photo-frame">
                <span className="photo-backdrop" aria-hidden="true" />
                <span className="photo-dots" aria-hidden="true" />
                <img src="/photo.jpg" alt="Maruf Hasan — backend developer in Dhaka" />
                <div className="photo-badge">
                  <b>Backend</b>
                  <span>Python · FastAPI · Django</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- about ---------- */}
        <section className="section" id="about">
          <div className="wrap">
            <div className="section-head reveal">
              <h2>
                Learning backend by <span className="hl">building</span> it.
              </h2>
              <span className="section-note">
                B.Sc. CSE, BUBT
                <br />
                CGPA 3.70
              </span>
            </div>
            <div className="about-grid reveal">
              <div className="about-text">
                <p>
                  I&rsquo;m a CSE student in Dhaka, and backend is where I live: APIs,
                  databases, auth — the parts of an app nobody screenshots but everything
                  depends on. Most of my work is <strong>Python</strong> — FastAPI and
                  Django — with MySQL and PostgreSQL underneath.
                </p>
                <p>
                  My biggest build so far is <strong>FarmMarket</strong>, a fair-price
                  marketplace connecting Bangladeshi farmers directly with buyers. I learn
                  by shipping: every project here is real, runnable code, and I keep my
                  problem-solving sharp with <strong>300+ LeetCode problems</strong>.
                </p>
                <div className="about-stats">
                  <div className="about-stat">
                    <b>4</b>
                    <span>Projects built</span>
                  </div>
                  <div className="about-stat">
                    <b>300+</b>
                    <span>LeetCode problems</span>
                  </div>
                  <div className="about-stat">
                    <b>3.70</b>
                    <span>CGPA</span>
                  </div>
                </div>
              </div>
              <figure className="about-photo">
                <span className="tape" aria-hidden="true" />
                <img src="/photo-full.jpg" alt="Maruf Hasan, full portrait" />
              </figure>
            </div>
            <div className="cert-line">
              <span className="hand">certification</span>
              <span>
                <b>Web Development with Python, Django</b> · Interactive Cares, 2025–2026
              </span>
            </div>
          </div>
        </section>

        {/* ---------- experience ---------- */}
        <section className="section" id="experience">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">projects &amp; hackathons</div>
                <h2>
                  Experience <span className="hl">so far</span>.
                </h2>
              </div>
              <span className="section-note">
                no jobs yet —
                <br />
                real work, honestly labelled
              </span>
            </div>
            <div className="xp-timeline reveal">
              {EXPERIENCE.map((entry, i) => (
                <div className={`xp-item${i % 2 === 0 ? ' xp-left' : ' xp-right'}`} key={entry.title}>
                  <span className="xp-dot" aria-hidden="true" />
                  <article className="xp-card">
                    <div className="xp-date">{entry.dates}</div>
                    <h3>
                      {entry.title}
                      <span className="label-pill">{entry.label}</span>
                    </h3>
                    <div className="tl-org">{entry.org}</div>
                    <ul className="xp-bullets">
                      {entry.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- projects ---------- */}
        <section className="section" id="projects">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">5 selected</div>
                <h2>
                  Five projects. All real, all <span className="hl">runnable</span>.
                </h2>
              </div>
              <span className="section-note">
                three live, five open source
                <br />
                all on GitHub
              </span>
            </div>
            <div className="filter-row" role="group" aria-label="Filter projects">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`filter-btn${filter === f.id ? ' active' : ''}`}
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label} <span className="count">{f.count}</span>
                </button>
              ))}
            </div>
            {featuredVisible && <FeaturedCard project={FARM_MARKET} />}
            <div className="flip-grid">
              {visibleFlip.map((p) => (
                <FlipCard key={p.title} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- skills ---------- */}
        <section className="section" id="skills">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">the toolkit</div>
                <h2>
                  Skills, grouped by <span className="hl">job</span>.
                </h2>
              </div>
              <span className="section-note">
                what I work with
                <br />
                every day
              </span>
            </div>
            <div className="core-stack reveal">
              {CORE_STACK.map((s) => (
                <span className="core-pill" key={s}>
                  {s}
                </span>
              ))}
            </div>
            <div className="skills-grid reveal">
              {SKILL_GROUPS.map((group) => (
                <div className="skill-card" key={group.title}>
                  <div className="skill-top">
                    <span className="skill-icon" aria-hidden="true">
                      {group.glyph}
                    </span>
                    <h3>{group.title}</h3>
                  </div>
                  <div className="skill-count">{group.items.length} skills</div>
                  <div className="skill-div" aria-hidden="true" />
                  <div className="pills">
                    {group.items.map((item) => (
                      <span className="pill" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- services ---------- */}
        <section className="section" id="services">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">services</div>
                <h2>
                  What I can <span className="hl">build</span>.
                </h2>
              </div>
              <span className="section-note">
                for your next
                <br />
                project
              </span>
            </div>
            <p className="services-intro reveal">
              I&rsquo;m open to entry-level roles and internships. Here&rsquo;s what I can
              build for your team, based on the stack I use day to day.
            </p>
            <div className="services-grid reveal">
              {SERVICES.map((service) => (
                <article className="service-card" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <div className="pills">
                    {service.tags.map((t) => (
                      <span className="pill" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="services-cta">
              <a className="btn" href="#contact">
                Let&rsquo;s talk
              </a>
            </div>
          </div>
        </section>

        {/* ---------- journey ---------- */}
        <section className="section" id="journey">
          <div className="wrap">
            <div className="section-head reveal">
              <h2>
                From Rajshahi to building for <span className="hl">farmers</span>.
              </h2>
              <span className="section-note">
                4 stops
                <br />
                Rajshahi → Dhaka
              </span>
            </div>
            <div className="timeline reveal">
              {JOURNEY.map((entry) => (
                <div className="tl-item" key={entry.title}>
                  <span className="tl-date">{entry.dates}</span>
                  <span className="tl-rail" aria-hidden="true">
                    <span className={`tl-dot${entry.now ? ' now' : ''}`} />
                  </span>
                  <div className="tl-body">
                    <h3>
                      {entry.title}
                      {entry.now && <span className="now-pill">now</span>}
                    </h3>
                    <div className="tl-org">{entry.org}</div>
                    <div className="tl-duration">{entry.duration}</div>
                    <p>{entry.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- open source band ---------- */}
        <section className="band" id="open-source">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">10+ public repos</div>
                <h2>Code in the open.</h2>
              </div>
              <span className="section-note">
                repos
                <br />
                on GitHub
              </span>
            </div>
            <div className="repo-list reveal">
              {REPOS.map((repo) => (
                <a className="repo-row" key={repo.name} href={repo.url} target="_blank" rel="noreferrer">
                  <span className="repo-name">{repo.name}</span>
                  <span className="repo-desc">{repo.desc}</span>
                  <span className="repo-lang">Python</span>
                </a>
              ))}
            </div>
            <a className="band-all" href={GITHUB} target="_blank" rel="noreferrer">
              All repositories on GitHub <ArrowIcon />
            </a>
          </div>
        </section>

        {/* ---------- contact ---------- */}
        <section className="section" id="contact">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">contact</div>
                <h2>
                  Let&rsquo;s <span className="hl">talk</span>.
                </h2>
              </div>
              <span className="section-note">
                I read everything
                <br />
                that arrives
              </span>
            </div>
            <div className="contact-grid2 reveal">
              <div className="contact-navy">
                <span className="avail-pill">Available for new opportunities</span>
                <h3>Have a role or a project in mind?</h3>
                <p>
                  I&rsquo;m open to entry-level backend roles and internships. Email is the
                  fastest way to reach me.
                </p>
                <p className="contact-loc">
                  <PinIcon /> Dhaka, Bangladesh
                </p>
                <a className="btn btn-light" href={LINKEDIN} target="_blank" rel="noreferrer">
                  Message me on LinkedIn <ArrowIcon />
                </a>
              </div>
              <div className="contact-rows">
                <div className="contact-row">
                  <span className="contact-row-icon" aria-hidden="true">
                    <MailIcon />
                  </span>
                  <div className="contact-row-body">
                    <div className="contact-row-label">Email</div>
                    <a className="contact-row-value" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                  </div>
                  <button className="contact-row-btn" type="button" onClick={() => copyEmail(true)}>
                    {copiedContact ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="contact-row">
                  <span className="contact-row-icon" aria-hidden="true">
                    <LinkedInIcon />
                  </span>
                  <div className="contact-row-body">
                    <div className="contact-row-label">LinkedIn</div>
                    <a className="contact-row-value" href={LINKEDIN} target="_blank" rel="noreferrer">
                      linkedin.com/in/marufhtuhin
                    </a>
                  </div>
                  <a className="contact-row-btn" href={LINKEDIN} target="_blank" rel="noreferrer">
                    Open <ArrowIcon />
                  </a>
                </div>
                <div className="contact-row">
                  <span className="contact-row-icon" aria-hidden="true">
                    <BranchIcon />
                  </span>
                  <div className="contact-row-body">
                    <div className="contact-row-label">GitHub</div>
                    <a className="contact-row-value" href={GITHUB} target="_blank" rel="noreferrer">
                      github.com/marufHtuhin
                    </a>
                  </div>
                  <a className="contact-row-btn" href={GITHUB} target="_blank" rel="noreferrer">
                    Open <ArrowIcon />
                  </a>
                </div>
                <div className="contact-row">
                  <span className="contact-row-icon" aria-hidden="true">
                    <CodeIcon />
                  </span>
                  <div className="contact-row-body">
                    <div className="contact-row-label">LeetCode</div>
                    <a className="contact-row-value" href={LEETCODE} target="_blank" rel="noreferrer">
                      leetcode.com/u/marufHtuhin
                    </a>
                  </div>
                  <a className="contact-row-btn" href={LEETCODE} target="_blank" rel="noreferrer">
                    Open <ArrowIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-name">Md. Maruf Hasan Tuhin</div>
              <p className="footer-bio">
                CSE student at BUBT and backend developer in Dhaka. Python, FastAPI,
                Django — building the parts that make an app run.
              </p>
            </div>
            <nav className="footer-nav" aria-label="Footer">
              {NAV.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="copyright">© 2026 Md. Maruf Hasan Tuhin</div>
        </div>
      </footer>

      <button
        className={`to-top${showTop ? ' show' : ''}`}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <UpIcon />
      </button>
    </>
  );
}
