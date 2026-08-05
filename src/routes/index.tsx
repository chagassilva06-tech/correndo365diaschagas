import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { 
  Home, 
  Calendar as CalendarIcon, 
  Trophy, 
  CheckCircle2, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  MapPin,
  Clock,
  Timer,
  ExternalLink,
  Award,
  Activity,
  Footprints,
  Bike,
  Flame,
  MoreHorizontal,
  Share2,
  RefreshCw,
  Heart,
  FlameKindling,
  ChevronDown,
  Trash2,
  User,
  Instagram,
  Youtube,
  Github,
  Bell,
  Settings,
  Check
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import stravaOfficialAsset from "@/assets/strava-official.png.asset.json";
import runnerLogoAsset from "@/assets/runner-logo.png.asset.json";

import maleRunnerAsset from "@/assets/FotoMaratona.png.asset.json";
import profileHeroAsset from "@/assets/profile-hero.png.asset.json";
import logoHeaderAsset from "@/assets/image-6.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    title: "Correndo todo dia | Performance Experience",
    meta: [
      { name: "description", content: "365 dias. Uma única missão. Transformando disciplina em quilômetros." },
      { property: "og:title", content: "Correndo todo dia" },
      { property: "og:description", content: "Desafio de corrida diária com Sérgio Rocha." },
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
  
  const currentMonthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date());
  const capitalizedCurrentMonth = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);

  const months = [
    { name: "Janeiro", days: 31, activities: Array.from({ length: 31 }, (_, i) => i + 1) },
    { name: "Fevereiro", days: 28, activities: Array.from({ length: 28 }, (_, i) => i + 1) },
    { name: "Março", days: 31, activities: Array.from({ length: 31 }, (_, i) => i + 1) },
    { name: "Abril", days: 30, activities: Array.from({ length: 30 }, (_, i) => i + 1) },
    { name: "Maio", days: 31, activities: Array.from({ length: 31 }, (_, i) => i + 1) },
    { name: "Junho", days: 30, activities: Array.from({ length: 30 }, (_, i) => i + 1) },
    { name: "Julho", days: 31, activities: Array.from({ length: 31 }, (_, i) => i + 1) },
    { name: "Agosto", days: 31, activities: [1, 2, 3, 4] },
    { name: "Setembro", days: 30, activities: [] },
    { name: "Outubro", days: 31, activities: [] },
    { name: "Novembro", days: 30, activities: [] },
    { name: "Dezembro", days: 31, activities: [] },
  ];

  const filteredMonths = selectedMonth === "Todos" 
    ? months 
    : months.filter(m => m.name === selectedMonth);

  const [showNotification, setShowNotification] = useState(false);
  
  const handleConnectStrava = () => {
    // Simulando a conexão e recebimento de atividade
    setTimeout(() => {
      setShowNotification(true);
    }, 500);
    navigate({ to: "/sync" });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-white font-sans pb-32 selection:bg-[var(--glow-orange)]/30 selection:text-[var(--glow-orange)] tracking-tight leading-relaxed">
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="fixed top-24 right-6 z-[100] w-full max-w-[320px] bg-[#f5f5f5] text-[#333] rounded-lg shadow-2xl border border-black/5 overflow-hidden font-sans"
          >
            <div className="px-4 py-2 border-b border-black/5 flex items-center justify-between bg-[#efefef]">
              <span className="text-sm font-medium text-[#666]">Notificações</span>
              <div className="flex items-center gap-2 text-[#999]">
                <Check className="w-4 h-4 cursor-pointer hover:text-[#333]" />
                <Settings className="w-4 h-4 cursor-pointer hover:text-[#333]" />
              </div>
            </div>
            <div className="p-4 flex items-start gap-3">
              <div className="mt-1">
                <Activity className="w-4 h-4 text-[#333]" strokeWidth={3} />
              </div>
              <div>
                <p className="text-sm leading-tight font-medium">
                  Nova atividade recebida em 04/08 as 09:12
                </p>
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


      <header className="fixed top-0 left-0 right-0 z-50 bg-[#00021b]/80 backdrop-blur-xl border-b border-yellow-400/20 shadow-[var(--header-shadow)]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate({ to: "/" })}>
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-500">
              <img src={logoHeaderAsset.url} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <motion.span 
              whileHover={{ scale: 1.02 }}
              className="font-black text-2xl tracking-tighter italic uppercase bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
            >
              Correndo todo dia
            </motion.span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10 text-sm font-bold tracking-widest uppercase text-[#A1A1AA]">
            {[
              { name: "Início", href: "#" },
              { name: "Calendário", href: "#jornada-anual" },
              { name: "Estatísticas", href: "#desempenho" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab(item.name)}
                className="relative py-2 hover:text-[var(--header-hover-bg)] hover:drop-shadow-[0_0_8px_var(--header-hover-bg)] transition-all duration-300"
              >
                {item.name}
                {activeTab === item.name && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--neon-green)] shadow-[0_0_8px_var(--neon-green)]"
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
              className="text-white/80 hover:text-white hover:bg-white/5 border border-[#FF6A00] px-6 rounded-full transition-all shadow-[0_0_15px_rgba(255,106,0,0.2)]"
            >
              Conectar Strava
            </Button>
          </div>
        </div>
      </header>

      <section className="relative min-h-[85vh] flex items-center justify-center pt-24 overflow-hidden mb-[-10vh]">
        {/* Immersive Hero Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[var(--background)] z-10 opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--glow-orange)]/10 via-transparent to-transparent z-0 animate-pulse" />
          
          {/* Velocity Lines / Grid Animation */}
          <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(255, 90, 31, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 90, 31, 0.1) 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--background)] z-10" />
        </div>

        <div className="container relative z-20 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-start mb-6"
            >
              <Badge variant="outline" className="border-[var(--neon-green)] text-[var(--neon-green)] bg-[var(--neon-green)]/5 gap-3 px-5 py-2 backdrop-blur-md rounded-full border-white/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--neon-green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--neon-green)]"></span>
                </span>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Desafio ao vivo</span>
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl lg:text-[110px] font-black mb-8 tracking-tighter leading-[0.85] italic uppercase relative"
            >
              <span className="relative z-10">Correndo</span> <br />
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-green)] to-[#34D399] drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]">todo dia</span>
              
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
              className="text-lg lg:text-2xl text-[#A1A1AA] mb-12 leading-tight max-w-xl font-medium tracking-tight"
            >
              365 dias. Uma única missão. <br />
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
            <div className="relative z-0 flex flex-col items-center">
              <div className="text-sm font-black uppercase tracking-[0.3em] text-[var(--neon-green)] mb-2">correndo a</div>
              <div className="text-[160px] font-black italic tracking-tighter leading-none text-white/90 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] relative z-10">
                <CountUp end={216} />
              </div>
              <div className="text-3xl font-black uppercase tracking-[0.3em] text-[var(--neon-green)] mt-2 relative z-20">Dias consecutivos</div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="mt-16 w-64 h-80 rounded-[40px] overflow-hidden border-2 border-white/10 group shadow-2xl relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--neon-green)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src={maleRunnerAsset.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Corredor" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-20 bg-[var(--background)] relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "dias", value: 365, icon: CalendarIcon, sparkline: [20, 40, 30, 50, 40, 70, 60] },
              { label: "corridas", value: 216, icon: Footprints, sparkline: [10, 20, 15, 30, 25, 40, 35] },
              { label: "quilômetros", value: 1627.91, prefix: "Total: ", suffix: " km", icon: TrendingUp, sparkline: [30, 50, 45, 60, 55, 80, 75] },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-[40px] bg-[var(--section-bg)] border border-white/5 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-[var(--neon-green)]/30"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon-green)]/5 rounded-full -mr-8 -mt-8 blur-3xl group-hover:bg-[var(--neon-green)]/10 transition-all duration-500" />
                <stat.icon className="w-10 h-10 text-[var(--neon-green)] mb-6" />
                <div className="text-6xl font-black tracking-tighter mb-2 italic uppercase flex items-baseline flex-wrap">
                  {stat.prefix && <span className="text-xl mr-2 opacity-60 normal-case">{stat.prefix}</span>}
                  <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 2 : 0} />
                  <span className="text-2xl ml-1 opacity-60">{stat.suffix}</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-[10px] font-black tracking-[0.3em] uppercase text-[#A1A1AA]">{stat.label}</div>
                  
                  {/* Sparkline simulation */}
                  <div className="flex items-end gap-1 h-8 opacity-40 group-hover:opacity-100 transition-opacity">
                    {stat.sparkline.map((h, idx) => (
                      <div key={idx} className="w-1 bg-[var(--neon-green)] rounded-full" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Jornada Anual Section */}
      <section id="jornada-anual" className="py-20 bg-[var(--background)] relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-2xl text-left">
              <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter mb-6 leading-[0.9]">Jornada Anual</h2>
              <div className="flex items-center gap-6">
                 <p className="text-[#A1A1AA] text-base">A principal atração do seu progresso.</p>
                 <div className="flex items-center gap-2 bg-[var(--neon-green)]/10 px-4 py-2 rounded-xl border border-[var(--neon-green)]/20">
                   <span className="text-xl">🔥</span>
                   <span className="text-sm font-black uppercase tracking-widest text-[var(--neon-green)]">216 dias de sequência</span>
                 </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[var(--section-bg)] p-2 rounded-2xl border border-white/5 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#A1A1AA] ml-4">Filtrar:</span>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-sm font-bold border-none outline-none text-white cursor-pointer px-4"
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
                  className={`group rounded-[40px] bg-[var(--section-bg)] border border-white/5 overflow-hidden shadow-2xl transition-all duration-500 hover:border-[var(--neon-green)]/30 hover:shadow-[var(--neon-green)]/5 hover:-translate-y-1 ${isCurrentMonth ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                >
                  <div className="bg-white/5 p-8 border-b border-white/5 flex justify-between items-center">
                    <span className={`font-black italic uppercase tracking-tight ${isCurrentMonth ? 'text-4xl' : 'text-xl'}`}>{month.name}</span>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-[#A1A1AA] uppercase">
                        {month.name === "Janeiro" ? "31" : 
                         month.name === "Fevereiro" ? "28" : 
                         month.name === "Março" ? "31" : 
                         month.name === "Abril" ? "30" : 
                         month.name === "Maio" ? "31" : 
                         month.name === "Junho" ? "30" : 
                         month.name === "Julho" ? "31" : 
                         month.name === "Agosto" ? "4" : month.activities.length}/{month.days} dias</p>
                      <p className="text-[10px] font-black text-[var(--neon-green)] uppercase">
                        {month.name === "Janeiro" ? "246,48" : 
                         month.name === "Fevereiro" ? "318,45" : 
                         month.name === "Março" ? "206,99" : 
                         month.name === "Abril" ? "242,26" : 
                         month.name === "Maio" ? "208,71" : 
                         month.name === "Junho" ? "133,18" : 
                         month.name === "Julho" ? "239,08" : 
                         month.name === "Agosto" ? "32,76" : (month.activities.length * 6.7).toFixed(1)}km</p>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className={`grid gap-2 ${isCurrentMonth ? 'grid-cols-7' : 'grid-cols-7'}`}>
                      {Array.from({ length: month.days }).map((_, i) => {
                        const day = i + 1;
                        const hasActivity = month.activities.includes(day);
                        // Mocking levels
                        const intensity = day % 3; 
                        const isSpecial = day === 15;
                        
                        return (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.15, zIndex: 10, backgroundColor: "var(--neon-green-hover)" }}
                            className={`aspect-square rounded-xl flex items-center justify-center text-[10px] font-black transition-all relative group/day cursor-pointer ${
                              hasActivity 
                                ? "bg-[var(--neon-green)] text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                : day < new Date().getDate() && isCurrentMonth
                                  ? "bg-[var(--rest-day)] text-[#A1A1AA]/50"
                                  : "bg-[var(--future-day)] text-[#A1A1AA]/30 border border-white/5"
                            }`}
                          >
                            {day}
                            {hasActivity && (
                              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[var(--neon-green)] text-white text-[10px] py-2 px-3 rounded-xl opacity-0 group-hover/day:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-2xl font-black uppercase z-20 border border-white/10">
                                {isSpecial ? "🏆 Recorde Pessoal" : `Dia ${day} Validado`}
                                <br />
                                <span className="text-[8px] opacity-80">6,70km • 4:18 pace</span>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--neon-green)]" />
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
               <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--glow-orange)] to-[#FF9F0A]" style={{ width: '60%' }} />
               
               <div className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-between w-full px-4">
                 {[
                   { label: 'Janeiro', active: true },
                   { label: '100 Dias', active: true, value: '100' },
                   { label: '200 Dias', active: true, value: '200' },
                   { label: 'Hoje', active: true, color: 'var(--glow-orange)' }
                 ].map((point, i) => (
                   <div key={i} className="flex flex-col items-center">
                     <div className={`w-4 h-4 rounded-full border-4 border-[var(--background)] ${point.active ? 'bg-[var(--glow-orange)]' : 'bg-white/10'}`} />
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#A1A1AA] mt-4">{point.label}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        </div>
      </section>


      {/* Desempenho / Chart Section */}
      <section id="desempenho" className="py-20 bg-[var(--background)] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="text-left">
              <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter mb-6 leading-[0.9]">Seu Desempenho</h2>
              <p className="text-[#A1A1AA] text-base">Métricas avançadas e análise de performance semanal.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
             {[
               { label: 'Total Mês', value: '32,76', unit: 'km', color: 'var(--neon-green)' },
               { label: 'Distância', value: '62.4', unit: 'km', color: 'var(--glow-orange)' },
               { label: 'Pace', value: '4:18', unit: '/km', color: '#fff' },
               { label: 'Tempo', value: '4:28', unit: 'h', color: '#fff' },
               { label: 'Elevação', value: '842', unit: 'm', color: '#fff' }
             ].map((m, i) => (
               <div key={i} className="bg-[var(--section-bg)] p-4 rounded-[32px] border border-white/5 relative overflow-hidden group">
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A1A1AA] mb-4">{m.label}</div>
                 <div className="text-4xl font-black italic uppercase tracking-tighter" style={{ color: m.color }}>
                   {m.value}
                   <span className="text-sm ml-1 opacity-60 normal-case font-bold">{m.unit}</span>
                 </div>
               </div>
             ))}
          </div>

          <div className="bg-[var(--section-bg)] rounded-[40px] p-10 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--neon-green)]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#A1A1AA]">Volume Semanal</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--neon-green)]" />
                  <span className="text-xs font-black uppercase text-[#A1A1AA]">Distância (km)</span>
                </div>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Seg', val: 6.5 },
                  { name: 'Ter', val: 7.2 },
                  { name: 'Qua', val: 6.8 },
                  { name: 'Qui', val: 8.1 },
                  { name: 'Sex', val: 5.9 },
                  { name: 'Sáb', val: 12.4 },
                  { name: 'Dom', val: 10.2 },
                ]}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#A1A1AA', fontSize: 10, fontWeight: 900}} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px', fontWeight: '900'}}
                  />
                  <Bar dataKey="val" fill="var(--neon-green)" radius={[8, 8, 0, 0]}>
                    {Array.from({length: 7}).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === 5 ? 'var(--glow-orange)' : 'rgba(255,255,255,0.1)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>


      {/* Profile Card Section */}
      <section id="perfil" className="py-28 bg-[var(--background)] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
           <motion.div 
            whileHover={{ rotateY: 5, rotateX: 2 }}
            className="rounded-[40px] bg-gradient-to-br from-[var(--section-bg)] to-[var(--background)] p-12 border border-white/5 shadow-2xl relative overflow-hidden group perspective-1000"
          >
            <div className="absolute inset-0 bg-[var(--glow-orange)]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[var(--glow-orange)]/10 rounded-full blur-[100px] group-hover:bg-[var(--glow-orange)]/20 transition-all duration-700" />
            
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="relative">
                <div className="w-48 h-48 rounded-[40px] border-4 border-[#FF6A00] p-2 overflow-hidden shadow-2xl relative z-10 transition-transform duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-[#FF6A00] blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity" />
                  <img src={profileHeroAsset.url} alt="Profile" className="w-full h-full object-cover rounded-[32px] bg-[#050505] relative z-10" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-6">
                  <div>
                    <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Francisco Chagas</h3>
                    <div className="flex items-center gap-2 text-[#A1A1AA] text-xs font-black uppercase tracking-widest">
                       <CheckCircle2 className="w-4 h-4 text-[#18A957]" />
                       Desafio ativo • Runner since 2018
                    </div>
                  </div>
                </div>
                
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#A1A1AA] mb-8">São Paulo, SP • Corredor Amador Autodidata</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#A1A1AA] tracking-[0.2em] mb-2">Sequência</p>
                    <p className="text-3xl font-black italic uppercase text-white">216 dias</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#A1A1AA] tracking-[0.2em] mb-2">Acumulado</p>
                    <p className="text-3xl font-black italic uppercase text-white">1.627,91km</p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-[10px] font-black uppercase text-[#A1A1AA] tracking-[0.2em] mb-2">Pace Médio</p>
                    <p className="text-3xl font-black italic uppercase text-[var(--glow-orange)]">4:18/km</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-6 bg-[var(--background)] border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="text-[#A1A1AA] hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-[#A1A1AA] hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
            <a href="#" className="text-[#A1A1AA] hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
          </div>

          <p className="text-[#A1A1AA] text-[9px] font-black uppercase tracking-widest opacity-40">
            2026 &copy; <span className="text-white">Francisco</span> <span className="text-[var(--neon-green)]">Chagas</span>
          </p>
        </div>
      </footer>


    </div>
  );
}
