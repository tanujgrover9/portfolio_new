import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Process", id: "Process" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

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
      {/* ================= DESKTOP NAV ================= */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          hidden md:flex
          fixed top-6 left-1/2 -translate-x-1/2 z-50
          items-center gap-1.5 rounded-full
          border border-white/15
          bg-black/60 backdrop-blur-2xl
          px-3 py-2
          shadow-[0_20px_80px_rgba(0,0,0,0.6)]
        "
      >
       

        {navItems.map((item) => {
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="
                relative px-4 py-2 rounded-full
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
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </motion.nav>

      {/* ================= MOBILE TOGGLE ================= */}
      <div className="md:hidden fixed top-5 right-5 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen((p) => !p)}
          className="
            h-11 w-11 flex items-center justify-center
            rounded-full border border-white/15
            bg-black/70 backdrop-blur-xl
            text-white
            shadow-[0_10px_40px_rgba(0,0,0,0.6)]
          "
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </motion.button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden fixed top-20 left-4 right-4 z-40
              rounded-2xl border border-white/15
              bg-black/80 backdrop-blur-2xl
              p-3 space-y-1
              shadow-[0_40px_120px_rgba(0,0,0,0.7)]
            "
          >
            {navItems.map((item) => {
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl
                    text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
