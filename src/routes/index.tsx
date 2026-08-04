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
  User
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
import { motion } from "framer-motion";
import { useState } from "react";
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

export const Route = createFileRoute("/")({
  head: () => ({
    title: "Correndo todo dia | Desafio de Consistência",
    meta: [
      { name: "description", content: "Desafio de corrida diária com Sérgio Rocha. Sincronize suas atividades do Strava e acompanhe sua jornada." },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Desafio de corrida diária com Sérgio Rocha. Sincronize suas atividades do Strava e acompanhe sua jornada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState("Agosto");
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [selectedModality, setSelectedModality] = useState<"corrida" | "pedalada">("corrida");
  
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

  const [selectedMonth, setSelectedMonth] = useState<string>("Todos");

  const filteredMonths = selectedMonth === "Todos" 
    ? months 
    : months.filter(m => m.name === selectedMonth);

  
  return (
    <div className="min-h-screen bg-[#F6F7F8] text-[#172033] font-sans pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E4E7EC]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF9F0A] rounded-lg flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-lg tracking-tighter italic uppercase">Correndo todo dia</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#697386]">
            <a href="#" className="hover:text-[#172033] transition-colors" onClick={(e) => { e.preventDefault(); navigate({ to: "/" }); }}>Início</a>
            <a href="#desempenho" className="hover:text-[#172033] transition-colors">Calendário</a>
            <a href="#desempenho" className="hover:text-[#172033] transition-colors">Estatísticas</a>
            <a 
              href="https://www.strava.com/athletes/44632513" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 bg-white border border-[#E4E7EC] text-[#172033] px-3 py-1.5 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors shadow-sm"
            >
              <img src={stravaOfficialAsset.url} alt="Strava" className="w-5 h-5 object-contain" />
              Strava
            </a>
          </nav>
          
          <Button className="bg-[#FC4C02] hover:bg-[#FC4C02]/90 text-white gap-2 font-bold rounded-full">
            <img src={stravaOfficialAsset.url} alt="Strava" className="w-4 h-4 brightness-0 invert" />
            Conectar Strava
          </Button>
        </div>
      </header>

      <section className="pt-32 pb-16 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="border-[#18A957] text-[#18A957] bg-green-50 gap-2 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18A957] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#18A957]"></span>
                </span>
                DESAFIO ATIVO
              </Badge>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black mb-4 tracking-tighter leading-[0.9] text-[#172033] italic uppercase">
              Correndo <br />
              <span className="text-[#FF9F0A]">todo dia</span>
            </h1>
            
            <p className="text-xl text-[#697386] mb-8 leading-relaxed max-w-lg">
              Corra todos os dias com Sérgio Rocha, do canal Corrida no Ar. Um desafio de consistência para transformar a corrida em parte da sua rotina.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-[#172033] hover:bg-[#172033]/90 px-8 rounded-xl h-14 text-base font-semibold"
                onClick={() => document.getElementById('jornada-anual')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver meu calendário
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-[#697386]">
              <Zap className="w-4 h-4 text-[#FF9F0A]" />
              Atividades sincronizadas automaticamente com o Strava.
            </div>
          </div>
          
          <div className="relative">
            <Card className="rounded-[24px] overflow-hidden border-none shadow-xl bg-white p-2 max-w-sm mx-auto">
                <div id="perfil" className="bg-gradient-to-br from-[#172033] to-[#2a3b5e] rounded-[20px] p-5 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-full border-2 border-white/20 overflow-hidden bg-gray-200 relative group">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Francisco" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">Francisco Chagas</h3>
                        <button 
                          onClick={() => setDeleteCategory(!deleteCategory)}
                          className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      {deleteCategory && (
                        <button 
                          className="text-[10px] text-red-400 font-bold hover:text-red-300 mt-1 flex items-center gap-1"
                          onClick={() => {
                            alert("Categoria apagada!");
                            setDeleteCategory(false);
                          }}
                        >
                          <Trash2 className="w-3 h-3" /> Apagar? categoria
                        </button>
                      )}
                      <p className="text-white/60 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> São Paulo — SP
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Badge className="bg-green-500/20 text-green-400 border-none text-[10px] px-2 py-0">
                        <User className="w-3 h-3 mr-1" /> Ativo
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Sequência Atual</p>
                      <p className="text-2xl font-bold">216 <span className="text-xs font-normal opacity-60">dias</span></p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Acumulado</p>
                      <p className="text-2xl font-bold">1.632,5 <span className="text-xs font-normal opacity-60">km</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                    <p className="text-xs font-medium mb-2">Progresso Agosto/2026</p>
                    <div className="flex gap-1">
                      {[1, 1, 1, 0, 0, 0, 0].map((v, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full ${v ? 'bg-[#18A957]' : 'bg-white/10'}`}></div>
                      ))}
                    </div>
                    <p className="mt-1.5 text-[9px] text-white/40">3 de 31 dias concluídos (10%)</p>
                  </div>
                </div>
            </Card>
            
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-[#FF9F0A]/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -top-6 -left-6 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      <section id="desempenho" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#172033]">Seu desempenho</h2>
              <p className="text-[#697386]">Acompanhe sua semana, sua sequência e todas as atividades sincronizadas pelo Strava.</p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-[#E4E7EC]">
              <button 
                onClick={() => setSelectedModality("corrida")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors ${selectedModality === "corrida" ? "bg-[#FF9F0A]/10 text-[#FF9F0A]" : "text-[#697386] hover:text-[#172033]"}`}
              >
                <Footprints className="w-4 h-4" /> Corrida
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 rounded-[24px] shadow-sm border-[#E4E7EC]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Esta semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-[#697386] font-bold uppercase">Distância</p>
                    <p className="text-2xl font-bold text-[#172033]">6,70 km</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#697386] font-bold uppercase">Tempo</p>
                    <p className="text-2xl font-bold text-[#172033]">39min</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#697386] font-bold uppercase">Elevação</p>
                    <p className="text-2xl font-bold text-[#172033]">69 m</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[24px] shadow-sm border-[#E4E7EC]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Sequência atual</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-[#FF9F0A]">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#172033]">73 dias</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-[32px] p-6 border border-[#E4E7EC] shadow-sm mb-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF9F0A] to-orange-300 opacity-80" />
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#697386] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#FF9F0A]" />
                Últimas 12 semanas (Distância km)
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#FF9F0A]" />
                  <span className="text-[10px] font-bold text-[#697386]">META: 40km</span>
                </div>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={Array.from({length: 12}).map((_, i) => ({ 
                    name: `S${i+1}`, 
                    val: Math.random() * 50 + 10,
                    meta: 40
                  }))}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}}
                  />
                  <Tooltip 
                    cursor={{fill: '#F8FAFC'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold'}}
                  />
                  <Bar 
                    dataKey="val" 
                    radius={[6, 6, 0, 0]}
                    barSize={24}
                  >
                    {Array.from({length: 12}).map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 11 ? '#FF9F0A' : '#E2E8F0'} 
                        className="transition-all duration-300 hover:opacity-80"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div id="jornada-anual" className="grid grid-cols-1 gap-6">
            <div className="w-full">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-bold uppercase text-[#697386] text-xs">Jornada Anual</h3>
                 <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-[#697386] uppercase">Filtrar:</span>
                   <select 
                     value={selectedMonth}
                     onChange={(e) => setSelectedMonth(e.target.value)}
                     className="text-xs font-bold bg-white border border-[#E4E7EC] rounded-lg px-2 py-1 outline-none text-[#172033] cursor-pointer"
                   >
                     <option value="Todos">Todos os meses</option>
                     {months.map(m => (
                       <option key={m.name} value={m.name}>{m.name}</option>
                     ))}
                   </select>
                 </div>
               </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredMonths.map((month) => (
                    <Card key={month.name} className="overflow-hidden border-[#E4E7EC] shadow-sm rounded-xl">
                      <div className="bg-gray-50 border-b border-[#E4E7EC] p-3 text-center">
                        <p className="font-bold text-[#172033]">{month.name}/2026</p>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex gap-4 mb-4">
                          <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="relative w-16 h-16 flex items-center justify-center mb-1">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="transparent"
                                  className="text-gray-100"
                                />
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="transparent"
                                  strokeDasharray={175.9}
                                  strokeDashoffset={175.9 * (1 - month.activities.length / month.days)}
                                  className="text-[#18A957] transition-all duration-500"
                                />
                              </svg>
                              <span className="absolute text-xs font-bold">{Math.round((month.activities.length / month.days) * 100)}%</span>
                            </div>
                          </div>
                          <div className="flex-1 text-[10px] text-[#697386] font-medium leading-tight flex flex-col justify-center gap-0.5">
                            <p className="font-bold text-gray-800 text-[11px]">{month.activities.length}/{month.days} dias ativos</p>
                            <p className="font-bold text-gray-800 text-[11px]">Total: {(month.activities.length * 6.7).toFixed(2)}km</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                          {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
                            <div key={i} className="text-center text-[8px] font-bold text-[#697386] mb-1">{d}</div>
                          ))}
                          {Array.from({ length: month.days }).map((_, i) => {
                            const day = i + 1;
                            const hasActivity = month.activities.includes(day);
                            return (
                              <div
                                key={i}
                                title={hasActivity ? "dia validado" : undefined}
                                className={`aspect-square rounded-[6px] flex items-center justify-center text-[8px] transition-all group relative cursor-pointer font-bold ${
                                  hasActivity 
                                    ? "bg-[#D1FAE5] text-[#18A957] border-b-2 border-r-2 border-[#10B981]/30 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.6)] hover:scale-110 z-10" 
                                    : "bg-gray-50 text-gray-300 border border-gray-100 shadow-[inset_0px_1px_2px_rgba(0,0,0,0.02)]"
                                }`}
                              >
                                {day}
                                {hasActivity && (
                                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#172033] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    dia validado
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-[#E4E7EC] bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#697386] text-sm font-medium">
            &copy; {new Date().getFullYear()} Desenvolvido por <span className="text-[#172033] font-bold">Francisco Chagas</span>
          </p>
        </div>
      </footer>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
        <BottomNav />
      </div>
    </div>

  );
}
