import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Activity,
  Calendar,
  Zap,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import stravaOfficialAsset from "@/assets/strava-official.png.asset.json";

export const Route = createFileRoute("/sync")({
  component: SyncPage,
});

function SyncPage() {
  const [status, setStatus] = useState<"connecting" | "syncing" | "success" | "error">("connecting");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === "connecting") {
      const timer = setTimeout(() => setStatus("syncing"), 1500);
      return () => clearTimeout(timer);
    }

    if (status === "syncing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Simulate sync success by persisting the new activity data
            const now = new Date();
            const lastSync = now.toISOString();
            
            // Format current date for the simulated sync result
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            
            localStorage.setItem('strava_last_sync', lastSync);
            localStorage.setItem('strava_sync_status', 'success');
            
            // Trigger a simulated data update in the dashboard
            window.dispatchEvent(new CustomEvent('strava-sync-complete', { 
              detail: { 
                date: formattedDate, 
                km: 8.42, 
                timestamp: lastSync 
              } 
            }));

            setStatus("success");
            return 100;
          }
          return prev + 5; // Faster sync for better UX
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4 text-white font-sans selection:bg-[var(--neon-green)]/30">
      {/* Texture Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]" style={{ backgroundImage: "var(--noise-texture)" }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card rounded-[32px] p-8 relative z-10 text-center"
      >
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-[var(--neon-green)]/10 rounded-full flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-[var(--neon-green)]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src={stravaOfficialAsset.url} alt="Strava" className="w-12 h-12 relative z-10 brightness-110" />
            {status === "syncing" && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-t-[var(--neon-green)] border-r-transparent border-b-transparent border-l-transparent rounded-full shadow-[0_0_15px_rgba(67,230,200,0.3)]"
              />
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "connecting" && (
            <motion.div
              key="connecting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Conectando</h1>
              <p className="text-[#A1A1AA] text-sm font-medium tracking-tight mb-10">Autorizando acesso ao seu perfil Strava...</p>
              <div className="flex justify-center">
                <RefreshCw className="w-8 h-8 text-[var(--neon-green)] animate-spin" />
              </div>
            </motion.div>
          )}

          {status === "syncing" && (
            <motion.div
              key="syncing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Sincronizando</h1>
              <p className="text-[#A1A1AA] text-sm font-medium tracking-tight mb-8">Buscando seus treinos de Agosto de 2026...</p>
              <div className="space-y-6">
                <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--neon-green)] to-[#34D399] shadow-[0_0_20px_rgba(67,230,200,0.5)]"
                  />
                </div>
                <p className="text-[10px] font-black text-[var(--neon-green)] uppercase tracking-[0.3em]">{progress}% CONCLUÍDO</p>
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div>
                <div className="flex justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-[var(--neon-green)] drop-shadow-[0_0_20px_rgba(67,230,200,0.4)]" />
                  </motion.div>
                </div>
                <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Concluído!</h1>
                <p className="text-[#A1A1AA] text-sm font-medium tracking-tight">Suas atividades foram atualizadas com sucesso.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <Activity className="w-6 h-6 text-[var(--neon-green)] mb-2 mx-auto" />
                  <p className="text-2xl font-black italic tracking-tighter">12</p>
                  <p className="text-[10px] text-[#A1A1AA] uppercase font-black tracking-widest">Treinos</p>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <Award className="w-6 h-6 text-[var(--neon-green)] mb-2 mx-auto" />
                  <p className="text-2xl font-black italic tracking-tighter">
                    {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                  </p>
                  <p className="text-[10px] text-[#A1A1AA] uppercase font-black tracking-widest">Último dia</p>
                </div>
              </div>

              <Button asChild className="w-full bg-[var(--neon-green)] hover:bg-[var(--neon-green-hover)] h-14 rounded-2xl text-black font-black italic uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(67,230,200,0.3)] hover:shadow-[0_0_40px_rgba(67,230,200,0.5)] hover:-translate-y-0.5 active:translate-y-0">
                <Link to="/">Voltar ao Dashboard</Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 pt-8 border-t border-white/5">
          <Link 
            to="/" 
            className="text-xs font-black uppercase tracking-widest text-[#A1A1AA] hover:text-white flex items-center justify-center gap-2 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Cancelar sincronização
          </Link>
        </div>
      </motion.div>

      <div className="mt-12 flex items-center gap-8 text-[#A1A1AA]">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[var(--neon-green)]" />
          <span className="text-[10px] font-black uppercase tracking-widest">Sincronização Segura</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[var(--neon-green)]" />
          <span className="text-[10px] font-black uppercase tracking-widest">Dados de 2026</span>
        </div>
      </div>
    </div>
  );
}
