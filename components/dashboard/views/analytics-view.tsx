// components/dashboard/views/analytics-view.tsx
'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { CompanyGoals } from "../widgets/company-goals";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, AreaChart, Area, Legend
} from "recharts";
import {
  Users, Leaf, Car, Repeat, Target, Loader2, TrendingUp, 
  Calendar, Route, UserCheck, Award, Info, ChevronDown, ArrowUpRight, ArrowDownRight
} from "lucide-react";

/* ───────────────── TYPES ───────────────── */

interface MonthlyMetric {
  month: string;
  monthLabel: string;
  trips: number;
  co2: number;
  occupancy: number;
  participationRate: number;
  totalTravels: number;
}

/* ───────────────── COMPONENT ───────────────── */

export function AnalyticsView({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { companyData } = useAuth();

  const [loading, setLoading] = useState(true);
  const [allMonthlyData, setAllMonthlyData] = useState<MonthlyMetric[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [compareMonth, setCompareMonth] = useState<string>("");
  const [heroTooltip, setHeroTooltip] = useState(false);
  
  // Totales acumulados
  const [totalCo2Accumulated, setTotalCo2Accumulated] = useState(0);
  const [totalTripsAccumulated, setTotalTripsAccumulated] = useState(0);
  const [totalKmAccumulated, setTotalKmAccumulated] = useState(0);

  /* ───────────────── FETCH METRICS ───────────────── */

  useEffect(() => {
    async function fetchAnalytics() {
      if (!companyData?.name) return;

      try {
        setLoading(true);

        // Buscar empresa por name
        const q = query(
          collection(db, "companies"),
          where("name", "==", companyData.name)
        );

        const snap = await getDocs(q);
        if (snap.empty) {
          setLoading(false);
          return;
        }

        const companyId = snap.docs[0].id;

        // Leer métricas mensuales
        const monthlyRef = collection(
          db,
          "companies",
          companyId,
          "metrics",
          "metrics",
          "monthly"
        );

        const monthlySnap = await getDocs(monthlyRef);

        const data: MonthlyMetric[] = [];
        let totalCo2 = 0;
        let totalTrips = 0;

        monthlySnap.forEach(doc => {
          const m = doc.data();
          const monthId = doc.id; // "2026-01"

          // Formatear mes
          const [year, month] = monthId.split('-');
          const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
          const monthLabel = `${monthNames[parseInt(month) - 1]} ${year}`;

          const co2 = m.co2SavedKg || 0;
          const trips = m.totalTrips || 0;
          const travels = m.totalTravels || 0;

          data.push({
            month: monthId,
            monthLabel,
            trips,
            co2,
            occupancy: m.seatOccupancyRate || 0,
            participationRate: m.participationRate || 0,
            totalTravels: travels
          });

          // Acumular totales
          totalCo2 += co2;
          totalTrips += trips;
        });

        // Ordenar por mes (más reciente primero para el selector)
        data.sort((a, b) => b.month.localeCompare(a.month));

        setAllMonthlyData(data);
        setTotalCo2Accumulated(totalCo2);
        setTotalTripsAccumulated(totalTrips);

        // Seleccionar el mes más reciente por defecto
        if (data.length > 0) {
          setSelectedMonth(data[0].monthLabel);
        }

      } catch (err) {
        console.error("Error loading analytics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [companyData?.name]);

  if (!companyData) return null;

  /* ───────────────── HELPERS ───────────────── */

  const displayValue = (value: number | string, suffix = "") => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return numValue === 0 ? "-" : `${value}${suffix}`;
  };

  // Obtener datos del mes seleccionado
  const currentMonthData = allMonthlyData.find(d => d.monthLabel === selectedMonth);
  
  // Obtener datos del mes a comparar
  const compareMonthData = compareMonth 
    ? allMonthlyData.find(d => d.monthLabel === compareMonth)
    : null;

  // Calcular tendencias (comparación con mes anterior)
  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return { value: 0, isPositive: true };
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change).toFixed(1), isPositive: change >= 0 };
  };

  // Calcular tendencia de actividad (trayectos publicados del mes)
  const activityTrendData = allMonthlyData
    .slice()
    .reverse()
    .map(m => ({
      monthLabel: m.monthLabel,
      actividad: m.totalTravels
    }));

  // Datos para gráficos (ordenados cronológicamente)
  const chartData = allMonthlyData.slice().reverse();

  /* ───────────────── RENDER ───────────────── */

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">

      {/* ───────── Month Selector (Horizontal Style) ───────── */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-[#9dd187]/10 to-[#E8F5E0] p-4 rounded-2xl border border-[#9dd187]/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#9dd187]/20 rounded-xl">
              <Calendar className="w-5 h-5 text-[#5A9642]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#2a2c38]">
                Datos actualizados mensualmente
              </p>
              <p className="text-xs text-gray-600">
                Selecciona un mes para ver métricas · Compara con otro mes opcional
              </p>
            </div>
          </div>
        </div>

        {/* Month Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {allMonthlyData.map(m => (
            <button 
              key={m.month} 
              onClick={() => setSelectedMonth(m.monthLabel)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                selectedMonth === m.monthLabel 
                  ? "bg-[#9dd187] text-[#2a2c38] border-[#9dd187] shadow-md" 
                  : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
              }`}
            >
              {m.monthLabel}
            </button>
          ))}
        </div>

        {/* Compare Selector */}
        {selectedMonth && (
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Comparar con otro mes (opcional)
                </label>
                <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <button
                    onClick={() => setCompareMonth("")}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                      compareMonth === ""
                        ? "bg-gray-100 text-[#2a2c38] border-gray-200"
                        : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    Sin comparar
                  </button>
                  {allMonthlyData
                    .filter(m => m.monthLabel !== selectedMonth)
                    .map(m => (
                      <button
                        key={m.month}
                        onClick={() => setCompareMonth(m.monthLabel)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                          compareMonth === m.monthLabel
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-400 border-gray-100 hover:border-blue-200"
                        }`}
                      >
                        {m.monthLabel}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ───────── Impact Header ───────── */}
      <div className="bg-[#2a2c38] p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Leaf size={120} className="text-[#9dd187]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-[#9dd187] mb-4">
            <div className="h-px w-8 bg-[#9dd187]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              {currentMonthData?.monthLabel || "Análisis"} · Impacto Acumulado
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CO2 Mensual */}
            <div>
              <p className="text-gray-400 text-sm mb-2">CO₂e evitado este mes</p>
              <p className="text-4xl font-black text-white">
                {displayValue(currentMonthData?.co2.toFixed(0) || 0, " kg")}
              </p>
            </div>

            {/* CO2 Total */}
            <div>
              <p className="text-gray-400 text-sm mb-2">CO₂e acumulado total</p>
              <p className="text-4xl font-black text-[#9dd187]">
                {displayValue(totalCo2Accumulated.toFixed(0), " kg")}
              </p>
            </div>

            {/* Meta */}
            <div>
              <p className="text-gray-400 text-sm mb-2">Progreso hacia meta</p>
              <p className="text-4xl font-black text-white">
                {companyData.co2Target && companyData.co2Target > 0
                  ? `${((totalCo2Accumulated / companyData.co2Target) * 100).toFixed(0)}%`
                  : <span className="text-sm text-gray-500">Sin meta</span>
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── Comparison Panel (if comparing) ───────── */}
      {compareMonthData && currentMonthData && (
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 md:p-8 rounded-3xl border-2 border-blue-200/50 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg md:text-xl font-bold text-[#2a2c38]">
                  Comparación de Meses
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">{currentMonthData.monthLabel}</span>
                {" vs "}
                <span className="font-semibold text-purple-600">{compareMonthData.monthLabel}</span>
              </p>
            </div>
            <button
              onClick={() => setCompareMonth("")}
              className="px-4 py-2 bg-white/80 hover:bg-white text-gray-600 rounded-xl text-sm font-semibold transition-all border border-gray-200"
            >
              Cerrar
            </button>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* CO2 */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="w-4 h-4 text-green-600" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  CO₂e Evitado
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-[#2a2c38]">
                    {currentMonthData.co2.toFixed(0)}
                  </p>
                  <span className="text-sm text-gray-400">kg</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    vs {compareMonthData.co2.toFixed(0)} kg
                  </span>
                  {(() => {
                    const trend = calculateTrend(currentMonthData.co2, compareMonthData.co2);
                    return (
                      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                        trend.isPositive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {trend.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {trend.value}%
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Trayectos */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Route className="w-4 h-4 text-orange-600" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Trayectos
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-[#2a2c38]">
                    {currentMonthData.totalTravels}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    vs {compareMonthData.totalTravels}
                  </span>
                  {(() => {
                    const trend = calculateTrend(currentMonthData.totalTravels, compareMonthData.totalTravels);
                    return (
                      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                        trend.isPositive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {trend.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {trend.value}%
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Ocupación */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Car className="w-4 h-4 text-blue-600" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Ocupación
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-[#2a2c38]">
                    {currentMonthData.occupancy.toFixed(1)}
                  </p>
                  <span className="text-sm text-gray-400">%</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    vs {compareMonthData.occupancy.toFixed(1)}%
                  </span>
                  {(() => {
                    const trend = calculateTrend(currentMonthData.occupancy, compareMonthData.occupancy);
                    return (
                      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                        trend.isPositive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {trend.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {trend.value}%
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Participación */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-green-600" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Participación
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-[#2a2c38]">
                    {currentMonthData.participationRate.toFixed(1)}
                  </p>
                  <span className="text-sm text-gray-400">%</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    vs {compareMonthData.participationRate.toFixed(1)}%
                  </span>
                  {(() => {
                    const trend = calculateTrend(currentMonthData.participationRate, compareMonthData.participationRate);
                    return (
                      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                        trend.isPositive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {trend.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {trend.value}%
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────── Current Month Metrics ───────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Participación */}
        <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 rounded-2xl text-[#9dd187]">
              <Users size={24} />
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Participación
          </p>
          <h3 className="text-4xl font-black text-[#2a2c38]">
            {displayValue(currentMonthData?.participationRate.toFixed(1) || 0, "%")}
          </h3>
          <p className="text-xs text-gray-400 mt-2 truncate">
            {currentMonthData?.monthLabel || "-"}
          </p>
        </Card>

        {/* Ocupación */}
        <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
              <Car size={24} />
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Ocupación
          </p>
          <h3 className="text-4xl font-black text-[#2a2c38]">
            {displayValue(currentMonthData?.occupancy.toFixed(1) || 0, "%")}
          </h3>
          <p className="text-xs text-gray-400 mt-2">
            Plazas ocupadas
          </p>
        </Card>

        {/* Trayectos Publicados */}
        <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 rounded-2xl text-orange-500">
              <Route size={24} />
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Trayectos
          </p>
          <h3 className="text-4xl font-black text-[#2a2c38]">
            {displayValue(currentMonthData?.totalTravels || 0)}
          </h3>
          <p className="text-xs text-gray-400 mt-2">
            Publicados
          </p>
        </Card>

        {/* CO2 Mensual */}
        <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-gradient-to-br from-[#E8F5E0] to-[#F0F8EC] border-[#9dd187]/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/80 rounded-2xl text-[#5A9642]">
              <Leaf size={24} />
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">
            CO₂e Evitado
          </p>
          <h3 className="text-4xl font-black text-[#2a2c38]">
            {displayValue(currentMonthData?.co2.toFixed(0) || 0)}
          </h3>
          <p className="text-xs text-gray-600 mt-2 font-medium">
            kilogramos
          </p>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════════
      CO₂ HERO — ancho completo, impactante
      ═══════════════════════════════════════════════════════════ */}
      <div className="bg-[#1a1c26] rounded-[3rem] overflow-hidden shadow-2xl">
        {/* Stats arriba del gráfico */}
        <div className="px-8 pt-8 pb-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-[#9dd187]/10 rounded-2xl">
                  <Leaf className="w-6 h-6 text-[#9dd187]" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#9dd187] uppercase tracking-[0.3em]">
                    Impacto Climático
                  </p>
                  <h3 className="text-2xl font-black text-white mt-0.5">
                    CO₂e Evitado
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Este mes</p>
                <p className="text-2xl font-black text-white">
                  {displayValue(currentMonthData?.co2.toFixed(0) || 0)}
                  <span className="text-sm font-medium text-gray-500 ml-1">kg</span>
                </p>
              </div>
              <div className="w-px bg-gray-700" />
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Acumulado</p>
                <p className="text-2xl font-black text-[#9dd187]">
                  {displayValue(totalCo2Accumulated.toFixed(0))}
                  <span className="text-sm font-medium text-gray-500 ml-1">kg</span>
                </p>
              </div>
              <div className="w-px bg-gray-700" />
              <div className="text-right relative">
                <div className="flex items-center justify-end gap-1.5 mb-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Equivale a</p>
                  {/* Info tooltip trigger */}
                  <div
                    className="relative"
                    onMouseEnter={() => setHeroTooltip(true)}
                    onMouseLeave={() => setHeroTooltip(false)}
                  >
                    <Info className="w-3 h-3 text-gray-600 cursor-help hover:text-[#9dd187] transition-colors" />
                    {heroTooltip && (
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-[#111315] border border-gray-700 text-white text-xs rounded-xl shadow-2xl z-50 animate-in fade-in duration-150">
                        <div className="flex items-start gap-2">
                          <Car className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-white mb-1">¿Cómo se calcula?</p>
                            <p className="text-gray-400 leading-relaxed">
                              Un coche medio emite ≈ <span className="text-[#9dd187] font-bold">2.300 kg CO₂/año</span>, es decir <span className="text-[#9dd187] font-bold">192 kg/mes</span>.<br/>
                              <span className="text-white font-semibold">{totalCo2Accumulated.toFixed(0)} kg</span> ÷ 192 = <span className="text-[#9dd187] font-bold">{Math.floor(totalCo2Accumulated / 192)} coches</span> fuera de carretera durante un mes.
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-full right-4 -mt-px">
                          <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #111315' }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-2xl font-black text-white">
                  {displayValue(Math.floor(totalCo2Accumulated / 192))}
                  <span className="text-sm font-medium text-gray-500 ml-1">coches/mes</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Gráfico Area grande */}
        <div className="px-4 pb-6 pt-4">
          {loading ? (
            <div className="h-[280px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
            </div>
          ) : chartData.length > 0 ? (
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCo2Hero" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9dd187" stopOpacity={0.4} />
                      <stop offset="60%" stopColor="#9dd187" stopOpacity={0.08} />
                      <stop offset="100%" stopColor="#9dd187" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2c38" />
                  <XAxis dataKey="monthLabel" axisLine={false} tickLine={false} tick={{ fill: '#4a4c58', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4a4c58', fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: '1px solid #2a2c38', backgroundColor: '#1e2029', color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                    formatter={(value: number) => [`${value} kg`, 'CO₂e evitado']}
                  />
                  <Area type="monotone" dataKey="co2" stroke="#9dd187" strokeWidth={3} fill="url(#colorCo2Hero)" dot={{ r: 5, fill: '#9dd187', strokeWidth: 0 }} activeDot={{ r: 7, fill: '#9dd187', stroke: '#1a1c26', strokeWidth: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-gray-600">
              <p>No hay datos disponibles</p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Company Goals — línea única, ancho completo ─── */}
      <CompanyGoals co2Target={companyData.co2Target || undefined} totalCo2={totalCo2Accumulated} onViewSettings={() => setActiveTab("settings")} />

      {/* ═══════════════════════════════════════════════════════════
      CHARTS GRID — 2x2
      ═══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Tendencia de Trayectos */}
        <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">
                Tendencia de Trayectos
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Publicados mensualmente
              </p>
            </div>
            <div className="p-2 bg-purple-50 rounded-xl">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          {loading ? (
            <div className="h-[240px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
            </div>
          ) : activityTrendData.length > 0 ? (
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="monthLabel" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                  <Line type="monotone" dataKey="actividad" stroke="#9333ea" strokeWidth={3} dot={{ r: 5, fill: '#9333ea' }} name="Trayectos" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[240px] flex items-center justify-center text-gray-400 text-sm">No hay datos disponibles</div>
          )}
        </Card>

        {/* Trayectos por Mes */}
        <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">
                Trayectos por Mes
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Volumen mensual
              </p>
            </div>
            <div className="p-2 bg-[#E8F5E0] rounded-xl">
              <Route className="w-5 h-5 text-[#5A9642]" />
            </div>
          </div>
          {loading ? (
            <div className="h-[240px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
            </div>
          ) : chartData.length > 0 ? (
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="monthLabel" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                  <Bar dataKey="totalTravels" fill="#9dd187" radius={[8, 8, 0, 0]} name="Trayectos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[240px] flex items-center justify-center text-gray-400 text-sm">No hay datos disponibles</div>
          )}
        </Card>


        {/* Tasa de Ocupación */}
        <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">
                Tasa de Ocupación
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Plazas ocupadas por mes
              </p>
            </div>
            <div className="p-2 bg-blue-50 rounded-xl">
              <Car className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          {loading ? (
            <div className="h-[240px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
            </div>
          ) : chartData.length > 0 ? (
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="monthLabel" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} unit="%" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                  <Line type="monotone" dataKey="occupancy" stroke="#2a2c38" strokeWidth={3} dot={{ r: 6, fill: '#9dd187', strokeWidth: 0 }} name="Ocupación %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[240px] flex items-center justify-center text-gray-400 text-sm">No hay datos disponibles</div>
          )}
        </Card>

      </div>

      {/* ───────── Info Footer ───────── */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gray-100 rounded-xl">
            <Info className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#2a2c38] mb-1">
              Acerca de estos datos
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Todas las métricas mostradas provienen de cálculos mensuales automáticos.
              Los valores &quot;-&quot; indican ausencia de datos. Puedes seleccionar meses anteriores
              y compararlos para ver la evolución de tu programa de carpooling.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}