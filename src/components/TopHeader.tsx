import { BottomNav } from "./BottomNav";
import { Bell, Menu, Search } from "lucide-react";

export function TopHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#00021b] px-6 pb-5 pt-3 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-2px_6px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex h-16 max-w-md items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-200 shadow-[0_4px_12px_rgba(34,211,238,0.25),inset_0_1px_0_rgba(255,255,255,0.4)]">
            <span className="text-sm font-bold text-[#00021b]">N</span>
          </div>
          <span className="text-lg font-semibold text-white">Glow Nav</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Pesquisar"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Notificações"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-md justify-center">
        <BottomNav />
      </div>
    </header>
  );
}

