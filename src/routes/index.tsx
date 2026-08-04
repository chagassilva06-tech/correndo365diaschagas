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
  Github
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
  Cell
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

function CountUp({ end, duration = 2 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return <span>{count.toLocaleString()}</span>;
}

function Index() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState<string>("Todos");
  
  const months = [
    { name: "Janeiro", days: 31, activities: Array.from({ length: 31 }, (_, i) => i + 1) },
    { name: "Fevereiro", days: 28, activities: Array.from({ length: 28 }, (_, i) => i + 1) },
    { name: "Março", days: 31, activities: Array.from({ length: 31 }, (_, i) => i + 1) },
    { name: "Abril", days: 30, activities: Array.from({ length: 30 }, (_, i) => i + 1) },
    { name: "Maio", days: 31, activities: Array.from({ length: 31 }, (_, i) => i + 1) },
    { name: "Junho", days: 30, activities: Array.from({ length: 30 }, (_, i) => i + 1) },
    { name: "Julho", days: 31, activities: Array.from({ length: 31 }, (_, i) => i + 1) },
    { name: "Agosto", days: 31, activities: [1, 2, 3] },
  ];

  const filteredMonths = selectedMonth === "Todos" 
    ? months 
    : months.filter(m => m.name === selectedMonth);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-32 selection:bg-[#00E5FF]/30 selection:text-[#00E5FF]">
      {/* Topographic Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 Q 50 40 90 10 M10 30 Q 50 60 90 30 M10 50 Q 50 80 90 50 M10 70 Q 50 100 90 70' stroke='white' fill='none'/%3E%3C/svg%3E")` }} />

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/40 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate({ to: "/" })}>
            <div className="w-10 h-10 bg-[#FF5A1F] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,90,31,0.3)] group-hover:shadow-[0_0_30px_rgba(255,90,31,0.5)] transition-all duration-500">
              <Activity className="text-white w-6 h-6" />
            </div>
            <motion.span 
              whileHover={{ scale: 1.02 }}
              className="font-black text-xl tracking-tighter italic uppercase bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
            >
              Correndo todo dia
            </motion.span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10 text-sm font-bold tracking-widest uppercase text-[#A1A1AA]">
            <a href="#" className="hover:text-white transition-colors duration-300">Início</a>
            <a href="#jornada-anual" className="hover:text-white transition-colors duration-300">Calendário</a>
            <a href="#desempenho" className="hover:text-white transition-colors duration-300">Estatísticas</a>
            <div className="flex items-center gap-4 border-l border-white/10 pl-10">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.strava.com/athletes/44632513" target="_blank" rel="noreferrer" className="hover:text-[#FC4C02] transition-colors">
                <img src={stravaOfficialAsset.url} alt="Strava" className="w-5 h-5 object-contain" />
              </a>
            </div>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate({ to: "/sync" })}
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/5 border border-white/10 px-6 rounded-full transition-all"
            >
              Conectar Strava
            </Button>
          </div>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Immersive Hero Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#050505] z-10 opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF5A1F]/10 via-transparent to-transparent z-0 animate-pulse" />
          {/* Simulated Video Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-10" />
        </div>

        <div className="container relative z-20 mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <Badge variant="outline" className="border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/5 gap-3 px-5 py-2 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(0,229,255,0.1)] border-white/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E5FF]"></span>
              </span>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">Desafio ao vivo</span>
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-7xl lg:text-[140px] font-black mb-10 tracking-tighter leading-[0.85] italic uppercase"
          >
            Correndo <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-[#FF9F0A] drop-shadow-[0_0_30px_rgba(255,90,31,0.3)]">todo dia</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg lg:text-2xl text-[#A1A1AA] mb-14 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            365 dias. Uma única missão. <br />
            <span className="text-white">Transformando disciplina em quilômetros.</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              size="lg"
              className="bg-white text-[#050505] hover:bg-white/90 px-12 py-8 rounded-full text-xl font-black uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all group"
              onClick={() => document.getElementById('jornada-anual')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Entrar no desafio
              <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#050505] relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "dias", value: 365, icon: CalendarIcon },
              { label: "corridas", value: 216, icon: Footprints },
              { label: "quilômetros", value: 2840, suffix: " km", icon: TrendingUp },
              { label: "horas", value: 327, icon: Clock },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-[32px] bg-[#0F0F10] border border-white/5 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5A1F]/5 rounded-full -mr-8 -mt-8 blur-2xl group-hover:bg-[#FF5A1F]/10 transition-all duration-500" />
                <stat.icon className="w-8 h-8 text-[#FF5A1F] mb-6" />
                <div className="text-5xl font-black tracking-tighter mb-2 italic uppercase">
                  <CountUp end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-sm font-bold tracking-[0.2em] uppercase text-[#A1A1AA]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jornada Anual Section */}
      <section id="jornada-anual" className="py-24 bg-[#050505] relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none">Jornada Anual</h2>
              <p className="text-[#A1A1AA] text-lg">A principal atração do seu progresso. Cada dia é um passo em direção à consistência inabalável.</p>
            </div>
            <div className="flex items-center gap-4 bg-[#0F0F10] p-2 rounded-2xl border border-white/5 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#A1A1AA] ml-4">Filtrar:</span>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-sm font-bold border-none outline-none text-white cursor-pointer px-4"
              >
                <option value="Todos">Todos os meses</option>
                {months.map(m => (
                  <option key={m.name} value={m.name} className="bg-[#0F0F10]">{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMonths.map((month, mIdx) => (
              <motion.div 
                key={month.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: mIdx * 0.05 }}
                viewport={{ once: true }}
                className="group rounded-[32px] bg-[#0F0F10] border border-white/5 overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#FF5A1F]/30 hover:shadow-[#FF5A1F]/5"
              >
                <div className="bg-white/5 p-6 border-b border-white/5 flex justify-between items-center">
                  <span className="font-black italic uppercase text-lg tracking-tight">{month.name}</span>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-[#A1A1AA] uppercase">{month.activities.length}/{month.days} dias</p>
                    <p className="text-[10px] font-black text-[#FF5A1F] uppercase">{(month.activities.length * 6.7).toFixed(1)}km</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: month.days }).map((_, i) => {
                      const day = i + 1;
                      const hasActivity = month.activities.includes(day);
                      return (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.2, zIndex: 10 }}
                          className={`aspect-square rounded-lg flex items-center justify-center text-[8px] font-black transition-all relative group/day cursor-pointer ${
                            hasActivity 
                              ? "bg-gradient-to-br from-[#FF5A1F] to-[#FF9F0A] text-white shadow-[0_0_15px_rgba(255,90,31,0.3)]" 
                              : "bg-white/5 text-[#A1A1AA]/30 border border-white/5"
                          }`}
                        >
                          {day}
                          {hasActivity && (
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-[#050505] text-[10px] py-2 px-3 rounded-xl opacity-0 group-hover/day:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-2xl font-black uppercase z-20">
                              {day} de {month.name} ✔
                              <br />
                              <span className="text-[8px] opacity-60">6,70km • 4:18 pace</span>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Desempenho / Chart Section */}
      <section id="desempenho" className="py-24 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter mb-4">Seu Desempenho</h2>
              <p className="text-[#A1A1AA] text-lg">Métricas avançadas e análise de performance semanal.</p>
            </div>
            <div className="w-full md:w-auto flex bg-[#0F0F10] p-2 rounded-2xl border border-white/5">
              <Button className="bg-[#FF5A1F] text-white rounded-xl px-8 py-6 font-black uppercase tracking-widest italic shadow-[0_0_20px_rgba(255,90,31,0.2)]">Corrida</Button>
            </div>
          </div>

          <div className="bg-[#0F0F10] rounded-[40px] p-10 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5A1F]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#A1A1AA]">Últimas 12 semanas (Distância km)</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5A1F]" />
                  <span className="text-xs font-black uppercase text-[#A1A1AA]">Meta Alcançada</span>
                </div>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={Array.from({length: 12}).map((_, i) => ({ 
                    name: `S${i+1}`, 
                    val: 30 + Math.random() * 40
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#A1A1AA', fontSize: 10, fontWeight: 900}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#A1A1AA', fontSize: 10, fontWeight: 900}}
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.03)'}}
                    contentStyle={{backgroundColor: '#050505', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', fontWeight: '900', color: '#fff'}}
                  />
                  <Bar 
                    dataKey="val" 
                    radius={[8, 8, 0, 0]}
                    barSize={40}
                  >
                    {Array.from({length: 12}).map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 11 ? '#FF5A1F' : 'rgba(255,255,255,0.1)'} 
                        className="transition-all duration-500 hover:opacity-100 hover:fill-[#FF5A1F]/50"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Card Section (formerly Francisco Chagas card) */}
      <section id="perfil" className="py-24 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
           <motion.div 
            whileHover={{ rotateY: 5, rotateX: 2 }}
            className="rounded-[40px] bg-gradient-to-br from-[#0F0F10] to-[#050505] p-12 border border-white/5 shadow-2xl relative overflow-hidden group perspective-1000"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FF5A1F]/10 rounded-full blur-[100px] group-hover:bg-[#FF5A1F]/20 transition-all duration-700" />
            
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="relative">
                <div className="w-48 h-48 rounded-[40px] border-4 border-[#FF5A1F]/20 p-2 overflow-hidden shadow-2xl">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Francisco" alt="Profile" className="w-full h-full object-cover rounded-[32px] bg-[#050505]" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#FF5A1F] text-white p-4 rounded-2xl shadow-xl">
                  <Trophy className="w-8 h-8" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <img src={runnerLogoAsset.url} alt="Runner Icon" className="w-10 h-10 object-contain brightness-0 invert opacity-80" />
                    <h3 className="text-5xl font-black italic uppercase tracking-tighter">Francisco Chagas</h3>
                  </div>
                  <Badge className="bg-[#18A957]/10 text-[#18A957] border-[#18A957]/20 uppercase font-black text-[10px] tracking-widest py-1.5 px-4 rounded-full">Pro Member</Badge>
                </div>
                <p className="text-xl text-[#A1A1AA] mb-8 font-medium">São Paulo, SP • Corredor de Elite</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#A1A1AA] tracking-[0.2em] mb-2">Sequência</p>
                    <p className="text-3xl font-black italic uppercase text-white">216 dias</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#A1A1AA] tracking-[0.2em] mb-2">Acumulado</p>
                    <p className="text-3xl font-black italic uppercase text-white">1.632km</p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-[10px] font-black uppercase text-[#A1A1AA] tracking-[0.2em] mb-2">Pace Médio</p>
                    <p className="text-3xl font-black italic uppercase text-[#FF5A1F]">4:18/km</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-24 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-8 mb-12">
            <a href="https://www.strava.com/athletes/44632513" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-[#0F0F10] border border-white/5 flex items-center justify-center hover:border-[#FC4C02] transition-colors"><img src={stravaOfficialAsset.url} className="w-6 h-6" /></a>
            <a href="#" className="w-12 h-12 rounded-2xl bg-[#0F0F10] border border-white/5 flex items-center justify-center hover:border-white transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="w-12 h-12 rounded-2xl bg-[#0F0F10] border border-white/5 flex items-center justify-center hover:border-red-600 transition-colors"><Youtube className="w-6 h-6" /></a>
            <a href="#" className="w-12 h-12 rounded-2xl bg-[#0F0F10] border border-white/5 flex items-center justify-center hover:border-white transition-colors"><Github className="w-6 h-6" /></a>
          </div>
          
          <div className="max-w-md mx-auto mb-12">
            <h4 className="text-sm font-black uppercase tracking-[0.4em] mb-6 text-[#A1A1AA]">Manifesto</h4>
            <div className="flex flex-col gap-2 text-2xl font-black italic uppercase tracking-tighter">
              <span>Disciplina.</span>
              <span>Consistência.</span>
              <span>Evolução.</span>
              <span className="text-[#FF5A1F]">Todos os dias.</span>
            </div>
          </div>

          <p className="text-[#A1A1AA] text-xs font-black uppercase tracking-widest">
            2026 &copy; <span className="text-white">Francisco</span> <span className="text-[#FF5A1F]">Chagas</span>
          </p>
        </div>
      </footer>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-6">
        <BottomNav />
      </div>
    </div>
  );
}
