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

export function BottomNav() {
  const [active, setActive] = useState(0);

  return (
    <nav className="relative flex items-end rounded-full bg-gradient-to-br from-cyan-400 to-blue-200 px-3 py-2 shadow-2xl">
      {ITEMS.map((item, i) => {
        const isActive = i === active;
        return (
          <button
            key={item.label}
            onClick={() => setActive(i)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className="relative flex h-16 w-16 flex-col items-center justify-center outline-none sm:h-[70px] sm:w-[70px]"
          >
            {isActive && (
              <motion.span
                layoutId="nav-indicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute left-1/2 top-0 h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-[#00021b] bg-gradient-to-br from-cyan-400 to-blue-200"
              />
            )}

            <motion.span
              animate={{ y: isActive ? -26 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="relative z-10 flex items-center justify-center"
            >
              <item.Icon
                className={
                  isActive ? "h-6 w-6 text-[#00021b]" : "h-6 w-6 text-slate-800/70"
                }
                strokeWidth={2.2}
              />
            </motion.span>

            <motion.span
              initial={false}
              animate={
                isActive
                  ? { opacity: 1, scale: 1, y: -6 }
                  : { opacity: 0, scale: 0.6, y: 0 }
              }
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-none absolute bottom-2 z-10 text-[11px] font-semibold tracking-wide text-[#00021b]"
            >
              {item.label}
            </motion.span>
          </button>
        );
      })}
    </nav>
  );
}
