import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Calendar, Trophy, Image as ImageIcon, User, Layers } from "lucide-react";

const ITEMS = [
  { label: "Início", Icon: Home, href: "#" },
  { label: "Calendário", Icon: Calendar, href: "#jornada-anual" },
  { label: "Status", Icon: Layers, href: "#desempenho" },
  { label: "Ranking", Icon: Trophy, href: "#" },
  { label: "Perfil", Icon: User, href: "#perfil" },
];

interface BottomNavProps {
  fullWidth?: boolean;
}

export function BottomNav({ fullWidth = false }: BottomNavProps) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // Synchronize active state based on hash if needed, or just let the manual click handle it
  // For simplicity, we keep the manual state

  return (
    <nav
      className={`relative flex items-end bg-[var(--section-bg)]/80 backdrop-blur-2xl border border-white/5 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
        fullWidth ? "w-full justify-evenly rounded-2xl px-4" : "rounded-3xl px-4 gap-2"
      }`}
    >
      {ITEMS.map((item, i) => {
        const isActive = i === active;
        const isHovered = hovered === i;

        return (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setActive(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={`relative flex h-16 flex-col items-center justify-center overflow-visible outline-none transition-all duration-300 rounded-xl hover:bg-white/5 sm:h-[68px] no-underline ${
              fullWidth ? "flex-1 mx-1" : "w-16 sm:w-[70px]"
            }`}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && !isActive && (
                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: -45, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="pointer-events-none absolute top-1/2 z-20 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#050505] shadow-[0_10px_30px_rgba(255,255,255,0.1)] ring-1 ring-white/10"
                >
                  {item.label}
                  <span className="absolute left-1/2 top-full -translate-x-1/2 border-6 border-transparent border-t-white" />
                </motion.span>
              )}
            </AnimatePresence>

            <motion.span
              animate={{ 
                y: isActive ? -12 : 0,
                scale: isActive ? 1.1 : 1,
                color: isActive ? "var(--glow-orange)" : "#A1A1AA"
              }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="relative z-10 flex items-center justify-center"
            >
              <item.Icon
                className="h-6 w-6"
                strokeWidth={isActive ? 2.5 : 2}
              />
            </motion.span>

            <motion.span
              initial={false}
              animate={
                isActive
                  ? { opacity: 1, scale: 1, y: 2 }
                  : { opacity: 0, scale: 0.8, y: 8 }
              }
              transition={{ type: "spring", stiffness: 450, damping: 22 }}
              className="pointer-events-none absolute bottom-3 z-10 text-[9px] font-black uppercase tracking-widest text-white/40"
            >
              {item.label}
            </motion.span>

            {isActive && (
              <motion.span
                layoutId="nav-indicator-premium"
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="absolute bottom-1.5 left-1/2 h-[4px] w-8 -translate-x-1/2 rounded-full bg-[var(--glow-orange)] shadow-[0_0_15px_rgba(255,90,31,0.6)]"
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
