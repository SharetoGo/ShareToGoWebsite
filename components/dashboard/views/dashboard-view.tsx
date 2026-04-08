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
    users, 
    travels,
    monthlyMetrics, 
    loading, 
    error, 
    refresh, 
    availableMonths, 
    selectedMonth, 
    changeMonth 
  } = useDashboard();

  const formatMonthLabel = (monthStr: string) => {
    if (!monthStr) return "";
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  };

  if (loading && !monthlyMetrics) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#9dd187]" />
        <p className="text-gray-400 font-medium animate-pulse text-sm">Actualizando métricas mensuales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl max-w-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-black text-[#2a2c38] mb-2">Error de Conexión</h3>
          <p className="text-gray-400 text-xs mb-6 leading-relaxed">No se pudo cargar la información para el mes de {formatMonthLabel(selectedMonth)}.</p>
          <Button onClick={() => refresh()} className="bg-[#9dd187] text-[#2a2c38] font-bold rounded-xl w-full">
            <RefreshCcw className="w-4 h-4 mr-2" /> Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (!companyData) return null;

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      
      {/* 1. HEADER & MONTH SELECTOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-100">
        <div>
          <h1 className="text-4xl font-black text-[#2a2c38] tracking-tight">Panel Principal</h1>
          <p className="text-gray-500 font-medium tracking-tight">Impacto ambiental y participación de empleados</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedMonth} onValueChange={changeMonth}>
            <SelectTrigger className="w-50 bg-white border-gray-200 rounded-xl shadow-sm focus:ring-[#9dd187]">
              <Calendar className="w-4 h-4 mr-2 text-[#9dd187]" />
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              {availableMonths.map((m) => (
                <SelectItem key={m} value={m}>{formatMonthLabel(m)}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={refresh}
            disabled={loading} // Disable while loading
            className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sincronizar
          </Button>
        </div>
      </div>

      {/* 2. LIFETIME IMPACT SUMMARY (Dark Card) */}
      <div className="bg-[#2a2c38] p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl z-0">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Leaf size={140} className="text-[#9dd187]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-[#9dd187] mb-8">
            <div className="h-px w-8 bg-[#9dd187]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Histórico Acumulado</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-2">Km Compartidos</p>
              <p className="text-5xl font-black text-white">
                {formatStats(companyData.totalKm || 0)} <span className="text-base font-medium text-gray-500">km</span>
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-2">Comunidad Total</p>
              <p className="text-5xl font-black text-[#9dd187]">
                {companyData.membersIds?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-2">Trayectos Totales</p>
              <p className="text-5xl font-black text-white">
                {companyData.travels?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC MONTHLY STATS */}
      <QuickStatsCompact
        totalCo2={monthlyMetrics?.co2SavedKg || 0}
        seatOccupancyRate={monthlyMetrics?.seatOccupancyRate || 0}
        participationRate={monthlyMetrics?.participationRate || 0}
        totalTravelsMonthly={monthlyMetrics?.totalTravels || 0}
      />

      {/* 4. ACTIVITY & RANKINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UserRoleStats
            companyName={companyData.name}
            totalMembers={companyData.membersIds?.length || 0}
            travels={travels}
            users={users}
          />
        </div>
        <div className="lg:col-span-1">
          <TopCarpoolers users={users} />
        </div>
      </div>

      {/* 5. ENGAGEMENT TOOLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LinkedInHub data={companyData} onViewContent={() => setActiveTab("content")} />
        <AnalyticsHub totalCo2={monthlyMetrics?.co2SavedKg || 0} onViewAnalytics={() => setActiveTab("analytics")} />
      </div>

      {/* 6. CONTEXTUAL INFORMATION */}
      <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex items-start gap-6">
        <div className="w-14 h-14 bg-[#f8fafc] rounded-2xl flex items-center justify-center shrink-0">
          <Info className="w-6 h-6 text-[#9dd187]" />
        </div>
        <div>
          <p className="text-sm font-black text-[#2a2c38] mb-1">Información del Mes Seleccionado</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Las métricas de CO₂ ahorrado y tasas de participación reflejan exclusivamente la actividad del mes de <strong>{formatMonthLabel(selectedMonth)}</strong>. 
            El ranking de carpoolers y los totales de la tarjeta superior muestran los datos globales acumulados desde el inicio de operaciones.
          </p>
        </div>
      </div>
    </div>
  );
}