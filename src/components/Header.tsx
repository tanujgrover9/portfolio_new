import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect,  useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Process", id: "Process" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
];

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
          hidden md:flex
          sticky top-6  z-50
          left-1/2 -translate-x-1/2
          w-fit mx-auto
          items-center gap-1.5 rounded-full
          border border-white/15
          bg-black/60 backdrop-blur-2xl

          /* width increased */
          px-[22px] py-2

          shadow-[0_20px_80px_rgba(0,0,0,0.6)]
          overflow-hidden
        "
      >
        {/* Scroll progress bar */}
        <motion.span
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-400"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

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
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}

        {/* Hire Me CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollTo("contact")}
          className="
            ml-2 rounded-full px-5 py-2 text-sm font-semibold
            bg-green-500
            text-black shadow-[0_0_30px_rgba(34,197,94,0.5)]
          "
        >
          Hire Me
        </motion.button>
      </motion.nav>

      {/* ================= MOBILE TOGGLE ================= */}
      <div className="md:hidden sticky top-5 z-50 flex justify-end px-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen((p) => !p)}
          className="
            h-11 w-11 flex items-center justify-center
            rounded-full border border-white/15
            bg-black/70 backdrop-blur-xl
            text-white
          "
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </motion.button>
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
