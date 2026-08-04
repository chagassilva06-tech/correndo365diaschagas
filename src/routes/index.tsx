import { createFileRoute } from "@tanstack/react-router";
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
  ChevronDown
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

export const Route = createFileRoute("/")({
  head: () => ({
    title: "Corra Todo Santo Dia | Desafio de Consistência",
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
  const [currentMonth, setCurrentMonth] = useState("Agosto");
  
  return (
    <div className="min-h-screen bg-[#F6F7F8] text-[#172033] font-sans pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E4E7EC]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF9F0A] rounded-lg flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">Corra Todo Santo Dia</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#697386]">
            <a href="#" className="hover:text-[#172033] transition-colors">Início</a>
            <a href="#" className="hover:text-[#172033] transition-colors">Calendário</a>
            <a href="#" className="hover:text-[#172033] transition-colors">Estatísticas</a>
            <a href="#" className="hover:text-[#172033] transition-colors">Sobre</a>
          </nav>
          
          <Button className="bg-[#172033] hover:bg-[#172033]/90 text-white gap-2">
            <Zap className="w-4 h-4 fill-current" />
            Conectar Strava
          </Button>
        </div>
      </header>

      <section className="pt-32 pb-16 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="border-[#FF9F0A] text-[#FF9F0A] bg-orange-50 gap-2 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9F0A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9F0A]"></span>
                </span>
                DESAFIO ATIVO
              </Badge>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight leading-tight text-[#172033]">
              Corra Todo <br />
              <span className="text-[#FF9F0A]">Santo Dia</span>
            </h1>
            
            <p className="text-xl text-[#697386] mb-8 leading-relaxed max-w-lg">
              Corra todos os dias com Sérgio Rocha, do canal Corrida no Ar. Um desafio de consistência para transformar a corrida em parte da sua rotina.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="bg-[#172033] hover:bg-[#172033]/90 px-8 rounded-xl h-14 text-base font-semibold">
                Ver meu calendário
              </Button>
              <Button variant="outline" size="lg" className="border-[#E4E7EC] hover:bg-gray-100 px-8 rounded-xl h-14 text-base font-semibold">
                Como funciona
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-[#697386]">
              <Zap className="w-4 h-4 text-[#FF9F0A]" />
              Atividades sincronizadas automaticamente com o Strava.
            </div>
          </div>
          
          <div className="relative">
            <Card className="rounded-[24px] overflow-hidden border-none shadow-xl bg-white p-2">
              <div className="bg-gradient-to-br from-[#172033] to-[#2a3b5e] rounded-[20px] p-6 text-white">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full border-2 border-white/20 overflow-hidden bg-gray-200">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Francisco" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Francisco Chagas</h3>
                    <p className="text-white/60 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> São Paulo — SP
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Badge className="bg-green-500/20 text-green-400 border-none">
                      Em andamento
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Sequência Atual</p>
                    <p className="text-3xl font-bold">216 <span className="text-sm font-normal opacity-60">dias</span></p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Acumulado</p>
                    <p className="text-3xl font-bold">1.632,5 <span className="text-sm font-normal opacity-60">km</span></p>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <p className="text-sm font-medium mb-3">Progresso Agosto/2026</p>
                  <div className="flex gap-1">
                    {[1, 1, 1, 0, 0, 0, 0].map((v, i) => (
                      <div key={i} className={`h-2 flex-1 rounded-full ${v ? 'bg-[#18A957]' : 'bg-white/10'}`}></div>
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-white/40">3 de 31 dias concluídos (10%)</p>
                </div>
              </div>
            </Card>
            
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-[#FF9F0A]/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -top-6 -left-6 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#172033]">Seu desempenho</h2>
              <p className="text-[#697386]">Acompanhe sua semana, sua sequência e todas as atividades sincronizadas pelo Strava.</p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-[#E4E7EC]">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9F0A]/10 text-[#FF9F0A] rounded-lg font-bold text-sm">
                <Footprints className="w-4 h-4" /> Corrida
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-[#697386] rounded-lg font-medium text-sm hover:text-[#172033]">
                <Bike className="w-4 h-4" /> Pedalada
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
                    <p className="text-2xl font-bold text-[#172033]">3,32 km</p>
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
          
          <div className="bg-white rounded-[24px] p-8 border border-[#E4E7EC] shadow-sm mb-8">
            <h3 className="text-lg font-bold mb-6">Últimas 12 semanas (Distância km)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Array.from({length: 12}).map((_, i) => ({ name: `S${i+1}`, val: Math.random() * 50 + 10 }))}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="val" fill="#FF9F0A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
               <h3 className="text-lg font-bold mb-4">Calendário Mensal</h3>
               <div className="grid grid-cols-7 gap-2 bg-white p-4 rounded-2xl shadow-sm border border-[#E4E7EC]">
                 {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(d => (
                   <div key={d} className="text-center text-xs font-bold text-[#697386] pb-2">{d}</div>
                 ))}
                 {Array.from({length: 31}).map((_, i) => (
                   <div key={i} className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center text-sm font-medium border border-gray-100 hover:border-orange-300">
                     {i + 1}
                   </div>
                 ))}
               </div>
            </div>
            
            <div className="bg-white rounded-[24px] p-6 border border-[#E4E7EC] shadow-sm">
              <h3 className="text-lg font-bold mb-4">Atividade mais recente</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-bold">Evening Run</p>
                <p className="text-sm text-gray-500">1,75 km · 13:05/km</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
        <BottomNav />
      </div>
    </div>
  );
}
