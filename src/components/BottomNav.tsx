import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, User, MessageCircle, Image, Settings } from "lucide-react";

const ITEMS = [
  { label: "Início", Icon: Home },
  { label: "Perfil", Icon: User },
  { label: "Mensagens", Icon: MessageCircle },
  { label: "Fotos", Icon: Image },
  { label: "Configurações", Icon: Settings },
];

interface BottomNavProps {
  fullWidth?: boolean;
}

export function BottomNav({ fullWidth = false }: BottomNavProps) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <nav
      className={`relative flex items-end bg-gradient-to-br from-[#15D2FF]/30 via-[#2F80ED]/30 to-[#1B3B88]/30 bg-white/[0.08] backdrop-blur-[18px] border-b border-white/[0.12] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.06)] ${
        fullWidth ? "w-full justify-evenly rounded-lg px-2" : "rounded-full px-3 gap-4"
      }`}
    >
      {ITEMS.map((item, i) => {
        const isActive = i === active;
        const isHovered = hovered === i;

        return (
          <button
            key={item.label}
            onClick={() => setActive(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={`relative flex h-16 flex-col items-center justify-center overflow-visible outline-none transition-all duration-300 hover:rounded-lg hover:bg-white/[0.05] sm:h-[68px] ${
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
                  className="pointer-events-none absolute top-1/2 z-20 whitespace-nowrap rounded-lg bg-[#00021b]/90 px-2.5 py-1 text-[10px] font-medium text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)] ring-1 ring-white/10 sm:text-[11px]"
                >
                  {item.label}
                  <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#00021b]/90" />
                </motion.span>
              )}
            </AnimatePresence>

            <motion.span
              animate={{ y: isActive ? -14 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
              className="relative z-10 flex items-center justify-center"
            >
              <item.Icon
                className={isActive ? "h-6 w-6 text-white" : "h-6 w-6 text-white/70"}
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
              className="pointer-events-none absolute bottom-4 z-10 text-[10px] font-semibold tracking-wide text-white sm:text-[11px]"
            >
              {item.label}
            </motion.span>

            {isActive && (
              <motion.span
                layoutId="nav-indicator"
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute bottom-2 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
