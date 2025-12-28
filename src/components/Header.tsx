import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Process", id: "Process" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
];

const avatarUrl = "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_3.png";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  /* ===== Scroll progress ===== */
  const { scrollYProgress } = useScroll();

  /* ===== Scroll spy ===== */
  useEffect(() => {
    const onScroll = () => {
      navItems.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setOpen(false);
  };

  return (
    <>
      {/* ================= DESKTOP STICKY NAV ================= */}
      <motion.nav
        className="
    hidden md:block
    sticky top-4 z-50
    w-full
  "
      >
        {/* Glass background */}
        <div
          className="
      relative
      mx-auto
      max-w-[1400px]
      rounded-full
      
      bg-black/60 backdrop-blur-2xl
      px-6 py-2
      shadow-[0_20px_80px_rgba(0,0,0,0.6)]
      overflow-hidden
    "
        >
          {/* Scroll progress bar */}
          <motion.span
            className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-emerald-400 to-cyan-400"
            style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
          />

          {/* CONTENT ROW */}
          <div className="flex items-center justify-between">
            {/* LEFT — Avatar + Name */}
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl}
                alt="Anshuman Singh"
                className="h-9 w-9 rounded-full ring-1 ring-white/20 bg-white/10"
              />
              <span className="text-sm font-semibold text-white/90 whitespace-nowrap">
                Anshuman Singh
              </span>
            </div>

            {/* CENTER — Nav items */}
            <div className="flex items-center gap-1.5">
              {navItems.map((item) => {
                const isActive = active === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="
                relative
                px-4 py-2 rounded-full
                text-sm font-medium transition
                text-white/70 hover:text-white
              "
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="
                    absolute inset-0 rounded-full
                    bg-gradient-to-r from-emerald-400/20 to-cyan-400/20
                    ring-1 ring-white/20
                    shadow-[0_0_25px_rgba(34,197,94,0.35)]
                  "
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 22,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT — CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("contact")}
              className="
          rounded-full px-5 py-2 text-sm font-semibold
          bg-green-500
          text-black shadow-[0_0_30px_rgba(34,197,94,0.5)]
        "
            >
              Hire Me
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ================= MOBILE TOP BAR ================= */}
<div className="md:hidden sticky top-4 z-50 px-4">
  <div
    className="
      flex items-center justify-between
      rounded-full border border-white/15
      bg-black/70 backdrop-blur-2xl
      px-4 py-2
      shadow-[0_20px_80px_rgba(0,0,0,0.6)]
    "
  >
    {/* LEFT — Avatar + Name */}
    <div className="flex items-center gap-3">
      <img
        src={avatarUrl}
        alt="Anshuman Singh"
        className="h-9 w-9 rounded-full ring-1 ring-white/20"
      />
      <span className="text-sm font-semibold text-white whitespace-nowrap">
        Anshuman Singh
      </span>
    </div>

    {/* RIGHT — Hamburger */}
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setOpen((p) => !p)}
      className="
        h-10 w-10 flex items-center justify-center
        rounded-full border border-white/15
        bg-black/60 backdrop-blur-xl
        text-white
      "
    >
      {open ? <X size={18} /> : <Menu size={18} />}
    </motion.button>
  </div>
</div>


      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden fixed top-20 left-4 right-4 z-40
              rounded-2xl border border-white/15
              bg-black/80 backdrop-blur-2xl
              p-3 space-y-1
            "
          >
            {/* Mobile avatar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <img
                src={avatarUrl}
                alt="Anshuman Singh"
                className="h-10 w-10 rounded-full ring-1 ring-white/20"
              />
              <span className="text-sm font-semibold text-white">
                Anshuman Singh
              </span>
            </div>

            {[...navItems, { label: "Hire Me", id: "contact" }].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="
                  w-full text-left px-4 py-3 rounded-xl
                  text-sm font-medium transition
                  text-white/70 hover:bg-white/5 hover:text-white
                "
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
