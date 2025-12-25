import { useEffect } from "react";
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

/* ================= HERO ================= */
export default function Hero() {
  /* Cursor spotlight */
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
    radial-gradient(380px at ${smoothX}px ${smoothY}px,
      rgba(34,197,94,0.08),
      transparent 70%)
  `;

  /* Editor tilt */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const tiltX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const tiltY = useSpring(rotateY, { stiffness: 120, damping: 20 });

  const handleEditorMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rotateX.set(-(y / rect.height - 0.5) * 10);
    rotateY.set((x / rect.width - 0.5) * 10);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section className="relative min-h-screen overflow-hidden p-12">
      {/* ===== STRIPE STYLE BACKGROUND ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#020617_0%,#0b3c5d_45%,#0f172a_100%)]" />
        <div
          className="absolute bottom-0 left-0 right-0 h-[45%] bg-black"
          style={{
            clipPath: "polygon(0 25%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>

      {/* Spotlight */}
      <motion.div className="absolute inset-0" style={{ background: glow }} />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto pt-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        <div className="space-y-8">
          <span className="inline-flex rounded-full bg-white/60 px-4 py-1.5 text-sm text-black/80 backdrop-blur font-handwriting">
            Frontend Engineer · Creative Technologist
          </span>

          <h1
            className="text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] font-semibold
  bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white
  bg-clip-text text-transparent"
          >
            Designing & engineering
            <br />
            premium interfaces
          </h1>

          <p className="max-w-xl text-lg text-white leading-relaxed ">
            I’m <span className="text-white font-medium">Anshuman Singh</span> —
            a frontend engineer crafting scalable React systems and AI-powered
            automations using OpenAI, n8n & modern motion design.
          </p>

          <div className="flex gap-4 pt-4">
            <a href="#projects">
              <MagneticButton className="rounded-full bg-emerald-500 px-8 py-3 text-sm font-medium text-black">
                View Projects
              </MagneticButton>
            </a>

            <a href="https://drive.google.com/file/d/1fvxwJD3-C-J0p6nBcLPvdLS7ZsRIp2g7/view">
              <MagneticButton className="rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-white hover:bg-black/5">
                Download CV
              </MagneticButton>
            </a>
          </div>
        </div>

        {/* RIGHT — VS CODE */}
        <div className="relative flex justify-center">
          <motion.div
            onMouseMove={handleEditorMove}
            onMouseLeave={resetTilt}
            style={{ rotateX: tiltX, rotateY: tiltY }}
            className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#0b0b0c] shadow-[0_60px_160px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-white/40">portfolio.tsx</span>
            </div>

            <pre className="p-6 text-sm font-mono leading-relaxed whitespace-pre-wrap text-[#e5e7eb]">
              <code>
                {" "}
                <span className="text-[#c792ea]">
                  export default function
                </span>{" "}
                <span className="text-[#82aaff]">Portfolio</span>() {"{"}{" "}
                {"\n "} <span className="text-[#c792ea]">return</span> ( {"\n "}{" "}
                <span className="text-[#89ddff]">&lt;section</span>{" "}
                <span className="text-[#82aaff]">className</span>{" "}
                <span className="text-[#89ddff]">=</span>{" "}
                <span className="text-[#ecc48d]">"experience"</span>{" "}
                <span className="text-[#89ddff]">&gt;</span> {"\n "}{" "}
                <span className="text-[#89ddff]">&lt;h1&gt;</span> Frontend
                Engineer <span className="text-[#89ddff]">&lt;/h1&gt;</span>{" "}
                {"\n\n "} <span className="text-[#89ddff]">&lt;p&gt;</span> I
                build scalable SaaS products with React, motion, and modern UI
                systems. <span className="text-[#89ddff]">&lt;/p&gt;</span>{" "}
                {"\n\n "} <span className="text-[#89ddff]">&lt;p&gt;</span> I
                design AI automation using OpenAI, n8n, and Zapier to streamline
                workflows. <span className="text-[#89ddff]">&lt;/p&gt;</span>{" "}
                {"\n\n "} <span className="text-[#89ddff]">&lt;p&gt;</span>{" "}
                Focused on performance, clarity, and real business impact.{" "}
                <span className="text-[#89ddff]">&lt;/p&gt;</span> {"\n "}{" "}
                <span className="text-[#89ddff]">&lt;/section&gt;</span> {"\n "}{" "}
                ); {"\n}"}{" "}
                <span className="animate-pulse text-white/40">▍</span>{" "}
              </code>
            </pre>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -right-6 top-12 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white flex items-center gap-2"
          >
            <SiOpenai /> AI Automation
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute -left-6 bottom-12 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white flex items-center gap-2"
          >
            <FaReact /> React Systems
          </motion.div>
        </div>
      </div>

      {/* SOCIAL */}
      <div className="fixed right-6 bottom-10 z-50 flex flex-col gap-4 text-black/60">
        <a
          href="https://www.linkedin.com/in/anshuman-singh7/"
          className="hover:text-black"
        >
          <FaLinkedin />
        </a>
        <a href="https://github.com/tanujgrover9" className="hover:text-black">
          <FaGithub />
        </a>
      </div>
    </section>
  );
}
