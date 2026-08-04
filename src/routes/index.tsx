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
      {/* Header Fixo */}
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

      {/* Hero Section */}
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
            
            {/* Decorativo */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-[#FF9F0A]/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -top-6 -left-6 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={<Activity className="text-[#FF9F0A]" />} 
              title="Sequência atual" 
              value="216 dias" 
              subtitle="1.632,5 km percorridos"
              footer="Correndo desde 31/12/2025"
            />
            <StatCard 
              icon={<Trophy className="text-[#FF9F0A]" />} 
              title="Maior sequência" 
              value="216 dias" 
              subtitle="1.632,5 km acumulados"
            />
            <StatCard 
              icon={<CheckCircle2 className="text-[#18A957]" />} 
              title="Dias concluídos" 
              value="216 dias ativos" 
              subtitle="59% do desafio concluído"
            />
            <StatCard 
              icon={<TrendingUp className="text-blue-500" />} 
              title="Média diária" 
              value="7,56 km/dia" 
              subtitle="Pace médio: 5:12/km"
            />
          </div>
        </div>
      </section>

      {/* Calendário Principal */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Minha jornada diária</h2>
            <p className="text-[#697386]">Cada bloco verde representa um dia com atividade sincronizada pelo Strava.</p>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-white border border-[#E4E7EC] rounded-lg px-4 py-2 text-sm font-medium">
              <option>2026</option>
              <option>2025</option>
            </select>
            <div className="flex border border-[#E4E7EC] rounded-lg p-1 bg-white">
              <button className="px-4 py-1.5 text-sm font-medium bg-[#172033] text-white rounded-md">Mês</button>
              <button className="px-4 py-1.5 text-sm font-medium text-[#697386] hover:text-[#172033]">Ano</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MonthCalendar 
            month="Agosto" 
            year={2026} 
            activeDays={3} 
            totalDays={31} 
            km={31.69} 
            completedDays={[1, 2, 3]}
            isCurrent={true}
          />
          <MonthCalendar 
            month="Julho" 
            year={2026} 
            activeDays={31} 
            totalDays={31} 
            km={239.08} 
            completedDays={Array.from({length: 31}, (_, i) => i + 1)}
          />
          <MonthCalendar 
            month="Junho" 
            year={2026} 
            activeDays={30} 
            totalDays={30} 
            km={225.45} 
            completedDays={Array.from({length: 30}, (_, i) => i + 1)}
          />
          <MonthCalendar 
            month="Maio" 
            year={2026} 
            activeDays={31} 
            totalDays={31} 
            km={245.12} 
            completedDays={Array.from({length: 31}, (_, i) => i + 1)}
          />
        </div>
      </section>

      {/* Heatmap Anual Estilo GitHub */}
      <section className="py-12 border-t border-[#E4E7EC]">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-[24px] border border-[#E4E7EC]">
            <h3 className="text-lg font-bold mb-6">Consistência Anual 2026</h3>
            <div className="flex flex-wrap gap-1 mb-6">
              {Array.from({ length: 365 }).map((_, i) => {
                const isActive = i < 216;
                let bgColor = "bg-[#EEF0F2]";
                if (isActive) {
                  if (i % 7 === 0) bgColor = "bg-[#18A957]";
                  else if (i % 3 === 0) bgColor = "bg-[#18A957]/60";
                  else bgColor = "bg-[#DDF5E7]";
                }
                return (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-[2px] ${bgColor} cursor-pointer hover:ring-2 hover:ring-[#FF9F0A] transition-all`}
                    title={`Dia ${i + 1}`}
                  ></div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#697386] justify-end">
              <span>Menos km</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-[#EEF0F2] rounded-[2px]"></div>
                <div className="w-3 h-3 bg-[#DDF5E7] rounded-[2px]"></div>
                <div className="w-3 h-3 bg-[#18A957]/60 rounded-[2px]"></div>
                <div className="w-3 h-3 bg-[#18A957] rounded-[2px]"></div>
              </div>
              <span>Mais km</span>
            </div>
          </div>
        </div>
      </section>

      {/* Desafio Continua */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-[#172033] rounded-[32px] overflow-hidden relative p-12 text-white">
          <div className="max-w-xl relative z-10">
            <h2 className="text-4xl font-bold mb-4">O desafio continua</h2>
            <p className="text-white/70 text-lg mb-8">
              A sequência é construída um dia de cada vez. A próxima corrida mantém o calendário vivo.
            </p>
            
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-2xl font-bold">216 <span className="text-sm font-normal opacity-60">de 365 dias</span></span>
                <span className="text-sm font-medium text-green-400">59% concluído</span>
              </div>
              <Progress value={59} className="h-3 bg-white/10" />
            </div>
            
            <p className="text-sm text-white/50 mb-8 italic">
              "Faltam 149 dias para completar um ano correndo todos os dias."
            </p>
            
            <Button size="lg" className="bg-[#FF9F0A] hover:bg-[#FF9F0A]/90 text-[#172033] font-bold rounded-xl h-14">
              Abrir atividade mais recente
            </Button>
          </div>
          
          {/* Gráfico decorativo de fundo */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-[#FF9F0A]/10 to-transparent pointer-events-none"></div>
          <Activity className="absolute -right-20 -bottom-20 w-80 h-80 text-white/5 rotate-12" />
        </div>
      </section>

      {/* Rodapé Navbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
        <BottomNav />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, footer }: any) {
  return (
    <Card className="border-[#E4E7EC] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="w-10 h-10 rounded-xl bg-[#F6F7F8] flex items-center justify-center mb-4">
          {icon}
        </div>
        <p className="text-xs font-semibold text-[#697386] uppercase tracking-wider mb-1">{title}</p>
        <p className="text-2xl font-bold text-[#172033] mb-1">{value}</p>
        <p className="text-sm text-[#697386] mb-4">{subtitle}</p>
        {footer && (
          <div className="pt-3 border-t border-[#E4E7EC] text-[10px] font-medium text-[#697386] uppercase">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MonthCalendar({ month, year, activeDays, totalDays, km, completedDays, isCurrent = false }: any) {
  const percent = Math.round((activeDays / totalDays) * 100);
  
  return (
    <Card className="border-[#E4E7EC] rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl font-bold">{month}/{year}</CardTitle>
          {isCurrent && <Badge className="bg-[#FF9F0A] text-[#172033] border-none font-bold">HOJE</Badge>}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] text-[#697386] font-bold uppercase tracking-wider">Ativos</p>
            <p className="font-bold text-sm">{activeDays}/{totalDays}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#697386] font-bold uppercase tracking-wider">Conclusão</p>
            <p className="font-bold text-sm text-[#18A957]">{percent}%</p>
          </div>
          <div>
            <p className="text-[10px] text-[#697386] font-bold uppercase tracking-wider">Distância</p>
            <p className="font-bold text-sm">{km} km</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-4">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => (
            <div key={d} className="text-[10px] font-bold text-[#697386] text-center uppercase">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const isCompleted = completedDays.includes(day);
            const isToday = isCurrent && day === 3;
            
            return (
              <div 
                key={day}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all cursor-pointer
                  ${isCompleted ? 'bg-[#DDF5E7] border border-[#18A957] text-[#18A957] hover:bg-[#18A957] hover:text-white' : 'bg-white border border-[#E4E7EC] text-[#172033] hover:border-[#FF9F0A]'}
                  ${isToday ? 'ring-2 ring-[#FF9F0A] ring-offset-1 border-[#FF9F0A]' : ''}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}




