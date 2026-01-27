// components/dashboard/views/analytics-view.tsx
'use client'

import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { formatStats } from "@/lib/utils/format";
import { Card } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, AreaChart, Area, Legend 
} from "recharts";
import { TrendingUp, Users, Leaf, Car, Repeat } from "lucide-react";

// Mocking trend data - In production, you'd fetch this from a 'monthly_stats' collection
const monthlyTrend = [
  { month: "Sep", co2: 120, trips: 45, activeUsers: 30, repetition: 65 },
  { month: "Oct", co2: 190, trips: 52, activeUsers: 38, repetition: 68 },
  { month: "Nov", co2: 230, trips: 68, activeUsers: 45, repetition: 72 },
  { month: "Dic", co2: 310, trips: 85, activeUsers: 55, repetition: 78 },
];

export function AnalyticsView() {
  const { companyData } = useAuth();
  
  if (!companyData) return null;

  // Logic for Participation Rate
  const totalEmployees = companyData.membersIds?.length || 0;
  const activeUsers = 55; // This would ideally be a count of users with >0 trips
  const participationRate = totalEmployees > 0 ? (activeUsers / totalEmployees) * 100 : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* 1. Impact Real Message & Total */}
      <div className="bg-[#2a2c38] p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Leaf size={120} className="text-[#9dd187]" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 text-[#9dd187] mb-4">
            <div className="h-px w-8 bg-[#9dd187]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Impacto Real</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Compartir coche: impacto directo en CO₂e</h2>
          <p className="text-gray-400 font-medium leading-relaxed mb-8">
            Acumula el máximo CO2e mensualmente entre toda tu plantilla y te lo mostraremos con gráficos y comparaciones equivalentes.
          </p>
          <div className="flex items-baseline gap-4">
            <span className="text-6xl font-black text-[#9dd187] tracking-tighter">
              {formatStats(companyData.totalCo2 || 0)}
            </span>
            <span className="text-xl text-gray-400 font-bold uppercase">Kg CO2e Evitados</span>
          </div>
        </div>
      </div>

      {/* 2. Key Insights Grid (Participation, Occupancy, Growth) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-green-50 rounded-2xl text-[#9dd187]">
              <Users size={24} />
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tasa de Participación</p>
          <h3 className="text-4xl font-black text-[#2a2c38]">{participationRate.toFixed(1)}%</h3>
        </Card>

        <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-blue-50 rounded-2xl text-blue-500">
              <Car size={24} />
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">+5%</span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Ocupación Media / Vehículo</p>
          <h3 className="text-4xl font-black text-[#2a2c38]">3.2</h3>
        </Card>

        <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-purple-50 rounded-2xl text-purple-500">
              <Repeat size={24} />
            </div>
            <span className="text-xs font-bold text-purple-500 bg-purple-50 px-3 py-1 rounded-full">+8.2%</span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Trayectos Compartidos</p>
          <h3 className="text-4xl font-black text-[#2a2c38]">{companyData.totalTrips || 0}</h3>
        </Card>
      </div>

      {/* 3. Main Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Monthly Activity (Trips & Active Users) */}
        <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h3 className="text-lg font-black text-[#2a2c38] uppercase tracking-tight">Actividad Mensual</h3>
              <p className="text-sm text-gray-400 font-medium text-pretty">Trayectos vs Usuarios Activos</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                <Legend iconType="circle" />
                <Bar dataKey="trips" fill="#9dd187" radius={[10, 10, 0, 0]} name="Trayectos" />
                <Bar dataKey="activeUsers" fill="#2a2c38" radius={[10, 10, 0, 0]} name="Usuarios Activos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sustainability Report (CO2e avoided) */}
        <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
          <div className="mb-8">
            <h3 className="text-lg font-black text-[#2a2c38] uppercase tracking-tight">Sostenibilidad Mensual</h3>
            <p className="text-sm text-gray-400 font-medium">CO2e Evitado acumulado (Kg)</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9dd187" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9dd187" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none'}} />
                <Area type="monotone" dataKey="co2" stroke="#9dd187" strokeWidth={4} fillOpacity={1} fill="url(#colorCo2)" name="CO2e Evitado" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Repetition Rate (Loyalty) */}
        <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white lg:col-span-2">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-black text-[#2a2c38] uppercase tracking-tight">Tasa de Repetición Semanal</h3>
              <p className="text-sm text-gray-400 font-medium">Usuarios que repiten hábito como conductor/pasajero</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[#2a2c38]">78%</span>
              <p className="text-[10px] font-black text-[#9dd187] uppercase tracking-widest">Fidelidad Alta</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none'}} />
                <Line type="stepAfter" dataKey="repetition" stroke="#2a2c38" strokeWidth={4} dot={{ r: 8, fill: '#9dd187', strokeWidth: 0 }} name="% Repetición" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}