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
            const lastSync = new Date().toISOString();
            localStorage.setItem('strava_last_sync', lastSync);
            localStorage.setItem('strava_sync_status', 'success');
            
            // Trigger a simulated data update in the dashboard
            window.dispatchEvent(new CustomEvent('strava-sync-complete', { 
              detail: { 
                date: '05/08/2026', 
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
    <div className="min-h-screen bg-[#F6F7F8] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[32px] p-8 shadow-xl border border-[#E4E7EC] text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[#FC4C02]/10 rounded-full flex items-center justify-center relative">
            <img src={stravaOfficialAsset.url} alt="Strava" className="w-10 h-10" />
            {status === "syncing" && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-t-[#FC4C02] border-r-transparent border-b-transparent border-l-transparent rounded-full"
              />
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "connecting" && (
            <motion.div
              key="connecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-2xl font-bold text-[#172033] mb-2">Conectando ao Strava</h1>
              <p className="text-[#697386] mb-8">Autorizando acesso ao seu perfil...</p>
              <div className="flex justify-center">
                <RefreshCw className="w-6 h-6 text-[#FC4C02] animate-spin" />
              </div>
            </motion.div>
          )}

          {status === "syncing" && (
            <motion.div
              key="syncing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-2xl font-bold text-[#172033] mb-2">Sincronizando Atividades</h1>
              <p className="text-[#697386] mb-6">Buscando seus treinos de Agosto de 2026...</p>
              <div className="space-y-4">
                <Progress value={progress} className="h-3 bg-gray-100" />
                <p className="text-xs font-bold text-[#FC4C02] uppercase tracking-wider">{progress}% CONCLUÍDO</p>
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div>
                <div className="flex justify-center mb-2">
                  <CheckCircle2 className="w-12 h-12 text-[#18A957]" />
                </div>
                <h1 className="text-2xl font-bold text-[#172033]">Sincronização Concluída!</h1>
                <p className="text-[#697386]">Suas atividades foram atualizadas com sucesso.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-4 rounded-2xl border border-[#E4E7EC]">
                  <Activity className="w-5 h-5 text-[#FC4C02] mb-1 mx-auto" />
                  <p className="text-lg font-bold">12</p>
                  <p className="text-[10px] text-[#697386] uppercase font-bold">Treinos</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-[#E4E7EC]">
                  <Award className="w-5 h-5 text-[#FF9F0A] mb-1 mx-auto" />
                  <p className="text-lg font-bold">04/08</p>
                  <p className="text-[10px] text-[#697386] uppercase font-bold">Último dia</p>
                </div>
              </div>

              <Button asChild className="w-full bg-[#172033] hover:bg-[#172033]/90 h-12 rounded-xl text-white font-bold">
                <Link to="/">Voltar ao Dashboard</Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <Link 
            to="/" 
            className="text-sm font-medium text-[#697386] hover:text-[#172033] flex items-center justify-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancelar sincronização
          </Link>
        </div>
      </motion.div>

      <div className="mt-8 flex items-center gap-6 text-[#697386]">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#FF9F0A]" />
          <span className="text-xs font-medium">Sincronização Segura</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-medium">Dados de 2026</span>
        </div>
      </div>
    </div>
  );
}
