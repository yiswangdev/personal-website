// ============================================================
//  PORTFOLIO.JSX  — Gold Circuit Board Theme
//  Single-page dark portfolio with PCB / gold aesthetic
//  Edit each section labeled with // SECTION: <Name>
// ============================================================

import { useState, useEffect, useRef } from "react";
import "./App.css";


// ─────────────────────────────────────────────
//  DATA  — edit all of these
// ─────────────────────────────────────────────

// SECTION: Personal Info
const INFO = {
  name: "Yisong (Eric) Wang",
  initials: "YW",
  tagline: "Computer Science @ SJSU",
  school: "San Jose State University",
  location: "San Jose, CA",
  email: "eric.wang02@sjsu.edu",
  github: "https://github.com/yiswangdev",
  linkedin: "https://www.linkedin.com/in/yisongw/",
  resume: "#",
};

// SECTION: Typewriter roles
const ROLES = [
  "Computer Science Student",
  "Aspiring Software Developer",
  "Beginner Full-Stack Learner",
  "UI/UX Learner",
  "Problem Solver",
];

// SECTION: About Me
const ABOUT = {
  bio: [
    "While pursuing a bachelor’s degree in computer science at San José State University, I gain strong foundation in software development, problem-solving, and systems thinking.",
    "Beyond the classroom, my experience in part-time roles and clubs has strengthened my teamwork, communication, and resilience.",
    "Balancing work and academics has taught me how to adapt quickly, stay organized, and perform effectively in fast-paced environments.",
    "I am very passionate about continuously learn about computer science and also in the professional and interpersonal skills that help turn technical knowledge into real-world impact.",
    "I’m actively seeking opportunities where I can grow as a developer, contribute to meaningful projects, and collaborate with others who are driven to create change for the better."
  ],
  stats: [
    { num: "San Jose State University", label: "College" },
    { num: "Computer Science", label: "Major" },
    { num: "2028", label: "Grad Year" },
  ],
};

// SECTION: Skills
const SKILLS = [
  {
    category: "Languages",
    icon: "⌨️",
    skills: ["Python", "JavaScript", "Java"],
  },
  {
    category: "Frontend",
    icon: "🖥️",
    skills: ["React", "HTML", "CSS", "Next.js", "TypeScript"],
  },
  {
    category: "Backend & Tools",
    icon: "⚙️",
    skills: ["Node.js", "FastAPI", "Express", "MongoDB"],
  },
  {
    category: "Other",
    icon: "🔗",
    skills: ["Git", "FIgma", "Data Structures", "Algorithms"],
  },
];

// SECTION: Experience
const EXPERIENCE = [
  {
    role: "Intern",
    company: "Software and Computer Engineering Society (SJSU)",
    date: "Dec 2025 – Feb 2026",
    bullets: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.",
      "Ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation.",
      "Duis aute irure dolor reprehenderit voluptate velit esse cillum dolore fugiat.",
    ],
  },
];

// SECTION: Projects
const PROJECTS = [
  {
    title: "PCSeekers",
    desc: "A web application to help users find deals on computer parts across multiple retailers, built with Next.JS and FastAPI.",
    tags: ["Next.js", "FastAPI", "Vercel", "Python", "JavaScript", "Web Scraping"],
    github: "https://github.com/yiswangdev/pc-deals-website",
    live: "https://pc-seekers.vercel.app/",
  },
];

// SECTION: Education
const EDUCATION = {
  degree: "B.S. Computer Science",
  school: "San Jose State University",
  year: "2024 – Present",
  gpa: "3.7",
  status: "Expected May 2028",
  courses: ["Data Structures", "Algorithms", "Discrete Math", "Calculus"],
};

// ─────────────────────────────────────────────
//  CIRCUIT BOARD PARTICLES
// ─────────────────────────────────────────────
function Particles() {
  const dots = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2.5 + 1,
    delay: Math.random() * 14,
    duration: 12 + Math.random() * 14,
    opacity: 0.15 + Math.random() * 0.35,
  }));

  // gold / amber only — no magenta / cyan
  const colors = ["var(--gold)", "var(--amber)", "var(--gold-mid)", "#e8d5a0"];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {dots.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            left: d.left,
            bottom: 0,
            width: d.size,
            height: d.size,
            borderRadius: d.id % 3 === 0 ? "0" : "50%",
            transform: d.id % 3 === 0 ? "rotate(45deg)" : "none",
            background: colors[d.id % colors.length],
            opacity: d.opacity,
            animation: `particleDrift ${d.duration}s ${d.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
//  CIRCUIT BOARD SVG OVERLAY (hero bg)
// ─────────────────────────────────────────────
function CircuitOverlay() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12, pointerEvents: "none", zIndex: 1 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Non-parallel traces routed with L-bends */}
      <path d="M0 180 L120 180 L120 80 L320 80" fill="none" stroke="#d4a017" strokeWidth="1"/>
      <path d="M0 320 L80 320 L80 240 L220 240 L220 160 L400 160" fill="none" stroke="#b8860b" strokeWidth="1.2"/>
      <path d="M100% 100 L-80 100 L-80 260 L-240 260" fill="none" stroke="#c49a00" strokeWidth="0.8" transform="translate(800,0)"/>
      <path d="M600 0 L600 140 L480 140 L480 260 L340 260" fill="none" stroke="#d4a017" strokeWidth="1"/>
      <path d="M720 300 L640 300 L640 200 L500 200 L500 400" fill="none" stroke="#b8860b" strokeWidth="0.8"/>
      <path d="M0 450 L180 450 L180 360 L300 360 L300 280 L440 280" fill="none" stroke="#c49a00" strokeWidth="1"/>
      {/* Via pads */}
      {[
        [120, 180], [320, 80], [80, 320], [220, 240], [220, 160],
        [600, 140], [480, 140], [480, 260], [640, 300], [640, 200],
        [180, 450], [180, 360], [300, 360], [300, 280],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={4} fill="none" stroke="#d4a017" strokeWidth="0.8" opacity="0.6"/>
          <circle cx={cx} cy={cy} r={1.5} fill="#d4a017" opacity="0.7"/>
        </g>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────
//  TYPEWRITER HOOK
// ─────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timeout;
    if (!deleting) {
      if (charIdx < word.length) {
        timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
        setDisplay(word.slice(0, charIdx + 1));
      } else {
        timeout = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
        setDisplay(word.slice(0, charIdx - 1));
      } else {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ─────────────────────────────────────────────
//  INTERSECTION OBSERVER HOOK
// ─────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─────────────────────────────────────────────
//  ICONS
// ─────────────────────────────────────────────
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

// ─────────────────────────────────────────────
//  NAV
// ─────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 60;
      if (atBottom) { setActive("Contact"); return; }
      const ids = NAV_LINKS.map((l) => l.toLowerCase());
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(NAV_LINKS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {/* SECTION: Nav Logo */}
          {INFO.initials}_
        </div>

        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l} className={`nav-link${active === l ? " active" : ""}`} onClick={() => scrollTo(l)}>
              {l}
            </li>
          ))}
        </ul>

        <div className="nav-burger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span style={{ transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </div>
      </nav>

      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(8,12,10,0.97)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 36,
        }}>
          {NAV_LINKS.map((l) => (
            <div key={l}
              onClick={() => scrollTo(l)}
              style={{
                fontFamily: "var(--font-head)", fontSize: 22, letterSpacing: 4,
                textTransform: "uppercase", color: "var(--cream)", cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseOver={e => e.target.style.color = "var(--gold)"}
              onMouseOut={e => e.target.style.color = "var(--cream)"}
            >
              {l}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
//  HERO
// ─────────────────────────────────────────────
function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section id="hero" className="hero">
      {/* Background orbs — warm gold/amber tones only */}
      <div className="hero-bg-orb" style={{ width: 500, height: 500, top: "5%", left: "55%", background: "rgba(212,160,23,0.06)" }} />
      <div className="hero-bg-orb" style={{ width: 350, height: 350, top: "55%", left: "2%", background: "rgba(196,154,0,0.05)" }} />
      <div className="hero-bg-orb" style={{ width: 280, height: 280, bottom: "10%", right: "8%", background: "rgba(184,134,11,0.04)" }} />

      <CircuitOverlay />
      <Particles />

      <div className="hero-content">
        {/* SECTION: Hero tag */}
        <div className="hero-tag fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
          SYS.INIT // BOOT SEQUENCE
        </div>

        <div className="hero-name fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          {/* SECTION: Your Name */}
          I'm <span>{INFO.name}</span>
        </div>

        <div className="hero-subtitle fade-up" style={{ animationDelay: "0.35s", opacity: 0 }}>
          {/* SECTION: School & Location */}
          <span>{INFO.school}</span>
          <span className="dot">◆</span>
          <span>{INFO.location}</span>
        </div>

        <div className="hero-typewriter fade-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
          {typed}<span className="hero-cursor" />
        </div>

        <div className="hero-cta fade-up" style={{ animationDelay: "0.65s", opacity: 0 }}>
          {/* SECTION: CTA Buttons */}
          <a className="btn btn-primary" href={INFO.resume}>
            Download Resume
          </a>
          <button className="btn btn-outline" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
            Get In Touch ↓
          </button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  ABOUT
// ─────────────────────────────────────────────
function About() {
  const [ref, visible] = useReveal();

  return (
    <section id="about" ref={ref}>
      <div className="section">
        <div className="section-label">01 // Introduction</div>
        <h2 className="section-title">About <span>Me</span></h2>

        <div className="about-grid">
          {/* SECTION: Profile Photo — replace emoji with your photo */}
          <div className="about-photo-wrap" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-20px)", transition: "all 0.7s ease" }}>
            <div className="about-photo-border floating">
              <div className="about-photo">👤</div>
              {/* Replace ↑ with: <img src="your-photo.jpg" alt="Your Name" className="about-photo" /> */}
              <div className="about-photo-corner tl" />
              <div className="about-photo-corner tr" />
              <div className="about-photo-corner bl" />
              <div className="about-photo-corner br" />
            </div>
          </div>

          {/* SECTION: About Text */}
          <div className="about-text" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(20px)", transition: "all 0.7s 0.2s ease" }}>
            {ABOUT.bio.map((p, i) => <p key={i}>{p}</p>)}

            {/* SECTION: Stats */}
            <div className="about-stats">
              {ABOUT.stats.map((s) => (
                <div className="stat-box" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  SKILLS
// ─────────────────────────────────────────────
function Skills() {
  const [ref, visible] = useReveal();

  return (
    <section
      id="skills"
      ref={ref}
      style={{ background: "linear-gradient(180deg, transparent, var(--bg2) 20%, var(--bg2) 80%, transparent)" }}
    >
      <div className="section">
        <div className="section-label">02 // Expertise</div>
        <h2 className="section-title">My <span>Skills</span></h2>

        {/* SECTION: Skills Data */}
        <div className="skills-grid">
          {SKILLS.map((cat, ci) => (
            <div
              className="skill-category"
              key={cat.category}
              style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `all 0.5s ${ci * 0.1}s ease` }}
            >
              <div className="skill-cat-title">
                <span className="skill-cat-icon">{cat.icon}</span>
                {cat.category}
              </div>
              <div className="skill-pills">
                {cat.skills?.map((skill) => (
                  <span className="skill-pill" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  EXPERIENCE
// ─────────────────────────────────────────────
function Experience() {
  const [ref, visible] = useReveal();

  return (
    <section id="experience" ref={ref}>
      <div className="section">
        <div className="section-label">03 // Career</div>
        <h2 className="section-title">Work <span>Experience</span></h2>

        {/* SECTION: Experience Data */}
        <div className="timeline">
          {EXPERIENCE.map((exp, i) => (
            <div
              className="timeline-item"
              key={i}
              style={{ animationDelay: `${i * 0.15}s`, animationPlayState: visible ? "running" : "paused" }}
            >
              <div className="timeline-dot" />
              <div className="exp-card">
                <div className="exp-top">
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-date">{exp.date}</div>
                </div>
                <div className="exp-company">▸ {exp.company}</div>
                <ul className="exp-desc">
                  {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  PROJECTS
// ─────────────────────────────────────────────
function Projects() {
  const [ref, visible] = useReveal();

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="projects"
      ref={ref}
      style={{ background: "linear-gradient(180deg, transparent, var(--bg2) 20%, var(--bg2) 80%, transparent)" }}
    >
      <div className="section">
        <div className="section-label">04 // Portfolio</div>
        <h2 className="section-title">Featured <span>Projects</span></h2>

        {/* SECTION: Projects Data */}
        <div className="projects-grid">
          {PROJECTS.map((proj, i) => (
            <div
              className="project-card"
              key={i}
              style={{ animationDelay: `${i * 0.12}s`, animationPlayState: visible ? "running" : "paused" }}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            >
              <div className="project-num">// 0{i + 1}</div>
              <div className="project-title">{proj.title}</div>
              <div className="project-desc">{proj.desc}</div>
              <div className="project-tags">
                {proj.tags.map((t) => <span className="project-tag" key={t}>{t}</span>)}
              </div>
              <div className="project-links">
                <a className="project-link" href={proj.github}>
                  <GithubIcon /> Code
                </a>
                {proj.live && (
                  <a className="project-link" href={proj.live}>
                    <ExternalIcon /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  EDUCATION
// ─────────────────────────────────────────────
function Education() {
  const [ref, visible] = useReveal();

  return (
    <section id="education" ref={ref}>
      <div className="section">
        <div className="section-label">05 // Academia</div>
        <h2 className="section-title">My <span>Education</span></h2>

        {/* SECTION: Education Data */}
        <div
          className="edu-card"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.7s ease" }}
        >
          {/* SECTION: School Logo — replace emoji with your school's logo */}
          <div className="edu-logo">🎓</div>
          <div>
            <div className="edu-degree">{EDUCATION.degree}</div>
            <div className="edu-school">{EDUCATION.school}</div>
            <div className="edu-meta">{EDUCATION.year} &nbsp;·&nbsp; GPA: {EDUCATION.gpa}</div>
            <div className="edu-badge">{EDUCATION.status}</div>
            <div className="tech-pills" style={{ marginTop: 14 }}>
              {EDUCATION.courses.map((c) => <span className="pill" key={c}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  CONTACT
// ─────────────────────────────────────────────
function Contact() {
  const [ref, visible] = useReveal();

  return (
    <section id="contact" ref={ref}>
      {/* SECTION: Contact — edit links in INFO at the top */}
      <div
        className="contact-wrap"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.7s ease" }}
      >
        <div className="section-label" style={{ justifyContent: "center" }}>06 // Reach Out</div>
        <h2>
          Let's <span style={{ color: "var(--gold)", textShadow: "var(--glow-g)" }}>Connect</span>
        </h2>
        <p>
          I'm currently open to new opportunities, collaborations, and cool projects.
          Whether you have a question or just want to say hi — my inbox is open.
        </p>
        <a className="btn btn-primary" href={`mailto:${INFO.email}`} style={{ display: "inline-block", marginBottom: 48 }}>
          Say Hello ↗
        </a>

        <div className="social-links">
          <a className="social-link" href={INFO.github} title="GitHub"><GithubIcon /></a>
          <a className="social-link" href={INFO.linkedin} title="LinkedIn"><LinkedinIcon /></a>
          <a className="social-link" href={`mailto:${INFO.email}`} title="Email"><MailIcon /></a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  ROOT APP
// ─────────────────────────────────────────────
export default function Portfolio() {
  // Load fonts on mount
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch (_) {} };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      {/* SECTION: Footer */}
      <footer>
        <span>
          Designed &amp; Built by{" "}
          <span style={{ color: "var(--gold)" }}>{INFO.name}</span>
          {" "}·{" "}
          {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}