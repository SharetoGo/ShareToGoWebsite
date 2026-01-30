// components/dashboard/views/dashboard-view.tsx
import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { formatStats } from "@/lib/utils/format";
import { Leaf, Route, Users, Euro, Share2, ShieldCheck, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard"; // Assuming StatCard is your MetricCard

// Internal Sub-components (We'll define these below)
import { EnvironmentalImpactChart } from "../charts/environmental-impact-chart";
import { PeakUsageHeatmap } from "../charts/peak-usage-heatmap";
import { LinkedInHub } from "../charts/linkedin-hub";
import { ComplianceTracker } from "../charts/compliance-tracker";
import { TopCarpoolers } from "../charts/top-carpooler";

export function DashboardView() {
  const { companyData } = useAuth();

  if (!companyData) return null;

  // Real-time logical calculations
  // Average fuel price saved per km shared: ~0.25€
  const moneySaved = companyData.totalKm * 0.25;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Filter Bar Placeholder */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2a2c38]">Impacto Medioambiental</h1>
          <p className="text-gray-500">Métricas de movilidad sostenible y rendimiento ESG</p>
        </div>
        {/* Mock Filter Bar */}
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
          <select className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer px-3 py-2 font-medium">
            <option>Todas las Sedes</option>
            {companyData.zones?.map(z => <option key={z.key}>{z.key}</option>)}
          </select>
          <div className="w-px h-8 bg-gray-100 self-center" />
          <select className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer px-3 py-2 font-medium">
            <option>Últimos 30 días</option>
            <option>Este trimestre</option>
          </select>
        </div>
      </div>

      {/* Hero Metrics - Real Data + Trend Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <StatCard
          label="Usuarios Activos"
          value={companyData.membersIds?.length || 0}
          icon={Users}
        />
        <StatCard
          label="Km Compartidos"
          value={`${formatStats(companyData.totalKm)} km`}
          icon={Route}
        />
      </div>

      {/* Main Charts Section*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnvironmentalImpactChart />
        <PeakUsageHeatmap />
      </div>


      {/* Actionable Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LinkedInHub data={companyData} />
        <ComplianceTracker />
        <TopCarpoolers />
      </div>
    </div>
  );
}