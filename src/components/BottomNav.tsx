import { useState } from "react";
import { motion } from "motion/react";
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
      className={`relative flex items-end bg-gradient-to-br from-cyan-400 to-blue-200 py-1 shadow-2xl ${
        fullWidth ? "w-full justify-around rounded-none px-0" : "rounded-full px-3"
      }`}
    >
      {ITEMS.map((item, i) => {
        const isActive = i === active;
        const isHovered = hovered === i;
        const showLabel = isActive || isHovered;

        return (
          <button
            key={item.label}
            onClick={() => setActive(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={`relative flex h-14 flex-col items-center justify-center overflow-visible outline-none transition-colors duration-300 sm:h-16 ${
              fullWidth ? "flex-1" : "w-16 sm:w-[70px]"
            } ${
              isHovered && !isActive
                ? "bg-gradient-to-br from-blue-500 to-cyan-400"
                : ""
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute left-1/2 top-1/2 z-0 h-12 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/20 shadow-lg backdrop-blur-md"
              />
            )}

            {isActive && (
              <motion.span
                layoutId="nav-indicator"
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-[#00021b] bg-gradient-to-br from-cyan-400 to-blue-200 sm:h-[52px] sm:w-[52px]"
              />
            )}

            <motion.span
              animate={{ y: isActive ? -24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 16 }}
              className="relative z-10 flex items-center justify-center"
            >
              <item.Icon
                className={
                  isActive ? "h-5 w-5 text-white" : "h-5 w-5 text-slate-800/70"
                }
                strokeWidth={2.2}
              />
            </motion.span>

            <motion.span
              initial={false}
              animate={
                showLabel
                  ? { opacity: 1, scale: 1, y: -4 }
                  : { opacity: 0, scale: 0.6, y: 0 }
              }
              transition={{ type: "spring", stiffness: 450, damping: 18 }}
              className="pointer-events-none absolute bottom-1 z-10 text-[10px] font-semibold tracking-wide text-white sm:text-[11px]"
            >
              {item.label}
            </motion.span>
          </button>
        );
      })}
    </nav>
  );

}


