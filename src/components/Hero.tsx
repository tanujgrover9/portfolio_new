import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { FaGithub, FaLinkedin, FaReact } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

/* ================= MAGNETIC BUTTON ================= */
function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.button
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ================= TYPEWRITER ================= */
const CODE = `export default function Portfolio() {
  return (
    <section className="experience">
      <h1>Frontend Engineer</h1>

      <p>
        I build scalable, high-performance
        interfaces with React, motion,
        and modern design systems.
      </p>

      <p>
        I also design AI-powered workflows
        using OpenAI, n8n, and Zapier to
        automate products and operations.
      </p>
    </section>
  );
}`;


function useTypewriter(text: string, speed = 28) {
  const [value, setValue] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setValue(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return value;
}

export default function Hero() {
  /* ================= CURSOR GLOW ================= */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const glow = useMotionTemplate`
    radial-gradient(600px at ${smoothX}px ${smoothY}px,
      rgba(16,185,129,0.18),
      transparent 75%)
  `;

  const typedCode = useTypewriter(CODE);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden p-12">
      {/* Cursor Glow */}
      <motion.div className="absolute inset-0" style={{ background: glow }} />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      {/* ================= HERO GRID ================= */}
      <div className="relative z-10 max-w-10xl mx-auto px-6 pt-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* ================= LEFT ================= */}
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70 font-handwriting w-fit">
            Frontend Engineer · Creative Technologist
          </span>

         <h1 className="text-[clamp(3rem,6vw,5.8rem)] leading-[1.05] font-semibold">
  <span className="block bg-white bg-clip-text text-transparent">
    Designing & engineering
  </span>
</h1>

<p className="mt-6 max-w-xl text-lg text-white/65 leading-relaxed">
  I’m{" "}
  <span className="relative font-handwriting text-white">
    <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 blur-lg opacity-30" />
    Anshuman Singh
  </span>{" "}
  — a frontend engineer who builds fast, scalable interfaces and
  automation-driven systems. I work at the intersection of{" "}
  <span className="text-white">React</span>,{" "}
  <span className="text-white">motion design</span>, and{" "}
  <span className="text-white">
    AI automation (n8n, Zapier, OpenAI)
  </span>{" "}
  to turn complex workflows into clean, reliable products.
</p>


          <div className="flex gap-4 pt-4">
            <MagneticButton className="rounded-full bg-emerald-400 px-8 py-3 text-sm font-medium text-black">
              View Projects
            </MagneticButton>
            <MagneticButton className="rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white hover:bg-white/10">
              Contact
            </MagneticButton>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative flex justify-center">
          {/* Code Editor */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-[420px]
                       rounded-3xl border border-white/10 bg-[#0d0d0d]
                       shadow-[0_60px_160px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-white/50">portfolio.tsx</span>
            </div>

            <pre className="p-6 text-sm text-white/80 font-mono leading-relaxed whitespace-pre-wrap">
              {typedCode}
              <span className="animate-pulse">▍</span>
            </pre>
          </motion.div>

          {/* Floating Pills */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -right-6 top-12
                       rounded-xl border border-white/10 bg-white/5 backdrop-blur
                       px-4 py-2 text-sm font-handwriting text-white/70 flex items-center gap-2"
          >
            <SiOpenai className="text-emerald-400" /> AI Automation
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute -left-6 bottom-12
                       rounded-xl border border-white/10 bg-white/5 backdrop-blur
                       px-4 py-2 text-sm font-handwriting text-white/70 flex items-center gap-2"
          >
            <FaReact className="text-cyan-400" /> React Systems
          </motion.div>
        </div>
      </div>

      {/* SOCIAL */}
      <div className="fixed right-6 bottom-10 z-50 flex flex-col gap-4 text-white/60 ">
        <a href="#" className="hover:text-white transition">
          <FaLinkedin />
        </a>
        <a href="#" className="hover:text-white transition">
          <FaGithub />
        </a>
      </div>
    </section>
  );
}
