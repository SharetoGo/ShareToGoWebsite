// components/dashboard/views/dashboard-view.tsx
import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { useDashboard } from "@/app/intranet-empresas/dashboard/DashboardContext";
import { formatStats } from "@/lib/utils/format";
import { Route, Users, Leaf, Loader2 } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { LinkedInHub } from "../charts/linkedin-hub";
import { TopCarpoolers } from "../charts/top-carpooler";
import { UserRoleStats } from "../charts/user-role-stats";
import { QuickStatsCompact } from "../widgets/quick-stats-compact";
import { AnalyticsHub } from "../widgets/analytics-hub";

export function DashboardView({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { companyData } = useAuth();
  const { users, travels, monthlyMetrics, loading, error } = useDashboard();

  /* ═══════════════════════════════════════════════════════════
     LOADING STATE
     ═══════════════════════════════════════════════════════════ */

  if (!companyData) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#9dd187] mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="p-4 bg-red-50 rounded-2xl mb-4 inline-block">
            <p className="text-red-600 font-semibold">Error: {error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#9dd187] text-white rounded-xl font-semibold hover:bg-[#8bc175]"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════
     COMPUTED METRICS
     ═══════════════════════════════════════════════════════════ */

  const totalUsers = companyData.membersIds?.length || 0;
  const totalKm = companyData.totalKm || 0;
  const totalTravels = companyData.travels?.length || 0;

  const totalCo2 = monthlyMetrics?.co2SavedKg || 0;
  const seatOccupancyRate = monthlyMetrics?.seatOccupancyRate || 0;
  const participationRate = monthlyMetrics?.participationRate || 0;
  const totalTravelsMonthly = monthlyMetrics?.totalTravels || 0;

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2a2c38]">
            Impacto Medioambiental
          </h1>
          <p className="text-gray-500">
            Métricas de movilidad sostenible y rendimiento ESG
          </p>
        </div>
      </div>

      {/* HERO METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Usuarios Registrados"
          value={totalUsers}
          icon={Users}
          description={`${totalUsers} usuarios en la plataforma`}
          trend="up"
          trendValue="+12%"
          color="#9dd187"
          bgColor="#E8F5E0"
        />
        
        <StatCard
          label="Km Recorridos Compartidos"
          value={`${formatStats(totalKm)}`}
          icon={Route}
          description={`${totalKm} km recorridos juntos`}
          trend="up"
          trendValue="+8%"
          color="#9dd187"
          bgColor="#E8F5E0"
        />

        <StatCard
          label="Trayectos Compartidos"
          value={`${formatStats(totalTravels)}`}
          icon={Leaf}
          description={`${totalTravels} trayectos totales`}
          trend="up"
          trendValue="+15%"
          color="#5A9642"
          bgColor="#D4E8CC"
        />
      </div>
      
      {/* QUICK STATS */}
      <QuickStatsCompact
        totalCo2={totalCo2}
        seatOccupancyRate={seatOccupancyRate}
        participationRate={participationRate}
        totalTravelsMonthly={totalTravelsMonthly}
      />

      {/* USER ROLE STATS */}
      <div className="grid grid-cols-1">
        <UserRoleStats
          companyName={companyData.name}
          totalMembers={totalUsers}
          travels={travels}
          users={users}
        />
      </div>

      {/* ACTIONABLE BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.6fr] gap-6">
        <LinkedInHub 
          data={companyData} 
          onViewContent={() => setActiveTab("content")} 
        />
        <AnalyticsHub
          totalCo2={totalCo2} 
          onViewAnalytics={() => setActiveTab("analytics")} 
        />  
        <TopCarpoolers users={users} />
      </div>
    </div>
  );
}