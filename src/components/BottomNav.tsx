import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Calendar, Trophy, Image, User } from "lucide-react";

const ITEMS = [
  { label: "Início", Icon: Home, href: "#" },
  { label: "Calendário", Icon: Calendar, href: "#jornada-anual" },
  { label: "Conquistas", Icon: Trophy, href: "#desempenho" },
  { label: "Galeria", Icon: Image, href: "#" },
  { label: "Perfil", Icon: User, href: "#perfil" },
];


interface BottomNavProps {
  fullWidth?: boolean;
}

export function BottomNav({ fullWidth = false }: BottomNavProps) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <nav
      className={`relative flex items-end bg-white border border-[#E4E7EC] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.12)] ${
        fullWidth ? "w-full justify-evenly rounded-lg px-2" : "rounded-full px-3 gap-4"
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
            className={`relative flex h-16 flex-col items-center justify-center overflow-visible outline-none transition-all duration-300 hover:rounded-lg hover:bg-[#F6F7F8] sm:h-[68px] no-underline ${
              fullWidth ? "flex-1 mx-1" : "w-16 sm:w-[70px]"
            }`}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && !isActive && (
                <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: -36, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="pointer-events-none absolute top-1/2 z-20 whitespace-nowrap rounded-lg bg-[#172033] px-2.5 py-1 text-[10px] font-medium text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] ring-1 ring-black/5 sm:text-[11px]"
                >
                  {item.label}
                  <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#172033]" />
                </motion.span>
              )}
            </AnimatePresence>

            <motion.span
              animate={{ y: isActive ? -14 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
              className="relative z-10 flex items-center justify-center"
            >
              <item.Icon
                className={isActive ? "h-6 w-6 text-[#172033]" : "h-6 w-6 text-[#697386]"}
                strokeWidth={2}
              />
            </motion.span>

            <motion.span
              initial={false}
              animate={
                isActive
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.6, y: 4 }
              }
              transition={{ type: "spring", stiffness: 450, damping: 18 }}
              className="pointer-events-none absolute bottom-4 z-10 text-[10px] font-semibold tracking-wide text-[#172033] sm:text-[11px]"
            >
              {item.label}
            </motion.span>

            {isActive && (
              <motion.span
                layoutId="nav-indicator"
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute bottom-2 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#FF9F0A] shadow-[0_0_8px_rgba(255,159,10,0.4)]"
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
