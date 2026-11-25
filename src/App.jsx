import { useEffect, useRef, useState } from "react";
import "./App.css";

// ── Content ────────────────────────────────────────────────────────────────
const INFO = {
  name: "Yisong Wang",
  alias: "Eric",
  school: "San José State University",
  location: "San Jose, CA",
  email: "eric.wang02@sjsu.edu",
  github: "https://github.com/yiswangdev",
  linkedin: "https://www.linkedin.com/in/yisongw/",
  resume: "/resume.pdf",
  intro:
    "I’m a computer science student at San José State University, building web apps, AI tools and the small details that make them feel finished.",
};

const ROLES = [
  "Computer Science Student",
  "Aspiring Software Developer",
  "Beginner Full-Stack Learner",
  "UI/UX Learner",
  "Problem Solver",
];

const ABOUT = [
  "While pursuing a bachelor’s degree in computer science at San José State University, I’m building a strong foundation in software development, problem-solving, and systems thinking.",
  "Beyond the classroom, part-time jobs and clubs have strengthened my teamwork, communication, and resilience. Balancing work and academics has taught me to adapt quickly, stay organized, and perform in fast-paced environments.",
  "I’m passionate about continuously learning — both computer science and the professional and interpersonal skills that turn technical knowledge into real-world impact.",
];

const STATS = [
  { value: "San Jose State University", label: "College" },
  { value: "Computer Science", label: "Major" },
  { value: "2028", label: "Grad Year" },
];

const SKILLS = [
  { title: "Languages", note: "The languages behind my coursework and side projects.", items: ["Python", "JavaScript", "Java"] },
  { title: "Frontend", note: "Interfaces I build and the tools I reach for.", items: ["React", "HTML", "CSS", "Next.js", "TypeScript"] },
  { title: "Backend & Tools", note: "The server side of the projects I ship.", items: ["Node.js", "FastAPI", "Express", "MongoDB"] },
  { title: "Other", note: "Everything that supports the work.", items: ["Git", "Figma", "Data Structures", "Algorithms"] },
];

const EXPERIENCE = [
  {
    role: "Intern",
    org: "Software and Computer Engineering Society (SJSU)",
    period: "Dec 2025 — Feb 2026",
    location: "San Jose, CA",
    points: [
      "Built a real-time stock analysis platform with React and Express.js, integrating FinnHub API for live market data.",
      "Collaborated with developers to design and log market data in a clean formatted table.",
      "Improved maintainability and performance by applying clean architecture principles and consistent coding practices.",
      "Shipped a redesigned UI with data visualizations, boosting engagement by 25% and session time from 2 to 5 minutes.",
    ],
  },
];

const PROJECTS = [
  {
    title: "PCSeekers",
    summary:
      "Part prices swing daily across a dozen retailers. I built a scraper that re-checks listings and normalizes them into one comparable table, so you can filter by spec and see who’s cheapest right now instead of opening six tabs.",
    tags: ["Next.js", "FastAPI", "Vercel", "Python", "JavaScript", "Web Scraping"],
    code: "https://github.com/yiswangdev/pc-deals-website",
    demo: "https://pc-seekers.vercel.app/",
  },
  {
    title: "SecondLife Finder",
    summary:
      "Thrift stores and donation centers are invisible unless you already know they exist. This maps what’s nearby, filters by what you’re getting rid of, and summarizes reviews so you know what a place actually accepts before driving there.",
    tags: ["React", "Vite", "Express", "Google Maps API", "Gemini AI", "Vercel"],
    code: "https://github.com/yiswangdev/SecondLife-Finder",
    demo: "https://shipyardhq.tech/projects/246f5ec7-267d-41a6-ac05-aed80d3ac842",
  },
  {
    title: "CodeSentinel",
    summary:
      "Small security issues slip through code review. This reviews a pull request and comments on risky patterns, pointing at the line it came from instead of handing over a generic checklist.",
    tags: ["Next.js", "FastAPI", "Vercel", "Python", "JavaScript", "Langchain"],
    code: "https://github.com/Steve-Dusty/codesentinel",
    demo: "https://devpost.com/software/codesentinel-73qwt4",
  },
];

const EDUCATION = {
  degree: "B.S. Computer Science",
  school: "San Jose State University",
  year: "2024 — Present",
  gpa: "3.7",
  status: "Expected May 2028",
  courses: ["Data Structures", "Algorithms", "Discrete Math", "Calculus"],
};

const MARQUEE = [
  "Python",
  "JavaScript",
  "Java",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "FastAPI",
  "Express",
  "MongoDB",
  "Git",
  "Figma",
];

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

// ── Small hooks ────────────────────────────────────────────────────────────
function useTypewriter(words) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }
    const word = words[index % words.length];
    let timer;

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), 1700);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timer = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 32 : 64
      );
    }
    return () => clearTimeout(timer);
  }, [words, text, index, deleting]);

  return text;
}

function useLocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Los_Angeles",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ── Flowing wave background ────────────────────────────────────────────────
const WAVES = [
  { amp: 42, len: 0.0031, speed: 0.55, offset: 0.5, from: "rgba(96,118,255,0.20)", to: "rgba(96,118,255,0)" },
  { amp: 36, len: 0.0046, speed: 0.42, offset: 0.62, from: "rgba(255,138,96,0.20)", to: "rgba(255,138,96,0)" },
  { amp: 30, len: 0.0059, speed: 0.33, offset: 0.73, from: "rgba(186,158,255,0.22)", to: "rgba(186,158,255,0)" },
  { amp: 24, len: 0.0082, speed: 0.26, offset: 0.84, from: "rgba(255,190,112,0.22)", to: "rgba(255,190,112,0)" },
  { amp: 18, len: 0.0105, speed: 0.2, offset: 0.93, from: "rgba(120,146,255,0.16)", to: "rgba(120,146,255,0)" },
];

function Waves() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let last = 0;

    const paint = (time) => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;

      WAVES.forEach((wave) => {
        const base = height * wave.offset;
        ctx.beginPath();
        ctx.moveTo(-24, height + 24);
        for (let x = -24; x <= width + 24; x += 8) {
          const a = Math.sin(x * wave.len + t * wave.speed);
          const b = Math.sin(x * wave.len * 2.4 - t * wave.speed * 0.7);
          ctx.lineTo(x, base + (a + b * 0.45) * wave.amp);
        }
        ctx.lineTo(width + 24, height + 24);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, base - wave.amp * 1.8, 0, height);
        gradient.addColorStop(0, wave.from);
        gradient.addColorStop(1, wave.to);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };

    const tick = (time) => {
      if (!running) return;
      last = time;
      paint(time);
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(last);
    };

    resize();
    if (reduce) paint(0);
    else start();

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry || reduce) return;
      if (entry.isIntersecting) start();
      else stop();
    });
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}

// ── Navigation ─────────────────────────────────────────────────────────────
function Nav() {
  const time = useLocalTime();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 200 && !open);
      setScrolled(y > 24);
      last = y;

      if (window.innerHeight + y >= document.body.scrollHeight - 80) {
        setActive("contact");
        return;
      }
      let current = "";
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el && y + window.innerHeight * 0.3 >= el.offsetTop) current = section.id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id) => (event) => {
    event.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}${hidden ? " hidden" : ""}`}>
        <div className="wrap header-inner">
          <a href="#top" onClick={go("top")} className="brand">
            {INFO.name} <span>({INFO.alias})</span>
          </a>

          <nav className="nav" aria-label="Sections">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={go(section.id)}
                className={`nav-link${active === section.id ? " active" : ""}`}
              >
                {section.label}
              </a>
            ))}
            <a href={INFO.resume} target="_blank" rel="noreferrer" className="nav-resume">
              Résumé
            </a>
            <span className="nav-time">{time}</span>
          </nav>

          <button
            type="button"
            className={`burger${open ? " open" : ""}`}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${open ? " open" : ""}`} id="mobile-menu">
        {SECTIONS.map((section) => (
          <a key={section.id} href={`#${section.id}`} onClick={go(section.id)}>
            {section.label}
          </a>
        ))}
        <a href={INFO.resume} target="_blank" rel="noreferrer" className="mobile-resume">
          Résumé ↗
        </a>
        <p className="mobile-meta">
          {INFO.location} · {time}
        </p>
      </div>
    </>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section id="top" className="hero">
      <div className="hero-field" aria-hidden="true">
        <Waves />
      </div>

      <div className="wrap hero-inner">
        <p className="hero-eyebrow">
          <span className="dot" /> {INFO.location} · Open to internships
        </p>

        <h1>
          {INFO.name.split(" ").map((word) => (
            <span key={word}>
              <span>{word}</span>
            </span>
          ))}
        </h1>

        <div className="hero-bottom">
          <div>
            <p className="role">
              {typed}
              <span className="caret" />
            </p>
            <p className="hero-intro">{INFO.intro}</p>
          </div>

          <div className="hero-actions">
            <a className="btn btn-solid" href={INFO.resume} target="_blank" rel="noreferrer">
              View résumé ↗
            </a>
            <a className="btn btn-ghost" href={INFO.resume} download="Yisong_Wang_Resume.pdf">
              Download PDF ↓
            </a>
            <a
              className="link-arrow"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                const el = document.getElementById("contact");
                if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
              }}
            >
              Get in touch ↓
            </a>
          </div>
        </div>

        <div className="hero-meta">
          <span>{INFO.school}</span>
          <span>Scroll to explore ↓</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <ul className="marquee-track">
        {[...MARQUEE, ...MARQUEE].map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// ── Work ───────────────────────────────────────────────────────────────────
function Work() {
  return (
    <section id="work" className="wrap section">
      <div className="section-head">
        <div>
          <p className="eyebrow">04 — Portfolio</p>
          <h2 className="title">Selected work</h2>
        </div>
        <p className="section-note">3 projects · code and live demos</p>
      </div>

      <div className="work-list">
        {PROJECTS.map((project, index) => (
          <article className="project" key={project.title}>
            <div>
              <p className="project-num">0{index + 1}</p>
              <h3 className="project-title">{project.title}</h3>
              <ul className="tags">
                {project.tags.map((tag) => (
                  <li className="tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="project-body">
              <p className="project-summary">{project.summary}</p>
              <div className="project-links">
                <a className="project-link" href={project.code} target="_blank" rel="noreferrer">
                  Code ↗
                </a>
                <a className="project-link" href={project.demo} target="_blank" rel="noreferrer">
                  Live demo ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="wrap section">
      <div className="about-grid">
        <div className="reveal">
          <div className="portrait">
            <img
              src="/eric_pfp1.jpg"
              alt={`${INFO.name}, computer science student at ${INFO.school}`}
              loading="lazy"
            />
          </div>
          <div className="portrait-meta">
            <span>{INFO.location}</span>
            <span>Class of 2028</span>
          </div>
        </div>

        <div>
          <p className="eyebrow">01 — Introduction</p>
          <h2 className="title">About me</h2>

          <p className="about-lead">{ABOUT[0]}</p>
          <div className="about-body">
            {ABOUT.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <dl className="stats">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="stat-label">{stat.label}</dt>
                <dd className="stat-value">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────────────────
function Skills() {
  const [open, setOpen] = useState(0);

  return (
    <section id="skills" className="wrap section">
      <div className="skills-grid">
        <div>
          <p className="eyebrow">02 — Expertise</p>
          <h2 className="title">My skills</h2>
          <p className="section-lede">Four groups, learned in class and sharpened on projects.</p>
        </div>

        <ul className="skill-list">
          {SKILLS.map((group, index) => {
            const isOpen = open === index;
            return (
              <li className={`skill${isOpen ? " open" : ""}`} key={group.title}>
                <button
                  type="button"
                  className="skill-toggle"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span className="skill-index">0{index + 1}</span>
                  <span className="skill-title">{group.title}</span>
                  <span className="skill-count">{group.items.length} skills</span>
                  <span className="skill-plus">+</span>
                </button>
                {isOpen && (
                  <div className="skill-body">
                    <p className="skill-note">{group.note}</p>
                    <ul className="pills">
                      {group.items.map((item) => (
                        <li className="pill" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="wrap section">
      <div className="section-head">
        <div>
          <p className="eyebrow">03 — Career</p>
          <h2 className="title">Work experience</h2>
        </div>
        <p className="section-note">1 role so far</p>
      </div>

      <ol className="exp-list">
        {EXPERIENCE.map((job) => (
          <li className="exp" key={job.role + job.org}>
            <div>
              <p className="exp-period">{job.period}</p>
              <p className="exp-loc">{job.location}</p>
            </div>
            <div>
              <h3 className="exp-role">{job.role}</h3>
              <p className="exp-org">{job.org}</p>
              <ul className="exp-points">
                {job.points.map((point) => (
                  <li key={point.slice(0, 24)}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ── Education ──────────────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education" className="wrap section">
      <div className="edu-grid">
        <div>
          <p className="eyebrow">05 — Academia</p>
          <h2 className="title">My education</h2>
        </div>

        <div className="edu-card reveal">
          <div className="edu-top">
            <div>
              <h3 className="edu-degree">{EDUCATION.degree}</h3>
              <p className="edu-school">{EDUCATION.school}</p>
            </div>
            <p className="edu-gpa">GPA {EDUCATION.gpa}</p>
          </div>
          <p className="edu-meta">
            {EDUCATION.year} · {EDUCATION.status}
          </p>
          <div className="edu-courses">
            <p>Relevant coursework</p>
            <ul className="pills">
              {EDUCATION.courses.map((course) => (
                <li className="pill" key={course}>
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${INFO.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <footer id="contact" className="contact">
      <div className="wrap contact-inner">
        <div className="contact-grid">
          <div>
            <p className="contact-kicker">06 — Reach out</p>
            <h2>Let’s connect</h2>
            <p className="contact-copy">
              I’m currently open to new opportunities, collaborations, and cool projects. Whether you
              have a question or just want to say hi — my inbox is open.
            </p>

            <div className="contact-actions">
              <a className="email-btn" href={`mailto:${INFO.email}`}>
                {INFO.email} ↗
              </a>
              <p className="contact-note">Open to internships</p>
            </div>

            <ul className="socials">
              <li>
                <a href={INFO.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={INFO.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={`mailto:${INFO.email}`}>Email ↗</a>
              </li>
            </ul>
          </div>

          <form className="form" onSubmit={submit}>
            <p className="form-note">Or write a note — it opens your email app, ready to send.</p>
            <div className="form-row">
              <input
                className="field"
                required
                placeholder="Your name"
                aria-label="Your name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
              <input
                className="field"
                required
                type="email"
                placeholder="Email"
                aria-label="Email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </div>
            <textarea
              className="field"
              required
              placeholder="A few words about the project"
              aria-label="Message"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
            />
            <button className="form-submit" type="submit">
              Write the email
            </button>
            {sent && (
              <p className="form-sent">
                Opening your mail app. If nothing happens, email {INFO.email} directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Inter:wght@300..600&display=swap";
    document.head.appendChild(link);
    return () => {
      try {
        document.head.removeChild(link);
      } catch (_) {}
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        
        <Experience />
        <Education />
      </main>
      <Contact />
    </div>
  );
}