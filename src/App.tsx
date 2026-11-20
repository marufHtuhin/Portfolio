import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const EMAIL = 'marufh2894@gmail.com';
const GITHUB = 'https://github.com/marufHtuhin';
const LINKEDIN = 'https://www.linkedin.com/in/marufhtuhin';
const LEETCODE = 'https://leetcode.com/u/marufHtuhin';

const ROTATING = [
  'CSE student · BUBT, Dhaka',
  'Python · FastAPI · Django',
  'MySQL · PostgreSQL · Docker',
];

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'open-source', label: 'Open source' },
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
};

const AMADER_KRISHI: Project = {
  title: 'AmaderKrishi AI',
  shot: '/shots/amaderkrishi.jpg',
  shotAlt: 'AmaderKrishi AI — crop disease diagnosis: a papaya plant photo with a detailed Bangla answer from Gemini',
  desc: 'Bengali agriculture assistant — chat with Gemini in Bangla, photograph a crop to check for disease, and hear answers spoken aloud. My SDP-II project.',
  stack: ['FastAPI', 'MySQL', 'Google Gemini', 'Web Speech API'],
  repo: 'https://github.com/marufHtuhin/AmaderKrishi_AI',
};

const ECOMMERCE: Project = {
  title: 'E-commerce Sales & Inventory System',
  shot: '/shots/ecommerce.jpg',
  shotAlt: 'E-commerce POS landing page — Elevate Your Sales Game with Our Powerful POS Application',
  desc: 'Full-stack point-of-sale and inventory system: JWT auth, product and stock CRUD, sales and invoices with automatic stock deduction, VAT and discounts, dashboard stats, and printable invoices. Built for a database course.',
  stack: ['FastAPI', 'SQLAlchemy', 'MySQL', 'SQLite', 'JWT'],
  repo: 'https://github.com/marufHtuhin/Ecommerce-Sales-Inventory-System',
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
};

const PROJECTS_LEFT = [FARM_MARKET, ECOMMERCE];
const PROJECTS_RIGHT = [AMADER_KRISHI, SNAKE];

const REPOS = [
  {
    name: 'FarmMarket',
    desc: 'Fair-price agricultural marketplace for Bangladesh.',
    url: 'https://github.com/marufHtuhin/FarmMarket',
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

const BUILD_ITEMS = [
  { title: 'Design', desc: 'REST APIs, data models' },
  { title: 'Build', desc: 'FastAPI & Django' },
  { title: 'Store', desc: 'MySQL & PostgreSQL' },
  { title: 'Deploy', desc: 'Render, Vercel, Docker' },
  { title: 'Test', desc: 'Postman' },
  { title: 'Learn', desc: 'LeetCode, daily practice' },
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

/* ---------- tiny inline icons (line style, no emoji, no photos) ---------- */

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

/* Curved arrow pointing up at the "short version" card. */
function CurveArrow() {
  return (
    <svg width="46" height="52" viewBox="0 0 46 52" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 48 C 10 30, 22 16, 38 8" />
      <path d="M30 8 L 39 6 L 38 16" />
    </svg>
  );
}

/* ---------- project card ---------- */

function ProjectCard({ project, tilt }: { project: Project; tilt: 'tilt-l' | 'tilt-r' }) {
  return (
    <article className={`proj-card ${tilt}`}>
      {project.annotation && (
        <span className="proj-anno">
          {project.liveDot && <span className="red-dot" aria-hidden="true" />}
          {project.annotation}
        </span>
      )}
      <a className="proj-shot-link" href={project.live ?? project.repo} target="_blank" rel="noreferrer" aria-label={`${project.title} — open ${project.live ? 'live site' : 'repo'}`}>
        <img className="proj-shot" src={project.shot} alt={project.shotAlt} loading="lazy" />
      </a>
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
  const [active, setActive] = useState('');
  const [rot, setRot] = useState(0);
  const [copied, setCopied] = useState(false);

  // Theme: persist + apply to <html>.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    try {
      localStorage.setItem('maruf-theme', theme);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }, [theme]);

  // Scroll progress bar.
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
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

  // Rotating mono line in the hero.
  useEffect(() => {
    const t = setInterval(() => setRot((r) => (r + 1) % ROTATING.length), 3200);
    return () => clearInterval(t);
  }, []);

  const copyEmail = async () => {
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
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

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
                <span className="hero-rot">
                  / <span className="rot-line" key={rot}>{ROTATING[rot]}</span>
                </span>
              </div>
              <h1>
                I build <span className="hl">backend</span>
                <br />
                systems that
                <br />
                actually run.
              </h1>
              <p className="hero-lede">
                I&rsquo;m a CSE student in Dhaka building APIs, databases and the unglamorous
                parts that make an app run — mostly <strong>Python</strong>, with{' '}
                <strong>FastAPI</strong> and <strong>Django</strong>. My biggest build so far is{' '}
                <strong>FarmMarket</strong>, a fair-price marketplace for Bangladeshi farmers.
              </p>
              <div className="hero-actions">
                <a className="btn" href={`mailto:${EMAIL}`}>
                  <MailIcon /> Email me
                </a>
                <button className="email-pill" type="button" onClick={copyEmail}>
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
              <aside className="short-card" aria-label="The short version">
                <span className="tape" aria-hidden="true" />
                <h2>the short version</h2>
                <div className="sv-row">
                  <span className="sv-label">Now</span>
                  <span className="sv-value">
                    CSE student, BUBT
                    <span>3rd year · CGPA 3.70</span>
                  </span>
                </div>
                <div className="sv-row">
                  <span className="sv-label">Building</span>
                  <span className="sv-value">
                    FarmMarket
                    <span>Hackathon project · Team Agronexis</span>
                  </span>
                </div>
                <div className="sv-row">
                  <span className="sv-label">Daily stack</span>
                  <span className="sv-value">
                    Python, FastAPI, Django
                    <span>MySQL, PostgreSQL, Docker</span>
                  </span>
                </div>
                <div className="sv-row">
                  <span className="sv-label">Also</span>
                  <span className="sv-value">
                    300+ LeetCode problems
                    <span>Django certificate · Interactive Cares</span>
                  </span>
                </div>
              </aside>
              <div className="skim" aria-hidden="true">
                <CurveArrow />
                <span className="hand">skim this if you&rsquo;re in a hurry</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- about ---------- */}
        <section className="section" id="about">
          <div className="wrap">
            <div className="section-head">
              <h2>
                Learning backend by <span className="hl">building</span> it.
              </h2>
              <span className="section-note">
                B.Sc. CSE, BUBT
                <br />
                CGPA 3.70
              </span>
            </div>
            <div className="about-grid">
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
              </div>
              <div className="build-card">
                <span className="tape" aria-hidden="true" />
                <h3>how I build, day to day</h3>
                <div className="build-grid">
                  {BUILD_ITEMS.map((item) => (
                    <div className="build-item" key={item.title}>
                      <b>{item.title}</b>
                      <span>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="cert-line">
              <span className="hand">certification</span>
              <span>
                <b>Web Development with Python, Django</b> · Interactive Cares, 2025–2026
              </span>
            </div>
          </div>
        </section>

        {/* ---------- journey ---------- */}
        <section className="section" id="journey">
          <div className="wrap">
            <div className="section-head">
              <h2>
                From Rajshahi to building for <span className="hl">farmers</span>.
              </h2>
              <span className="section-note">
                4 stops
                <br />
                Rajshahi → Dhaka
              </span>
            </div>
            <div className="timeline">
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

        {/* ---------- projects ---------- */}
        <section className="section" id="projects">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">4 selected</div>
                <h2>
                  Four projects. All real, all <span className="hl">runnable</span>.
                </h2>
              </div>
              <span className="section-note">
                two live, four open source
                <br />
                all on GitHub
              </span>
            </div>
            <div className="projects-grid">
              <div className="proj-col">
                {PROJECTS_LEFT.map((p, i) => (
                  <ProjectCard key={p.title} project={p} tilt={i % 2 === 0 ? 'tilt-l' : 'tilt-r'} />
                ))}
              </div>
              <div className="proj-col second">
                {PROJECTS_RIGHT.map((p, i) => (
                  <ProjectCard key={p.title} project={p} tilt={i % 2 === 0 ? 'tilt-r' : 'tilt-l'} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- open source band ---------- */}
        <section className="band" id="open-source">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">5 public repos</div>
                <h2>Code in the open.</h2>
              </div>
              <span className="section-note">
                repos
                <br />
                on GitHub
              </span>
            </div>
            <div className="repo-list">
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
            <div className="section-head">
              <h2>
                Looking for an entry-level <span className="hl">backend</span> role?
              </h2>
            </div>
            <a className="contact-email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <div className="contact-sub">open to entry-level roles &amp; internships · Dhaka or remote</div>
            <p className="contact-intro">
              I read everything that arrives — roles, internships, collaborations, or just a
              question about one of the projects above.
            </p>
            <div className="contact-actions">
              <a className="btn" href="/cv.pdf" download>
                <DownloadIcon /> Download CV
              </a>
            </div>
            <div className="contact-grid">
              <div className="contact-cell">
                <div className="c-label">
                  <MailIcon /> Email
                </div>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
              <div className="contact-cell">
                <div className="c-label">
                  <LinkedInIcon /> LinkedIn
                </div>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                  linkedin.com/in/marufhtuhin
                </a>
              </div>
              <div className="contact-cell">
                <div className="c-label">
                  <BranchIcon /> GitHub
                </div>
                <a href={GITHUB} target="_blank" rel="noreferrer">
                  github.com/marufHtuhin
                </a>
              </div>
              <div className="contact-cell">
                <div className="c-label">
                  <CodeIcon /> LeetCode
                </div>
                <a href={LEETCODE} target="_blank" rel="noreferrer">
                  leetcode.com/u/marufHtuhin
                </a>
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
    </>
  );
}
