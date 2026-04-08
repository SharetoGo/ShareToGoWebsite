"use client";

import { useAuth } from "@/app/intranet-empresas/providers/AuthContext";
import { useDashboard } from "@/app/intranet-empresas/providers/DashboardContext";
import { formatStats } from "@/lib/utils/format";
import { Loader2, AlertCircle, RefreshCcw, Calendar, Leaf, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LinkedInHub } from "../charts/linkedin-hub";
import { TopCarpoolers } from "../charts/top-carpooler";
import { UserRoleStats } from "../charts/user-role-stats";
import { AnalyticsHub } from "../widgets/analytics-hub";
import { QuickStatsCompact } from "../widgets/quick-stats-compact";

export function DashboardView({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { companyData } = useAuth();
  const { 
    users, travels, monthlyMetrics, loading, error, refresh, 
    availableMonths, selectedMonth, changeMonth 
  } = useDashboard();

  const formatMonthLabel = (monthStr: string) => {
    if (monthStr === "all") return "Histórico Global";
    if (!monthStr) return "";
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  };

  if (loading && !monthlyMetrics) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#9dd187]" />
        <p className="text-gray-400 font-medium animate-pulse text-sm">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      
      {/* 1. HEADER & PERIOD SELECTOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-50">
        <div>
          <h1 className="text-4xl font-black text-[#2a2c38] tracking-tight">Panel Principal</h1>
          <p className="text-gray-500 font-medium tracking-tight">Periodo: {formatMonthLabel(selectedMonth)}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedMonth} onValueChange={changeMonth}>
            <SelectTrigger className="w-60 bg-white border-gray-200 rounded-xl shadow-sm">
              <Calendar className="w-4 h-4 mr-2 text-[#9dd187]" />
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              {availableMonths.map((m) => (
                <SelectItem key={m} value={m}>{formatMonthLabel(m)}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" size="sm" onClick={refresh} disabled={loading}
            className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sincronizar
          </Button>
        </div>
      </div>

      {/* 2. LIFETIME IMPACT SUMMARY */}
      <div className="bg-[#2a2c38] p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Leaf size={140} className="text-[#9dd187]" /></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-[#9dd187] mb-8">
            <div className="h-px w-8 bg-[#9dd187]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                {selectedMonth === "all" ? "Acumulado Histórico" : "Métricas del Mes"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-2">Trayectos Totales</p>
              <p className="text-5xl font-black text-white">
                  {selectedMonth === "all" ? (monthlyMetrics?.totalTravels || 0) : (monthlyMetrics?.totalTravels || 0)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-2">Comunidad Total</p>
              <p className="text-5xl font-black text-[#9dd187]">{companyData?.membersIds?.length || 0}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-2">CO2 Ahorrado</p>
              <p className="text-5xl font-black text-white">
                  {formatStats(monthlyMetrics?.co2SavedKg || 0)} <span className="text-base font-medium text-gray-500">kg</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. QUICK STATS */}
      <QuickStatsCompact
        totalCo2={monthlyMetrics?.co2SavedKg || 0}
        seatOccupancyRate={monthlyMetrics?.seatOccupancyRate || 0}
        participationRate={monthlyMetrics?.participationRate || 0}
        totalTravelsMonthly={monthlyMetrics?.totalTravels || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UserRoleStats
            companyName={companyData?.name || ""}
            totalMembers={companyData?.membersIds?.length || 0}
            travels={travels}
            users={users}
            isGlobal={selectedMonth === "all"}
          />
        </div>
        <div className="lg:col-span-1">
          <TopCarpoolers users={users} travels={travels} isGlobal={selectedMonth === "all"} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LinkedInHub data={companyData} onViewContent={() => setActiveTab("content")} />
        <AnalyticsHub totalCo2={monthlyMetrics?.co2SavedKg || 0} onViewAnalytics={() => setActiveTab("analytics")} />
      </div>
    </div>
  );
}