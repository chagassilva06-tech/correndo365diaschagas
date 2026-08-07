import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  TrendingUp, 
  Activity,
  Footprints,
  Settings,
  Check,
  Instagram,
  Youtube,
  Github,
  Home,
  Calendar,
  Trophy,
  Layers,
  Image as ImageIcon,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, Suspense, lazy } from "react";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logoHeaderAsset from "@/assets/image-6.png.asset.json";
import maleRunnerAsset from "@/assets/FotoMaratona.png.asset.json";
import profileHeroAsset from "@/assets/profile-hero.png.asset.json";
import runnersBgAsset from "@/assets/runners-bg-v2.png.asset.json";

// Lazy load heavy components
const BarChart = lazy(() => import("recharts").then(mod => ({ default: mod.BarChart })));
const Bar = lazy(() => import("recharts").then(mod => ({ default: mod.Bar })));
const Cell = lazy(() => import("recharts").then(mod => ({ default: mod.Cell })));
const XAxis = lazy(() => import("recharts").then(mod => ({ default: mod.XAxis })));
const Tooltip = lazy(() => import("recharts").then(mod => ({ default: mod.Tooltip })));
const ResponsiveContainer = lazy(() => import("recharts").then(mod => ({ default: mod.ResponsiveContainer })));



export const Route = createFileRoute("/")({
  head: () => ({
    title: "Correndo todo dia | Performance Experience",
    meta: [
      { name: "description", content: "365 dias. Uma única missão. Transformando disciplina em quilômetros." },
      { property: "og:title", content: "Correndo todo dia" },
      { property: "og:description", content: "365 dias. Uma única missão. Transformando disciplina em quilômetros." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function CountUp({ end, duration = 2, decimals = 0 }: { end: number, duration?: number, decimals?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(progress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  const formattedValue = count.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span>{formattedValue}</span>;
}

function Index() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState<string>("Todos");
  const [activeTab, setActiveTab] = useState("Início");
  const [syncedActivities, setSyncedActivities] = useState<any[]>([]);
  
  // Calculate days since start date (Jan 1, 2026)
  const startDate = new Date(2026, 0, 1);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const daysPassed = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const currentMonthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date());
  const capitalizedCurrentMonth = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);

  // Listen for sync completion to update the UI
  useEffect(() => {
    const handleSync = (event: any) => {
      const newActivity = event.detail;
      setSyncedActivities(prev => [...prev, newActivity]);
      setShowNotification(true);
    };

    window.addEventListener('strava-sync-complete', handleSync);
    return () => window.removeEventListener('strava-sync-complete', handleSync);
  }, []);

  const months = useMemo(() => {
    const baseMonths = [
      { name: "Janeiro", days: 31, km: "246,48", activities: Array.from({ length: 31 }, (_, i) => i + 1) },
      { name: "Fevereiro", days: 28, km: "318,45", activities: Array.from({ length: 28 }, (_, i) => i + 1) },
      { name: "Março", days: 31, km: "206,99", activities: Array.from({ length: 31 }, (_, i) => i + 1) },
      { name: "Abril", days: 30, km: "242,26", activities: Array.from({ length: 30 }, (_, i) => i + 1) },
      { name: "Maio", days: 31, km: "208,71", activities: Array.from({ length: 31 }, (_, i) => i + 1) },
      { name: "Junho", days: 30, km: "133,18", activities: Array.from({ length: 30 }, (_, i) => i + 1) },
      { name: "Julho", days: 31, km: "239,08", activities: Array.from({ length: 31 }, (_, i) => i + 1) },
      { name: "Agosto", days: 31, km: "32,76", activities: [1, 2, 3, 4, 5] },
      { name: "Setembro", days: 30, km: "0", activities: [] },
      { name: "Outubro", days: 31, km: "0", activities: [] },
      { name: "Novembro", days: 30, km: "0", activities: [] },
      { name: "Dezembro", days: 31, km: "0", activities: [] },
    ];

    // Merge synced activities into the current month (August 2026)
    return baseMonths.map(m => {
      if (m.name === "Agosto") {
        const extraDays = syncedActivities.map(a => parseInt(a.date.split('/')[0]));
        const uniqueActivities = Array.from(new Set([...m.activities, ...extraDays]));
        const extraKm = syncedActivities.reduce((acc, a) => acc + a.km, 0);
        const totalKmValue = parseFloat(m.km.replace(',', '.')) + extraKm;
        const totalKmFormatted = totalKmValue.toFixed(2).replace('.', ',');
        return { ...m, activities: uniqueActivities, km: totalKmFormatted };
      }
      return m;
    });
  }, [syncedActivities]);

  const filteredMonths = useMemo(() => 
    selectedMonth === "Todos" ? months : months.filter(m => m.name === selectedMonth),
  [selectedMonth, months]);


  const [showNotification, setShowNotification] = useState(false);
  
  const handleConnectStrava = () => {
    // Clear any previous sync state to force a fresh sync
    localStorage.removeItem('strava_sync_status');
    navigate({ to: "/sync" });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-white font-sans selection:bg-[var(--neon-green)]/30 selection:text-[var(--neon-green)] tracking-tight leading-relaxed">
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="fixed top-24 right-6 z-[100] w-full max-w-[320px] glass-card text-white rounded-[24px] shadow-2xl overflow-hidden font-sans border-white/10"
          >
            <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-[#2B2C5A]/80">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Notificações</span>
              <div className="flex items-center gap-3 text-white/70">
                <Check className="w-4 h-4 cursor-pointer hover:text-[var(--neon-green)] transition-colors" />
                <Settings className="w-4 h-4 cursor-pointer hover:text-[var(--neon-green)] transition-colors" />
              </div>
            </div>
            <div className="p-5 flex items-start gap-4">
              <div className="mt-1 p-2 rounded-xl bg-[var(--neon-green)]/10">
                <Activity className="w-5 h-5 text-[var(--neon-green)]" strokeWidth={3} />
              </div>
              <div>
                <p className="text-xs leading-snug font-bold tracking-tight">
                  Nova atividade recebida em {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-[10px] text-white/70 mt-1 font-medium">Sincronização concluída com sucesso</p>
              </div>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-transparent w-full h-full cursor-default"
              aria-label="Close"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texture Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]" style={{ backgroundImage: "var(--noise-texture)" }} />


      <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 dark:bg-[#000000]/80 backdrop-blur-xl border-b border-white/5 shadow-[var(--header-shadow)]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate({ to: "/" })}>
            <motion.span 
              whileHover={{ scale: 1.02 }}
              className="font-black text-2xl tracking-tighter italic uppercase bg-gradient-to-r from-[var(--neon-green)] via-white to-[var(--neon-green)] bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent"
            >
              Correndo todo dia
            </motion.span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10 text-[10px] font-black tracking-[0.2em] uppercase text-white/70">
            {[
              { name: "Início", href: "#" },
              { name: "Calendário", href: "#jornada-anual" },
              { name: "Estatísticas", href: "#desempenho" },
              { name: "Perfil", href: "#perfil" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab(item.name)}
                className={`relative py-2 transition-all duration-300 hover:text-white ${activeTab === item.name ? 'text-[var(--neon-green)] text-glow' : ''}`}
              >
                {item.name}
                {activeTab === item.name && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--neon-green)] shadow-[0_0_15px_rgba(67,230,200,0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleConnectStrava}
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/50 px-6 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(67,230,200,0.1)] hover:shadow-[0_0_25px_rgba(67,230,200,0.3)] font-black uppercase tracking-widest text-[10px]"
            >
              Conectar Strava
            </Button>
          </div>
        </div>
      </header>

      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 overflow-hidden mb-0">
        {/* Immersive Hero Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[var(--background)]/40 via-transparent to-[var(--background)]" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={runnersBgAsset.url} 
              alt="Background Illustration" 
              className="w-full h-full object-cover object-bottom translate-y-20 px-0 filter saturate-[1.5] contrast-[1.2] brightness-[1.1] [image-rendering:crisp-edges]"
            />
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--neon-green)]/5 via-transparent to-transparent z-5 animate-pulse" />
        </div>

        <div className="container relative z-20 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-start mb-6"
            >
              <Badge variant="outline" className="border-white/20 text-white/90 bg-white/5 gap-3 px-5 py-2 backdrop-blur-md rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--neon-green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--neon-green)]"></span>
                </span>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Desafio todos os dias</span>
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl lg:text-[85px] font-black mb-8 tracking-tighter leading-[0.85] italic uppercase relative -ml-1 md:-ml-8"
            >
              <span className="relative z-10">Correndo</span> <br />
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-green)] to-[#00B8A9] drop-shadow-[0_0_30px_rgba(0,209,193,0.3)]">todo dia</span>
              
              {/* Adjusted background animation to be lower and less intrusive */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 -left-10 w-full h-full bg-[var(--neon-green)]/5 blur-[120px] -z-10 rounded-full"
              />
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg lg:text-2xl text-white/70 mb-12 leading-tight max-w-xl font-medium tracking-tight"
            >
              <span className="text-white/70">365 dias. Uma única missão.</span> <br />
              <span className="text-white">Transformando disciplina em quilômetros.</span>
            </motion.p>
            
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-[var(--neon-green)]/20 blur-[120px] rounded-full animate-pulse" />
            <div className="relative z-0 flex flex-col items-center -translate-y-8">
              <div className="text-sm font-black uppercase tracking-[0.3em] text-white/50 mb-2">correndo a</div>
              <div className="text-[180px] font-black italic tracking-tighter leading-none text-white text-glow relative z-10 drop-shadow-[0_0_80px_rgba(255,255,255,0.15)] [text-shadow:0_0_20px_rgba(67,230,200,0.5)]">
                <CountUp end={daysPassed + syncedActivities.length} />
              </div>
              <div className="text-xl font-black uppercase tracking-[0.5em] text-white/50 mt-4 relative z-20 opacity-80">Dias consecutivos</div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-10 bg-[var(--background)] relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-end">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              {[
                { label: "dias", value: 365, icon: CalendarIcon },
                { label: "corridas", value: daysPassed + syncedActivities.length, icon: Footprints },
                { label: "quilômetros", value: 1627.91 + syncedActivities.reduce((acc, a) => acc + a.km, 0), prefix: "Total: ", suffix: " km", icon: TrendingUp },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-5 rounded-[32px] glass-card border border-white/5 relative overflow-hidden transition-all duration-500 hover:border-[var(--neon-green)]/30"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--neon-green)]/5 rounded-full -mr-8 -mt-8 blur-3xl group-hover:bg-[var(--neon-green)]/10 transition-all duration-500" />
                  <stat.icon className="w-5 h-5 text-[var(--neon-green)] mb-3 opacity-75" />
                  <div className="text-2xl font-black tracking-tighter mb-1 italic uppercase flex items-baseline flex-wrap">
                    {stat.prefix && <span className="text-sm mr-1 opacity-60 normal-case">{stat.prefix}</span>}
                    <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 2 : 0} />
                    <span className="text-lg ml-1 opacity-60">{stat.suffix}</span>
                  </div>
                  <div className="text-[9px] font-black tracking-[0.3em] uppercase text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="w-40 h-52 rounded-[32px] overflow-hidden border-2 border-[var(--neon-green)] group shadow-[0_0_20px_rgba(0,209,193,0.6)] relative premium-border shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--neon-green)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img src={maleRunnerAsset.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Corredor" />
            </motion.div>
          </div>
        </div>
      </section>


      {/* Jornada Anual Section */}
      <section id="jornada-anual" className="py-10 bg-[var(--background)] relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-2xl text-left">
              <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter mb-6 leading-[0.9] flex items-center gap-4">
                Jornada Anual
                <span className="w-12 h-1 bg-[var(--neon-green)] opacity-30 rounded-full hidden lg:block"></span>
              </h2>
              <div className="flex items-center gap-6">
                 <p className="text-white/70 text-sm font-medium tracking-tight">O seu progresso diário em detalhes.</p>
                 <div className="flex items-center gap-2 bg-[var(--neon-green)]/10 px-4 py-2 rounded-xl border border-[var(--neon-green)]/20">
                   <span className="text-xl">🔥</span>
                   <span className="text-sm font-black uppercase tracking-widest text-[var(--neon-green)]">{216 + syncedActivities.length} dias de sequência</span>
                 </div>
              </div>
            </div>
            <div className="flex items-center gap-4 glass p-2 rounded-2xl border border-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Filtrar:</span>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-[10px] font-black uppercase tracking-widest border-none outline-none text-white cursor-pointer px-4"
              >
                <option value="Todos">Todos os meses</option>
                {months.map(m => (
                  <option key={m.name} value={m.name} className="bg-[var(--section-bg)] text-white">{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMonths.map((month, mIdx) => {
              const isCurrentMonth = month.name === capitalizedCurrentMonth;
              return (
                <motion.div 
                  key={month.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: mIdx * 0.05 }}
                  viewport={{ once: true }}
                  className={`group rounded-[40px] glass-card border border-white/5 overflow-hidden shadow-2xl transition-all duration-500 hover:border-[var(--neon-green)]/30 hover:shadow-[var(--neon-green)]/5 hover:-translate-y-2 ${isCurrentMonth ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                >
                  <div className="bg-[#2B2C5A]/50 p-8 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-green)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className={`font-black italic uppercase tracking-tighter relative z-10 ${isCurrentMonth ? 'text-5xl text-glow' : 'text-2xl'}`}>{month.name}</span>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-white/70 uppercase">
                        {month.activities.length}/{month.days} dias
                      </p>
                      <p className="text-[10px] font-black text-[var(--neon-green)] uppercase">
                        {month.km}km
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className={`grid gap-2 ${isCurrentMonth ? 'grid-cols-7' : 'grid-cols-7'}`}>
                      {Array.from({ length: month.days }).map((_, i) => {
                        const day = i + 1;
                        const hasActivity = month.activities.includes(day);
                        const isSpecial = day === 15;
                        
                        return (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.15, zIndex: 10 }}
                            className={`aspect-square rounded-xl flex items-center justify-center text-[10px] font-black transition-all relative group/day cursor-pointer ${
                              hasActivity 
                                ? "bg-[var(--neon-green)] text-black shadow-[0_0_20px_rgba(67,230,200,0.3)] hover:shadow-[0_0_30px_rgba(67,230,200,0.5)]"
                                : day < new Date().getDate() && isCurrentMonth
                                  ? "bg-white/5 text-white/70/50"
                                  : "bg-white/5 text-white/70/20 border border-white/5"
                            }`}
                          >
                            {day}
                            {hasActivity && (
                              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[var(--card-bg)] text-white text-[10px] py-2 px-3 rounded-xl opacity-0 group-hover/day:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-2xl font-black uppercase z-20 border border-[var(--neon-green)]/30">
                                {isSpecial ? "🏆 Recorde Pessoal" : `Dia ${day} Validado`}
                                <br />
                                <span className="text-[8px] opacity-80">6,70km • 4:18 pace</span>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--card-bg)]" />
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-[var(--background)] relative z-10 overflow-hidden">
        <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto">
             <div className="relative h-1 bg-white/5 rounded-full mb-12">
               <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--neon-green)] to-[#00B8A9] shadow-[0_0_15px_rgba(0,209,193,0.3)]" style={{ width: '60%' }} />
               
               <div className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-between w-full px-4">
                 {[
                   { label: 'Janeiro', active: true },
                   { label: '100 Dias', active: true, value: '100' },
                   { label: '200 Dias', active: true, value: '200' },
                    { label: 'Hoje', active: true, color: 'var(--neon-green)' }
                  ].map((point, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-4 border-[var(--background)] ${point.active ? 'bg-[var(--neon-green)] shadow-[0_0_10px_rgba(67,230,200,0.5)]' : 'bg-white/10'}`} />
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/70 mt-4">{point.label}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        </div>
      </section>


      {/* Desempenho / Chart Section */}
      <section id="desempenho" className="py-10 bg-[var(--background)] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="text-left">
              <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter mb-6 leading-[0.9]">Seu Desempenho</h2>
              <p className="text-white/70 text-base">Métricas avançadas e análise de performance semanal.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
             {[
               { label: 'Total Mês', value: months.find(m => m.name === "Agosto")?.km || '32,76', unit: 'km', color: 'var(--neon-green)' },
               { label: 'Distância (km)', value: months.find(m => m.name === "Agosto")?.km || '32,76', unit: 'km', color: 'var(--neon-green)' },
             ].map((m, i) => (
               <div key={i} className="glass-card p-8 rounded-[40px] border border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-transform">
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 mb-4">{m.label}</div>
                 <div className="text-5xl font-black italic uppercase tracking-tighter" style={{ color: m.color }}>
                   {m.value}
                   <span className="text-sm ml-1 opacity-60 normal-case font-bold">{m.unit}</span>
                 </div>
               </div>
             ))}
          </div>

          <div className="glass-card rounded-[48px] p-12 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--neon-green)]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/70">Atividade Anual 2026</h3>
                <p className="text-[10px] text-white/70/60 font-medium tracking-widest mt-1">1.627,91 KM TOTAL • 216 DIAS SEGUIDOS</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/70/50 mr-1">Menos</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div 
                      key={level} 
                      className="w-3 h-3 rounded-sm" 
                      style={{ 
                        backgroundColor: level === 0 ? 'rgba(255,255,255,0.05)' : 
                                         level === 1 ? 'rgba(0, 209, 193, 0.2)' : 
                                         level === 2 ? 'rgba(0, 209, 193, 0.4)' : 
                                         level === 3 ? 'rgba(0, 209, 193, 0.7)' : 
                                         'var(--neon-green)' 
                      }} 

                    />
                  ))}
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/70/50 ml-1">Mais</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto pb-6 custom-scrollbar">
              <div className="flex gap-1.5 min-w-max p-4">
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1.5">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const dayOfYear = weekIndex * 7 + dayIndex;
                      const isActive = dayOfYear < 216;
                      const intensity = isActive ? (Math.random() > 0.7 ? 4 : Math.random() > 0.4 ? 3 : (Math.random() > 0.5 ? 2 : 1)) : 0;
                      
                      // Mock data for tooltip
                      const date = new Date(2026, 0, dayOfYear + 1);
                      const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
                      const km = (Math.random() * 15 + 5).toFixed(2);
                      const pace = "4:18";
                      const time = "01:05:20";

                      return (
                        <div key={dayIndex} className="relative group/contribution">
                          <motion.div
                            initial={false}
                            whileHover={{ 
                              scale: 1.5, 
                              rotate: 45,
                              zIndex: 50,
                              boxShadow: "0 0 20px rgba(0, 209, 193, 0.6)"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-3.5 h-3.5 rounded-sm cursor-pointer transition-colors duration-300 relative overflow-hidden"
                            style={{ 
                              backgroundColor: intensity === 0 ? 'rgba(255,255,255,0.03)' : 
                                               intensity === 1 ? 'rgba(0, 209, 193, 0.2)' : 
                                               intensity === 2 ? 'rgba(0, 209, 193, 0.4)' : 
                                               intensity === 3 ? 'rgba(0, 209, 193, 0.7)' : 
                                               'var(--neon-green)',

                            }}
                          >
                            {intensity > 0 && (
                              <motion.div 
                                className="absolute inset-0 bg-white/20"
                                animate={{ opacity: [0, 0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              />
                            )}
                          </motion.div>
                          
                          {/* Premium Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover/contribution:opacity-100 transition-all duration-300 pointer-events-none z-[60] scale-90 group-hover/contribution:scale-100">
                            <div className="bg-[var(--card-bg)] border border-[var(--neon-green)]/30 rounded-2xl p-4 shadow-2xl min-w-[180px] backdrop-blur-xl">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{dateStr}</span>
                                <Check className="w-3 h-3 text-[var(--neon-green)]" />
                              </div>
                              <div className="space-y-1">
                                <div className="text-xl font-black italic uppercase text-[var(--neon-green)]">{km} km</div>
                                <div className="flex justify-between text-[9px] font-bold text-white/70 uppercase tracking-tighter">
                                  <span>Pace {pace}</span>
                                  <span>{time}</span>
                                </div>
                              </div>
                              <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2 text-[8px] font-black text-[var(--neon-green)] uppercase tracking-widest">
                                <Activity className="w-3 h-3" />
                                Clique para ver no Strava
                              </div>
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#202151]" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/70/40">
              <div className="flex gap-8 overflow-x-auto pb-2 no-scrollbar">
                {[
                  "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", 
                  "SET", "OUT", "NOV", "DEZ"
                ].map((m, i) => {
                  const currentMonthIndex = new Date().getMonth(); // 0-indexed
                  const isPastOrCurrent = i <= currentMonthIndex;
                  return (
                    <div key={m} className="flex flex-col items-center gap-2">
                      <span className={isPastOrCurrent ? "text-white/70" : "text-white/70/30"}>
                        {m}
                      </span>
                      {!isPastOrCurrent && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon-green)]/20 relative overflow-hidden">
                          <motion.div 
                            className="absolute inset-0 bg-[var(--neon-green)]"
                            animate={{ 
                              x: ["-100%", "100%"] 
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: i * 0.2,
                              ease: "linear"
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <div className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" />
                <span>Status: Em Evolução</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Profile Card Section */}
      <section id="perfil" className="py-12 bg-[var(--background)] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
           <motion.div 
            whileHover={{ rotateY: 5, rotateX: 2 }}
            className="rounded-[48px] glass-card p-12 border border-white/5 shadow-2xl relative overflow-hidden group perspective-1000 premium-border"
          >
            <div className="absolute inset-0 bg-[var(--neon-green)]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[var(--neon-green)]/10 rounded-full blur-[100px] group-hover:bg-[var(--neon-green)]/20 transition-all duration-700" />
            
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="relative">
                <div className="w-48 h-48 rounded-[40px] border-4 border-[var(--neon-green)]/30 p-2 overflow-hidden shadow-2xl relative z-10 transition-transform duration-500 hover:scale-105 premium-border">
                  <div className="absolute inset-0 bg-[var(--neon-green)] blur-[30px] opacity-10 group-hover:opacity-30 transition-opacity" />
                  <img src={profileHeroAsset.url} alt="Profile" className="w-full h-full object-cover rounded-[32px] bg-[#1C1D4D] relative z-10" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-8 bg-[#2B2C5A]/20 -mx-12 px-12 -mt-12 pt-12">
                  <div>
                    <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-3 text-glow">Francisco Chagas</h3>
                    <div className="flex items-center gap-3 text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">
                       <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/20">
                         <CheckCircle2 className="w-3.5 h-3.5 text-[var(--neon-green)]" />
                         <span className="text-[var(--neon-green)]">Desafio ativo</span>
                       </div>
                       <span>•</span>
                       <span>Runner since 2018</span>
                    </div>
                  </div>
                </div>
                
                <div className="glass p-4 rounded-2xl border border-white/5 shadow-inner mb-10 premium-border">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70/80">São Paulo, SP • Corredor Amador Autodidata</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/70 tracking-[0.2em] mb-2">Sequência</p>
                    <p className="text-3xl font-black italic uppercase text-white">
                      <CountUp end={216 + syncedActivities.length} /> dias
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/70 tracking-[0.2em] mb-2">Acumulado</p>
                    <p className="text-3xl font-black italic uppercase text-white">
                      <CountUp 
                        end={1627.91 + syncedActivities.reduce((acc, a) => acc + a.km, 0)} 
                        decimals={2} 
                      /> km
                    </p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-[10px] font-black uppercase text-white/70 tracking-[0.2em] mb-2">Pace Médio</p>
                    <p className="text-3xl font-black italic uppercase text-[var(--neon-green)]">4:18/km</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      <footer className="py-10 bg-[#000000] border-t border-white/5 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--neon-green)]/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6 relative z-10">
          <div className="flex justify-center gap-8">
            {[
              { icon: Instagram, href: "#", color: "#E1306C" },
              { icon: Youtube, href: "#", color: "#FF0000" },
              { icon: Github, href: "#", color: "white" },
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.href} 
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-white/70 transition-colors"
                style={{ '--hover-color': social.color } as any}
                onMouseEnter={(e) => (e.currentTarget.style.color = social.color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
            <motion.a 
              href="https://strava.com" 
              whileHover={{ y: -3, scale: 1.1 }}
              className="text-white/70 hover:text-[#FC6100] transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 4.116zM10.267 7.848l-1.55 3.06h2.279l1.554-3.06 1.553 3.06h2.279l-3.832-7.538L10.267 7.848z"/>
              </svg>
            </motion.a>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-glow mb-1">
              Correndo todo dia
            </h3>
            <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.4em] opacity-60">
              © 2026 Francisco Chagas. Todos os direitos reservados.
            </p>
            <div className="h-px w-12 bg-[var(--neon-green)]/30 mt-2" />
          </div>
        </div>
      </footer>


    </div>
  );
}
