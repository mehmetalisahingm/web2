import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const projects = [
  {
    title: "Tradebot Engine",
    desc: "Modular crypto bot experiments focused on risk management, architecture, and iteration.",
    tags: ["Python", "Bot", "Risk"],
    icon: "cpu",
  },
  {
    title: "AI Workflow Lab",
    desc: "Prompt systems, AI tools, and agent-style product experiments for real workflows.",
    tags: ["AI", "Agents", "Tools"],
    icon: "brain",
  },
  {
    title: "Motion UI Studio",
    desc: "Frontend concepts with unusual animation, interaction depth, and strong visual identity.",
    tags: ["React", "Motion", "UI"],
    icon: "layers",
  },
];

const stack = [
  { name: "React", icon: "code" },
  { name: "Python", icon: "cpu" },
  { name: "FastAPI", icon: "database" },
  { name: "AI Systems", icon: "brain" },
];

const aboutItems = [
  {
    title: "Interactive identity",
    desc: "A portfolio that feels alive instead of static.",
  },
  {
    title: "Builder mindset",
    desc: "Focused on shipping, learning fast, and improving through real projects.",
  },
  {
    title: "Future-facing",
    desc: "Interested in AI products, backend systems, and standout interfaces.",
  },
];

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
    className,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 5 7 7-7 7" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
          <path d="M5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M9 19c-4 1.2-4-2-6-2" />
          <path d="M15 22v-3.1a3.3 3.3 0 0 0-.9-2.6c3 0 6-1.4 6-6.4A5 5 0 0 0 19 6.5 4.6 4.6 0 0 0 18.9 3S17.7 2.6 15 4.4a13.3 13.3 0 0 0-6 0C6.3 2.6 5.1 3 5.1 3A4.6 4.6 0 0 0 5 6.5 5 5 0 0 0 4 9.9c0 5 3 6.4 6 6.4a3.3 3.3 0 0 0-.9 2.6V22" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "brain":
      return (
        <svg {...common}>
          <path d="M9.5 3A3.5 3.5 0 0 0 6 6.5V7a3 3 0 0 0-2 2.8A3.2 3.2 0 0 0 6 13v1a3 3 0 0 0 3 3" />
          <path d="M14.5 3A3.5 3.5 0 0 1 18 6.5V7a3 3 0 0 1 2 2.8A3.2 3.2 0 0 1 18 13v1a3 3 0 0 1-3 3" />
          <path d="M12 3v18" />
          <path d="M9 8c.7.7 1 1.3 1 2s-.3 1.3-1 2" />
          <path d="M15 8c-.7.7-1 1.3-1 2s.3 1.3 1 2" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="m8 16-4-4 4-4" />
          <path d="m16 8 4 4-4 4" />
          <path d="m14 4-4 16" />
        </svg>
      );
    case "database":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="5" rx="7" ry="3" />
          <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
          <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );
    case "cpu":
      return (
        <svg {...common}>
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 16 9 5 9-5" />
        </svg>
      );
    case "rotate-left":
      return (
        <svg {...common}>
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v4h4" />
        </svg>
      );
    case "rotate-right":
      return (
        <svg {...common}>
          <path d="M21 12a9 9 0 1 1-3-6.7" />
          <path d="M21 4v4h-4" />
        </svg>
      );
    case "move":
      return (
        <svg {...common}>
          <path d="m12 2 2.5 2.5L12 7 9.5 4.5 12 2Z" />
          <path d="m12 22-2.5-2.5L12 17l2.5 2.5L12 22Z" />
          <path d="m2 12 2.5-2.5L7 12l-2.5 2.5L2 12Z" />
          <path d="m22 12-2.5 2.5L17 12l2.5-2.5L22 12Z" />
          <path d="M12 7v10M7 12h10" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

function CursorField() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });

  const shards = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        angle: (Math.PI * 2 * i) / 14,
        size: 4 + (i % 3) * 3,
        near: 12 + i * 2,
        far: 28 + i * 3,
        duration: 1.8 + (i % 4) * 0.25,
      })),
    []
  );

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div className="pointer-events-none fixed left-0 top-0 z-50" style={{ x: sx, y: sy }}>
      <div className="relative h-0 w-0">
        <motion.div
          className="absolute left-0 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/20 blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        {shards.map((s) => (
          <motion.span
            key={s.id}
            className="absolute left-0 top-0 rounded-full border border-white/20 bg-white/80"
            style={{ width: s.size, height: s.size, marginLeft: -s.size / 2, marginTop: -s.size / 2 }}
            animate={{
              x: [Math.cos(s.angle) * s.near, Math.cos(s.angle) * s.far, Math.cos(s.angle) * s.near],
              y: [Math.sin(s.angle) * s.near, Math.sin(s.angle) * s.far, Math.sin(s.angle) * s.near],
              scale: [0.7, 1.2, 0.7],
              opacity: [0.2, 0.95, 0.2],
            }}
            transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MagneticButton({ children, ghost = false, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.15);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.15);
  };

  return (
    <motion.button
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
        ghost
          ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
          : "border-fuchsia-400/40 bg-fuchsia-500/20 text-white hover:bg-fuchsia-500/30"
      } ${className}`}
    >
      <span className="inline-flex items-center gap-2">
        {children}
        <Icon name="arrow" className="h-4 w-4" />
      </span>
    </motion.button>
  );
}

function TiltCard({ children, className = "", rotateZ = 0, drag = false }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 14);
    rx.set((0.5 - py) * 14);
  };

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        drag={drag}
        dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
        dragElastic={0.15}
        dragMomentum={false}
        onPointerMove={onMove}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
        style={{ rotateX: srx, rotateY: sry, rotateZ }}
        className={`relative [transform-style:preserve-3d] ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.18),transparent_26%),radial-gradient(circle_at_80%_25%,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_50%_70%,rgba(236,72,153,0.14),transparent_28%)]" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between py-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/45">Portfolio</p>
          <p className="text-lg font-semibold text-white">Mehmet</p>
        </div>
        <div className="hidden gap-8 text-sm text-white/65 md:flex">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70">
            <Icon name="spark" className="h-3.5 w-3.5 text-fuchsia-300" />
            Software engineer • AI builder
          </div>
          <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
            Mehmet builds
            <span className="block bg-gradient-to-r from-fuchsia-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              intense digital experiences.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
            I care about products that feel engineered, visually memorable, and full of momentum. Frontend presence, backend thinking, and AI curiosity all meet here.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <MagneticButton>See Projects</MagneticButton>
            <MagneticButton ghost>
              <Icon name="github" className="h-4 w-4" />
              GitHub Presence
            </MagneticButton>
          </div>
        </div>

        <TiltCard className="rounded-[2rem] border border-white/15 bg-white/8 p-4 shadow-[0_0_80px_rgba(99,102,241,0.14)] backdrop-blur-2xl">
          <div className="rounded-[1.6rem] border border-white/10 bg-[#0b1021]/80 p-5">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/40">Live Identity</p>
                <p className="mt-1 text-lg font-semibold text-white">Mehmet.exe</p>
              </div>
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-fuchsia-400" />
                <span className="h-3 w-3 rounded-full bg-cyan-400" />
                <span className="h-3 w-3 rounded-full bg-violet-400" />
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-white/45">Builder Mode</p>
                <p className="mt-2 text-3xl font-black text-white">Always On</p>
                <div className="mt-5 space-y-3">
                  {[
                    ["Frontend", 92],
                    ["Backend", 87],
                    ["AI", 89],
                    ["Momentum", 95],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="mb-1 flex justify-between text-xs text-white/50">
                        <span>{label}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${value}%` }}
                          viewport={{ once: true }}
                          className="h-2 rounded-full bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-violet-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-white/45">Focus</p>
                  <p className="mt-2 text-xl font-bold text-white">Systems + Motion + AI</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-white/45">Direction</p>
                  <p className="mt-2 text-xl font-bold text-white">Build memorable things</p>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300/80">About</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
          Not a static résumé.
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {aboutItems.map((item) => (
          <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-xl font-semibold text-white">{item.title}</p>
            <p className="mt-3 text-sm leading-7 text-white/60">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [selected, setSelected] = useState(0);
  const [rotations, setRotations] = useState([0, -6, 8]);

  const turn = (value, all = false) => {
    setRotations((prev) => prev.map((r, i) => (all || i === selected ? r + value : r)));
  };

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Projects</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            Grab the work.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-white/55">
          Hover for tilt, drag cards around, and rotate the active card. The portfolio itself becomes an interaction demo.
        </p>
      </div>

      <div className="grid gap-8 rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl lg:grid-cols-[0.72fr_1.28fr] lg:p-8">
        <div className="rounded-[2rem] border border-white/10 bg-[#0a1020]/80 p-5">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">Project Dock</p>
          <p className="mt-2 text-xl font-semibold text-white">Active: {projects[selected].title}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {projects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setSelected(i)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  selected === i ? "border-fuchsia-300/40 bg-fuchsia-500/12 text-white" : "border-white/10 bg-white/5 text-white/65"
                }`}
              >
                {p.title}
              </button>
            ))}
            <button onClick={() => setRotations([0, -6, 8])} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
              Reset
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button onClick={() => turn(-12)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
              <span className="inline-flex items-center gap-2"><Icon name="rotate-left" className="h-4 w-4" /> Left</span>
            </button>
            <button onClick={() => turn(12)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
              <span className="inline-flex items-center gap-2"><Icon name="rotate-right" className="h-4 w-4" /> Right</span>
            </button>
            <button onClick={() => turn(-10, true)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">All Left</button>
            <button onClick={() => turn(10, true)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">All Right</button>
          </div>
        </div>

        <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-[#070b18] p-4 sm:p-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <TiltCard
              key={p.title}
              drag
              rotateZ={rotations[i]}
              className={`h-[260px] rounded-[1.8rem] border p-5 backdrop-blur-xl ${
                selected === i ? "border-fuchsia-300/30 bg-white/10" : "border-white/10 bg-white/5"
              }`}
            >
              <button onClick={() => setSelected(i)} className="flex h-full w-full flex-col justify-between text-left">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/45">{rotations[i]}°</span>
                </div>
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/55">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{p.desc}</p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs text-white/45">
                  <Icon name="move" className="h-4 w-4" /> Drag / Tilt / Rotate
                </div>
              </button>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Stack</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Current orbit.</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stack.map((item) => (
          <div key={item.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-fuchsia-200">
              <Icon name={item.icon} className="h-6 w-6" />
            </div>
            <p className="mt-5 text-xl font-semibold text-white">{item.name}</p>
            <p className="mt-2 text-sm text-white/55">Part of the portfolio direction.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="mx-auto max-w-7xl px-6 pb-14 pt-6 lg:px-10">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-6 backdrop-blur-xl md:flex md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">Let’s build something memorable.</p>
          <p className="mt-2 max-w-2xl text-sm text-white/55">
            Replace the placeholder contact details with your real GitHub and mail, then push it as your first strong portfolio commit.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/65">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2"><Icon name="mail" className="h-4 w-4" /> contact@yourmail.dev</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2"><Icon name="github" className="h-4 w-4" /> github.com/yourusername</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <MagneticButton>Start Conversation</MagneticButton>
        </div>
      </div>
    </footer>
  );
}

function DevChecks() {
  const errors = [];

  if (projects.length !== 3) errors.push("Expected 3 projects");
  if (!stack.every((item) => item.name && item.icon)) errors.push("Every stack item needs name and icon");
  if (!projects.every((item) => item.tags.length >= 1)) errors.push("Every project needs at least one tag");

  if (errors.length > 0) {
    return (
      <div className="hidden">
        {errors.join(", ")}
      </div>
    );
  }

  return null;
}

export default function AnimatedExperimentalLandingPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white selection:bg-fuchsia-500/30">
      <DevChecks />
      <CursorField />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Contact />
    </main>
  );
}
