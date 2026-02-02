// components/dashboard/views/dashboard-view.tsx
import { useState, useEffect } from "react";
import { useAuth} from "@/app/intranet-empresas/auth/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
import { formatStats } from "@/lib/utils/format";
import { Route, Users, TrendingUp, Leaf, UserCheck, Car, Target } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { LinkedInHub } from "../charts/linkedin-hub";
import { TopCarpoolers } from "../charts/top-carpooler";
import { UserRoleStats } from "../charts/user-role-stats";
import { QuickStatsCompact } from "../widgets/quick-stats-compact";
import { AnalyticsHub } from "../widgets/analytics-hub";


function getCurrentMonthId() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthIds() {
  const now = new Date();

  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonth = `${prevDate.getFullYear()}-${String(
    prevDate.getMonth() + 1
  ).padStart(2, "0")}`;

  return { currentMonth, previousMonth };
}


export function DashboardView({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { companyData } = useAuth();

  const [loadingMonthly, setLoadingMonthly] = useState(true);
  const [monthlyMetrics, setMonthlyMetrics] = useState<any>(null);

  useEffect(() => {
    async function fetchMonthlyMetrics() {
      if (!companyData?.name) return;

      try {
        setLoadingMonthly(true);

        // 1️⃣ Buscar empresa por name
        const q = query(
          collection(db, "companies"),
          where("name", "==", companyData.name)
        );

        const snap = await getDocs(q);
        if (snap.empty) return;

        const companyId = snap.docs[0].id;

        const { currentMonth, previousMonth } = getMonthIds();

        // 2️⃣ Intentar mes actual
        const currentRef = doc(
          db,
          "companies",
          companyId,
          "metrics",
          "metrics",
          "monthly",
          currentMonth
        );

        const currentSnap = await getDoc(currentRef);

        if (currentSnap.exists()) {
          setMonthlyMetrics(currentSnap.data());
          return;
        }

        // 3️⃣ Fallback → mes anterior
        const prevRef = doc(
          db,
          "companies",
          companyId,
          "metrics",
          "metrics",
          "monthly",
          previousMonth
        );

        const prevSnap = await getDoc(prevRef);

        if (prevSnap.exists()) {
          setMonthlyMetrics(prevSnap.data());
        } else {
          setMonthlyMetrics(null);
        }

      } catch (e) {
        console.error("Error loading monthly metrics:", e);
      } finally {
        setLoadingMonthly(false);
      }
    }

    fetchMonthlyMetrics();
  }, [companyData?.name]);

  
  if (!companyData) return null;

  // ═══════════════════════════════════════════════════════════
  // MÉTRICAS CALCULADAS
  // ═══════════════════════════════════════════════════════════
  
  const totalUsers = companyData.membersIds?.length || 0;
  const totalKm = companyData.totalKm || 0;
  const co2Target = companyData.CO2Goal;
  const totalDrivers = companyData.totalDrivers || 0;
  const totalPassengers = companyData.totalPassengers || 0;
  const totalTravels = companyData.travels?.length || 0;

  const totalCo2 = monthlyMetrics?.co2SavedKg || 0;
  const seatOccupancyRate = monthlyMetrics?.seatOccupancyRate || 0;
  const participationRate = monthlyMetrics?.participationRate || 0;
  const totalTravelsMontly = monthlyMetrics?.totalTravels || 0;
  
  
  // Dinero ahorrado (0.25€ por km)
  const moneySaved = Math.round(totalKm * 0.25);
  
  // Progreso hacia meta de CO2 (solo si existe)
  const co2Progress = co2Target && co2Target > 0 
    ? Math.min((totalCo2 / co2Target) * 100, 100) 
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* ═══════════════════════════════════════════════════════════
          HEADER & FILTERS
          ═══════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════
          HERO METRICS - 3 Cards Principales
          ═══════════════════════════════════════════════════════════ */}
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
      
      <QuickStatsCompact
        totalCo2={totalCo2}
        seatOccupancyRate={seatOccupancyRate}
        participationRate={participationRate}
        totalTravelsMonthly={totalTravelsMontly}
      />

      {/* 🆕 USER ROLE STATS - Conductores vs Pasajeros */}
      <div className="grid grid-cols-1">
        <UserRoleStats
          companyName={companyData.name}
          totalMembers={companyData.membersIds?.length || 0}
          travelIds={companyData.travels || []}
        />
      </div>

      {/* Actionable Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.6fr] gap-6">
        <LinkedInHub 
          data={companyData} 
          onViewContent={() => setActiveTab("content")} 
        />
          <AnalyticsHub
            totalCo2={totalCo2} 
            onViewAnalytics={() => setActiveTab("analytics")} 
          />  
        <TopCarpoolers />
      </div>
    </div>
  );
}