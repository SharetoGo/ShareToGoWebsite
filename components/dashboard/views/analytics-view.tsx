// components/dashboard/views/analytics-view.tsx
'use client'

import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { getEcoEquivalence, formatStats } from "@/lib/utils/format";
import { Card } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line 
} from "recharts";
import { TrendingUp, TrendingDown, Activity, Leaf } from "lucide-react";

// Mock data for visualizations (In a real app, these would come from your 'trips' collection)
const timeDistribution = [
  { name: "Mañana (6-10 AM)", value: 45, color: "#9dd187" },
  { name: "Mediodía (10-14 PM)", value: 15, color: "#b8dfa8" },
  { name: "Tarde (14-18 PM)", value: 8, color: "#d3edc9" },
  { name: "Noche (18-22 PM)", value: 32, color: "#7cbd68" },
];

const weeklyTrends = [
  { week: "Sem 1", trips: 285, users: 142 },
  { week: "Sem 2", trips: 312, users: 156 },
  { week: "Sem 3", trips: 298, users: 149 },
  { week: "Sem 4", trips: 345, users: 172 },
];

export function AnalyticsView() {
  const { companyData } = useAuth();
  
  if (!companyData) return null;

  const eco = getEcoEquivalence(companyData.totalCo2);
  
  // Dynamic office data based on your headquarters array
  const officeData = companyData.headquarters?.map((city: string, index: number) => ({
    office: city,
    trips: Math.floor(companyData.totalTrips * (0.4 - index * 0.1)),
    co2: Math.floor(companyData.totalCo2 * (0.4 - index * 0.1)),
  })) || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#2a2c38]">Análisis Avanzado</h1>
        <p className="text-gray-500">Patrones de movilidad y métricas de sostenibilidad profunda</p>
      </div>

      {/* Impact Equivalence Card (The Premium Header) */}
      <div className="bg-[#2a2c38] p-8 rounded-4xl text-white overflow-hidden relative shadow-xl">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#9dd187] opacity-10 blur-[100px] rounded-full" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#9dd187]/20 rounded-3xl flex items-center justify-center border border-[#9dd187]/30">
              <Leaf className="text-[#9dd187] w-10 h-10" />
            </div>
            <div>
              <p className="text-[#9dd187] font-bold tracking-widest uppercase text-xs mb-1">Impacto Real Acumulado</p>
              <h2 className="text-4xl font-black">{formatStats(companyData.totalCo2)} <span className="text-lg font-normal opacity-60">kg CO2e</span></h2>
            </div>
          </div>
          <div className="flex gap-12 border-l border-white/10 pl-12">
            <div className="text-center">
              <p className="text-4xl font-black text-[#9dd187]">{eco.trees}</p>
              <p className="text-sm text-gray-400">Árboles eq.</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-blue-400">12</p>
              <p className="text-sm text-gray-400">Certificados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 rounded-3xl border-none shadow-sm bg-white">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 rounded-2xl text-[#9dd187]">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+18.5%</span>
          </div>
          <h3 className="text-3xl font-bold text-[#2a2c38]">75%</h3>
          <p className="text-sm text-gray-500">Tasa de participación</p>
        </Card>

        <Card className="p-6 rounded-3xl border-none shadow-sm bg-white">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
              <Activity size={24} />
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">Estable</span>
          </div>
          <h3 className="text-3xl font-bold text-[#2a2c38]">3.2</h3>
          <p className="text-sm text-gray-500">Ocupación media/vehículo</p>
        </Card>

        <Card className="p-6 rounded-3xl border-none shadow-sm bg-white">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 rounded-2xl text-orange-500">
              <TrendingDown size={24} />
            </div>
            <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">-€240</span>
          </div>
          <h3 className="text-3xl font-bold text-[#2a2c38]">14.7€</h3>
          <p className="text-sm text-gray-500">Ahorro medio por empleado</p>
        </Card>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Office Performance */}
        <Card className="p-8 rounded-3xl border-none shadow-sm bg-white">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#2a2c38]">Rendimiento por Sede</h3>
            <p className="text-sm text-gray-500">Comparativa de viajes y ahorro de CO2</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={officeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="office" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="trips" fill="#9dd187" radius={[6, 6, 0, 0]} name="Viajes" />
                <Bar dataKey="co2" fill="#2a2c38" radius={[6, 6, 0, 0]} name="CO2 Ahorrado" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Time Distribution */}
        <Card className="p-8 rounded-3xl border-none shadow-sm bg-white">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#2a2c38]">Distribución Horaria</h3>
            <p className="text-sm text-gray-500">Franjas de mayor uso del servicio</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeDistribution}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {timeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Weekly Trends Line Chart */}
      <Card className="p-8 rounded-3xl border-none shadow-sm bg-white">
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#2a2c38]">Tendencia de Actividad</h3>
          <p className="text-sm text-gray-500">Crecimiento de usuarios y viajes en las últimas 4 semanas</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="week" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
              <Legend />
              <Line type="monotone" dataKey="trips" stroke="#9dd187" strokeWidth={4} dot={{ r: 6 }} name="Viajes Totales" />
              <Line type="monotone" dataKey="users" stroke="#2a2c38" strokeWidth={4} dot={{ r: 6 }} name="Usuarios Activos" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}