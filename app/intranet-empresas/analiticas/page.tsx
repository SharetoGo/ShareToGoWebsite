"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/intranet-empresas/providers/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { CompanyGoals } from "@/components/dashboard/widgets/company-goals";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Leaf,
  Car,
  Loader2,
  TrendingUp,
  Calendar,
  Route,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck,
  Percent,
  Zap,
  Bike,
  Footprints,
  Train,
  Bolt,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

/** Visual config for each travelMode value. */
const TRAVEL_MODE_CONFIG = {
  car: { label: "Coche", color: "#9dd187", bg: "bg-[#E8F5E0]", text: "text-[#5A9642]" },
  walking: { label: "A pie", color: "#f97316", bg: "bg-orange-50", text: "text-orange-500" },
  bicycle: { label: "Bicicleta", color: "#3b82f6", bg: "bg-blue-50", text: "text-blue-500" },
  e_scooter: { label: "Patinete eléctrico", color: "#a855f7", bg: "bg-purple-50", text: "text-purple-500" },
  public_transport: { label: "Transporte público", color: "#14b8a6", bg: "bg-teal-50", text: "text-teal-500" },
} as const;

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

type TravelMode = "car" | "walking" | "bicycle" | "e_scooter" | "public_transport";

interface MonthlyMetric {
  /** "YYYY-MM" — used for sorting and Firestore queries */
  month: string;
  /** Human-readable label, e.g. "Febrero 2026" */
  monthLabel: string;
  totalTravels: number;
  totalTrips: number;
  savedCo2: number | null;
  occupancy: number;
  participationRate: number;
  activeDrivers: number;
  totalUsers: number;
  availableSeats: number;
  reservedSeats: number;
  newDrivers: number;
  /** Count of travels per travelMode for this month. */
  travelModeBreakdown: Record<TravelMode, number>;
}

interface AnalyticsCacheEntry {
  data: MonthlyMetric[];
  selectedMonth: string;
}

const analyticsCache = new Map<string, AnalyticsCacheEntry>();

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */

function toMonthLabel(yearMonth: string): string {
  const [year, month] = yearMonth.split("-");
  return `${MONTH_NAMES[parseInt(month, 10) - 1]} ${year}`;
}

function getSummarySavedCo2(data: any): number | null {
  if (typeof data.co2SavedKg === "number") return data.co2SavedKg;
  if (typeof data.savedco2 === "number") return data.savedco2;
  if (typeof data.savedCo2 === "number") return data.savedCo2;
  if (typeof data.savedCO2 === "number") return data.savedCO2;
  return null;
}

function summaryToMonthlyMetric(yearMonth: string, data: any): MonthlyMetric {
  return {
    month: yearMonth,
    monthLabel: toMonthLabel(yearMonth),
    totalTravels: data.totalTravels ?? 0,
    totalTrips: data.totalTrips ?? 0,
    savedCo2: getSummarySavedCo2(data),
    occupancy: data.seatOccupancyRate ?? 0,
    participationRate: data.participationRate ?? 0,
    activeDrivers: data.activeDrivers ?? 0,
    totalUsers: data.totalUsers ?? 0,
    availableSeats: data.availableSeats ?? 0,
    reservedSeats: data.reservedSeats ?? 0,
    newDrivers: data.newDrivers ?? 0,
    travelModeBreakdown: data.travelModeBreakdown ?? {
      car: 0, walking: 0, bicycle: 0, e_scooter: 0, public_transport: 0,
    },
  };
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function AnalyticsPage() {
  const router = useRouter();
  const { companyData } = useAuth();

  const cachedAnalytics = companyData?.id ? analyticsCache.get(companyData.id) : undefined;
  const [loading, setLoading] = useState(!cachedAnalytics);
  const [allMonthlyData, setAllMonthlyData] = useState<MonthlyMetric[]>(cachedAnalytics?.data ?? []);
  const [selectedMonth, setSelectedMonth] = useState<string>(cachedAnalytics?.selectedMonth ?? ""); // "YYYY-MM"
  const [compareMonth, setCompareMonth] = useState<string>("");  // "YYYY-MM"
  const [heroTooltip, setHeroTooltip] = useState(false);

  useEffect(() => {
    if (!companyData?.id) {
      setLoading(false);
      return;
    }

    const companyId = companyData.id;
    const cached = analyticsCache.get(companyId);
    if (cached) {
      setAllMonthlyData(cached.data);
      setSelectedMonth(cached.selectedMonth);
      setLoading(false);
    } else {
      setLoading(true);
    }

    const summaryUnsubs = new Map<string, Unsubscribe>();
    const summariesByMonth = new Map<string, MonthlyMetric>();
    cached?.data.forEach(metric => summariesByMonth.set(metric.month, metric));

    const publishData = () => {
      const sorted = [...summariesByMonth.values()].sort((a, b) => b.month.localeCompare(a.month));

      setAllMonthlyData(sorted);
      setSelectedMonth(current => {
        const nextSelected = current && sorted.some(m => m.month === current)
          ? current
          : sorted[0]?.month ?? "";

        analyticsCache.set(companyId, {
          data: sorted,
          selectedMonth: nextSelected,
        });

        return nextSelected;
      });
      setLoading(false);
    };

    const monthsUnsub = onSnapshot(
      collection(db, "companies", companyId, "month"),
      monthsSnap => {
        const monthIds = monthsSnap.docs
          .map(d => d.id)
          .filter(id => /^\d{4}-\d{2}$/.test(id));
        const monthIdSet = new Set(monthIds);

        for (const [monthId, unsub] of summaryUnsubs) {
          if (!monthIdSet.has(monthId)) {
            unsub();
            summaryUnsubs.delete(monthId);
            summariesByMonth.delete(monthId);
          }
        }

        for (const monthId of monthIds) {
          if (summaryUnsubs.has(monthId)) continue;

          const summaryRef = doc(db, "companies", companyId, "month", monthId, "metrics", "summary");
          const summaryUnsub = onSnapshot(summaryRef, summarySnap => {
            if (summarySnap.exists()) {
              summariesByMonth.set(monthId, summaryToMonthlyMetric(monthId, summarySnap.data()));
            } else {
              summariesByMonth.delete(monthId);
            }
            publishData();
          }, err => {
            console.error(`Error listening analytics summary ${monthId}:`, err);
            setLoading(false);
          });

          summaryUnsubs.set(monthId, summaryUnsub);
        }

        if (monthIds.length === 0) publishData();
      },
      err => {
        console.error("Error listening analytics months:", err);
        setLoading(false);
      },
    );

    return () => {
      monthsUnsub();
      summaryUnsubs.forEach(unsub => unsub());
      summaryUnsubs.clear();
    };
  }, [companyData?.id]);

  if (!companyData) return null;

  /* ─────────────────────────────────────────────────────────
     DERIVED VALUES
  ───────────────────────────────────────────────────────── */

  // KPI cards + single-month charts
  const currentMonthData = allMonthlyData.find(d => d.month === selectedMonth) ?? null;
  const compareMonthData = compareMonth
    ? (allMonthlyData.find(d => d.month === compareMonth) ?? null)
    : null;

  // Accumulated totals across ALL months (impact header only)
  const hasCo2Data = allMonthlyData.some(m => typeof m.savedCo2 === "number" && Number.isFinite(m.savedCo2));
  const totalCo2Accumulated = allMonthlyData.reduce((s, m) => {
    const val = typeof m.savedCo2 === "number" ? m.savedCo2 : 0;
    return s + val;
  }, 0);

  // Activation ratio for selected month
  const activationRatio =
    currentMonthData && currentMonthData.totalUsers > 0
      ? ((currentMonthData.activeDrivers / currentMonthData.totalUsers) * 100).toFixed(1)
      : "0";

  // Multi-month trend charts use chronological order
  const chartData = [...allMonthlyData].sort((a, b) => a.month.localeCompare(b.month));

  const activityTrendData = chartData.map(m => ({
    monthLabel: m.monthLabel,
    actividad: m.totalTravels,
  }));

  const driverGrowthData = chartData.map(m => ({
    monthLabel: m.monthLabel,
    conductores: m.activeDrivers,
    nuevos: m.newDrivers,
  }));

  // Horizontal bars — selected month only
  const activationChartData = currentMonthData
    ? [
      { name: "Conductores activos", value: currentMonthData.activeDrivers, fill: "#9dd187" },
      { name: "Usuarios registrados", value: currentMonthData.totalUsers, fill: "#e5e7eb" },
    ]
    : [];

  const capacityChartData = currentMonthData
    ? [
      { name: "Trayectos publicados", value: currentMonthData.totalTravels, fill: "#9dd187" },
      { name: "Plazas reservadas", value: currentMonthData.reservedSeats, fill: "#93c5fd" },
      { name: "Plazas disponibles", value: currentMonthData.availableSeats, fill: "#fcd34d" },
    ]
    : [];

  // Travel mode breakdown — pie + bar data for selected month
  const travelModeChartData = currentMonthData
    ? (Object.entries(currentMonthData.travelModeBreakdown) as [TravelMode, number][])
      .filter(([, count]) => count > 0)
      .map(([mode, count]) => ({
        mode,
        name: TRAVEL_MODE_CONFIG[mode].label,
        value: count,
        color: TRAVEL_MODE_CONFIG[mode].color,
        pct: currentMonthData.totalTravels > 0
          ? parseFloat(((count / currentMonthData.totalTravels) * 100).toFixed(1))
          : 0,
      }))
      .sort((a, b) => b.value - a.value)
    : [];

  // Travel mode trend across all months (stacked bar)
  const travelModeTrendData = chartData.map(m => ({
    monthLabel: m.monthLabel,
    ...Object.fromEntries(
      (Object.keys(TRAVEL_MODE_CONFIG) as TravelMode[]).map(mode => [
        mode, m.travelModeBreakdown[mode] ?? 0,
      ])
    ),
  }));

  /* ─────────────────────────────────────────────────────────
     SMALL HELPERS
  ───────────────────────────────────────────────────────── */

  const displayValue = (value: number | string, suffix = "") => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return num === 0 ? "0" : `${value}${suffix}`;
  };

  const displayOptionalNumber = (
    value: number | null | undefined,
    fractionDigits = 0,
    suffix = "",
  ) => (
    typeof value === "number" && Number.isFinite(value)
      ? displayValue(value.toFixed(fractionDigits), suffix)
      : "-"
  );

  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return { value: "0", isPositive: true };
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change).toFixed(1), isPositive: change >= 0 };
  };

  const hasMetricNumber = (value: number | null | undefined): value is number => (
    typeof value === "number" && Number.isFinite(value)
  );

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">

      {/* ══════════════════════════════════════════
          MONTH SELECTOR
          One pill per month document found in DB
      ══════════════════════════════════════════ */}
      <div className="space-y-4">

        {/* Header */}
        <div className="bg-linear-to-r from-[#9dd187]/10 to-[#E8F5E0] p-4 rounded-2xl border border-[#9dd187]/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#9dd187]/20 rounded-xl">
              <Calendar className="w-5 h-5 text-[#5A9642]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#2a2c38]">Selecciona un mes</p>
              <p className="text-xs text-gray-500">
                {loading
                  ? "Cargando meses disponibles…"
                  : allMonthlyData.length > 0
                    ? `${allMonthlyData.length} ${allMonthlyData.length === 1 ? "mes disponible" : "meses disponibles"} · Compara con otro mes de forma opcional`
                    : "No hay meses con datos aún"}
              </p>
            </div>
          </div>
        </div>

        {/* Month pills — most recent first */}
        {loading ? (
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-9 w-28 rounded-full bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : allMonthlyData.length > 0 ? (
          <div
            className="flex gap-2 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
            {allMonthlyData.map(m => (
              <button
                key={m.month}
                onClick={() => { setSelectedMonth(m.month); setCompareMonth(""); }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${selectedMonth === m.month
                  ? "bg-[#9dd187] text-[#2a2c38] border-[#9dd187] shadow-md scale-105"
                  : "bg-white text-gray-400 border-gray-100 hover:border-[#9dd187]/40 hover:text-[#5A9642]"
                  }`}
              >
                {m.monthLabel}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 py-2">No hay meses registrados para esta empresa.</p>
        )}

        {/* Compare selector — only visible when ≥ 2 months exist */}
        {selectedMonth && !loading && allMonthlyData.length > 1 && (
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Comparar con otro mes (opcional)
                </p>
                <div
                  className="flex gap-2 overflow-x-auto"
                  style={{ scrollbarWidth: "none" }}
                >
                  <button
                    onClick={() => setCompareMonth("")}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${compareMonth === ""
                      ? "bg-gray-100 text-[#2a2c38] border-gray-200"
                      : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                      }`}
                  >
                    Sin comparar
                  </button>
                  {allMonthlyData
                    .filter(m => m.month !== selectedMonth)
                    .map(m => (
                      <button
                        key={m.month}
                        onClick={() => setCompareMonth(m.month)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${compareMonth === m.month
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-400 border-gray-100 hover:border-blue-200 hover:text-blue-500"
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

      {/* ══════════════════════════════════════════
          IMPACT HEADER
          — "este mes" = selected month
          — "acumulado" = sum of all months
      ══════════════════════════════════════════ */}
      <div className="bg-[#2a2c38] p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Leaf size={120} className="text-[#9dd187]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-[#9dd187] mb-4">
            <div className="h-px w-8 bg-[#9dd187]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              {currentMonthData?.monthLabel ?? "Sin datos"} · Impacto Acumulado
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-gray-400 text-sm mb-2">CO₂e evitado en {currentMonthData?.monthLabel ?? "el mes"}</p>
              <p className="text-4xl font-black text-white">
                {loading
                  ? <Loader2 className="w-7 h-7 animate-spin" />
                  : displayOptionalNumber(currentMonthData?.savedCo2, 0, " kg")}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">CO₂e acumulado total</p>
              <p className="text-4xl font-black text-[#9dd187]">
                {loading
                  ? <Loader2 className="w-7 h-7 animate-spin" />
                  : hasCo2Data ? displayValue(totalCo2Accumulated.toFixed(0), " kg") : "-"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Progreso hacia meta</p>
              <p className="text-4xl font-black text-white">
                {loading
                  ? <Loader2 className="w-7 h-7 animate-spin" />
                  : !hasCo2Data
                    ? "-"
                    : companyData.co2Target && companyData.co2Target > 0
                      ? `${((totalCo2Accumulated / companyData.co2Target) * 100).toFixed(0)}%`
                      : <span className="text-sm text-gray-500">Sin meta definida</span>}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          COMPARISON PANEL
      ══════════════════════════════════════════ */}
      {compareMonthData && currentMonthData && (
        <div className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 p-6 md:p-8 rounded-3xl border-2 border-blue-200/50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-[#2a2c38]">Comparación de Meses</h3>
              </div>
              <p className="text-sm text-gray-500">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "CO₂e Evitado",
                icon: <Leaf className="w-4 h-4 text-green-600" />,
                curr: displayOptionalNumber(currentMonthData.savedCo2),
                prev: displayOptionalNumber(compareMonthData.savedCo2),
                suffix: "kg",
                trend: hasMetricNumber(currentMonthData.savedCo2) && hasMetricNumber(compareMonthData.savedCo2)
                  ? calculateTrend(currentMonthData.savedCo2, compareMonthData.savedCo2)
                  : null,
              },
              {
                label: "Trayectos",
                icon: <Route className="w-4 h-4 text-orange-500" />,
                curr: String(currentMonthData.totalTravels),
                prev: String(compareMonthData.totalTravels),
                suffix: "",
                trend: calculateTrend(currentMonthData.totalTravels, compareMonthData.totalTravels),
              },
              {
                label: "Ocupación",
                icon: <Car className="w-4 h-4 text-blue-600" />,
                curr: currentMonthData.occupancy.toFixed(1),
                prev: compareMonthData.occupancy.toFixed(1),
                suffix: "%",
                trend: calculateTrend(currentMonthData.occupancy, compareMonthData.occupancy),
              },
              {
                label: "Participación",
                icon: <Users className="w-4 h-4 text-green-600" />,
                curr: currentMonthData.participationRate.toFixed(1),
                prev: compareMonthData.participationRate.toFixed(1),
                suffix: "%",
                trend: calculateTrend(currentMonthData.participationRate, compareMonthData.participationRate),
              },
            ].map(item => (
              <div key={item.label} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  {item.icon}
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</p>
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <p className="text-3xl font-black text-[#2a2c38]">{item.curr}</p>
                  {item.suffix && item.curr !== "-" && <span className="text-sm text-gray-400">{item.suffix}</span>}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">vs {item.prev}{item.prev !== "-" ? item.suffix : ""}</span>
                  {item.trend ? (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${item.trend.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                      {item.trend.isPositive
                        ? <ArrowUpRight className="w-3 h-3" />
                        : <ArrowDownRight className="w-3 h-3" />}
                      {item.trend.value}%
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-gray-300 px-2 py-1">-</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          KPI CARDS  — values from selected month
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 rounded-2xl"><Users size={24} className="text-[#9dd187]" /></div>
            {currentMonthData && (
              <span className="text-[10px] font-bold text-gray-300 bg-gray-50 px-2 py-1 rounded-full">
                {currentMonthData.monthLabel}
              </span>
            )}
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Participación</p>
          <h3 className="text-4xl font-black text-[#2a2c38]">
            {loading
              ? <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
              : displayValue(currentMonthData?.participationRate.toFixed(1) ?? 0, "%")}
          </h3>
          <p className="text-xs text-gray-400 mt-2">Empleados activos como conductor o pasajero</p>
        </Card>

        <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl"><Car size={24} className="text-blue-500" /></div>
            {currentMonthData && (
              <span className="text-[10px] font-bold text-gray-300 bg-gray-50 px-2 py-1 rounded-full">
                {currentMonthData.monthLabel}
              </span>
            )}
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Ocupación</p>
          <h3 className="text-4xl font-black text-[#2a2c38]">
            {loading
              ? <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
              : displayValue(currentMonthData?.occupancy.toFixed(1) ?? 0, "%")}
          </h3>
          <p className="text-xs text-gray-400 mt-2">Plazas reservadas sobre plazas ofrecidas</p>
        </Card>

        <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-white hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 rounded-2xl"><Route size={24} className="text-orange-500" /></div>
            {currentMonthData && (
              <span className="text-[10px] font-bold text-gray-300 bg-gray-50 px-2 py-1 rounded-full">
                {currentMonthData.monthLabel}
              </span>
            )}
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Trayectos</p>
          <h3 className="text-4xl font-black text-[#2a2c38]">
            {loading
              ? <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
              : displayValue(currentMonthData?.totalTravels ?? 0)}
          </h3>
          <p className="text-xs text-gray-400 mt-2">Publicados por conductores este mes</p>
        </Card>

        <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-linear-to-br from-[#E8F5E0] to-[#F0F8EC]">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/80 rounded-2xl"><Leaf size={24} className="text-[#5A9642]" /></div>
            {currentMonthData && (
              <span className="text-[10px] font-bold text-[#5A9642]/50 bg-white/60 px-2 py-1 rounded-full">
                {currentMonthData.monthLabel}
              </span>
            )}
          </div>
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">CO₂e Evitado</p>
          <h3 className="text-4xl font-black text-[#2a2c38]">
            {loading
              ? <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
              : displayOptionalNumber(currentMonthData?.savedCo2)}
          </h3>
          <p className="text-xs text-gray-600 mt-2 font-medium">kilogramos este mes</p>
        </Card>
      </div>

      {/* ══════════════════════════════════════════
          CO₂ HERO CHART  — trend across all months
      ══════════════════════════════════════════ */}
      <div className="bg-[#1a1c26] rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="px-8 pt-8 pb-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#9dd187]/10 rounded-2xl">
                <Leaf className="w-6 h-6 text-[#9dd187]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#9dd187] uppercase tracking-[0.3em]">Impacto Climático</p>
                <h3 className="text-2xl font-black text-white mt-0.5">CO₂e Evitado — Evolución</h3>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                  {currentMonthData?.monthLabel ?? "Seleccionado"}
                </p>
                <p className="text-2xl font-black text-white">
                  {displayOptionalNumber(currentMonthData?.savedCo2)}
                  {hasMetricNumber(currentMonthData?.savedCo2) && <span className="text-sm font-medium text-gray-500 ml-1">kg</span>}
                </p>
              </div>
              <div className="w-px bg-gray-700" />
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Acumulado</p>
                <p className="text-2xl font-black text-[#9dd187]">
                  {hasCo2Data ? displayValue(totalCo2Accumulated.toFixed(0)) : "-"}
                  {hasCo2Data && <span className="text-sm font-medium text-gray-500 ml-1">kg</span>}
                </p>
              </div>
              <div className="w-px bg-gray-700" />
              <div className="text-right relative">
                <div className="flex items-center justify-end gap-1.5 mb-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Equivale a</p>
                  <div
                    className="relative"
                    onMouseEnter={() => setHeroTooltip(true)}
                    onMouseLeave={() => setHeroTooltip(false)}
                  >
                    <Info className="w-3 h-3 text-gray-600 cursor-help hover:text-[#9dd187] transition-colors" />
                    {heroTooltip && (
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-[#111315] border border-gray-700 text-white text-xs rounded-xl shadow-2xl z-50 animate-in fade-in duration-150">
                        <div className="flex items-start gap-2">
                          <Car className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-white mb-1">Fuente del dato</p>
                            <p className="text-gray-400 leading-relaxed">
                              El CO₂e evitado se lee del resumen mensual guardado.
                              Un coche medio emite ~192 kg/mes, por lo que{" "}
                              <span className="text-[#9dd187] font-bold">
                                {hasCo2Data ? Math.floor(totalCo2Accumulated / 192) : "-"} coches
                              </span>{" "}
                              equivalen a {hasCo2Data ? totalCo2Accumulated.toFixed(0) : "-"} kg fuera de carretera un mes.
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-full right-4 -mt-px">
                          <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid #111315" }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-2xl font-black text-white">
                  {hasCo2Data ? displayValue(Math.floor(totalCo2Accumulated / 192)) : "-"}
                  {hasCo2Data && <span className="text-sm font-medium text-gray-500 ml-1">coches/mes</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-6 pt-4">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
            </div>
          ) : hasCo2Data ? (
            <div className="h-64">
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
                  <XAxis dataKey="monthLabel" axisLine={false} tickLine={false} tick={{ fill: "#4a4c58", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#4a4c58", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "16px", border: "1px solid #2a2c38", backgroundColor: "#1e2029", color: "#fff" }}
                    formatter={(value: number) => [`${value} kg`, "CO₂e evitado"]}
                  />
                  <Area
                    type="monotone" dataKey="savedCo2" stroke="#9dd187" strokeWidth={3}
                    fill="url(#colorCo2Hero)"
                    dot={{ r: 5, fill: "#9dd187", strokeWidth: 0 }}
                    activeDot={{ r: 7, fill: "#9dd187", stroke: "#1a1c26", strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-600">No hay datos disponibles</div>
          )}
        </div>
      </div>

      {/* Company Goals */}
      {hasCo2Data && (
        <CompanyGoals
          co2Target={companyData.co2Target || undefined}
          totalCo2={totalCo2Accumulated}
          onViewSettings={() => router.push("/intranet-empresas/ajustes")}
        />
      )}

      {/* ══════════════════════════════════════════
          TREND CHARTS  (all months, chronological)
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">Tendencia de Trayectos</h3>
              <p className="text-xs text-gray-400 mt-0.5">Trayectos publicados por mes</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-xl"><TrendingUp className="w-5 h-5 text-purple-600" /></div>
          </div>
          {loading ? (
            <div className="h-60 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
          ) : activityTrendData.length > 0 ? (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="monthLabel" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
                  <Line type="monotone" dataKey="actividad" stroke="#9333ea" strokeWidth={3} dot={{ r: 5, fill: "#9333ea" }} name="Trayectos" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-60 flex items-center justify-center text-gray-400 text-sm">No hay datos disponibles</div>
          )}
        </Card>

        <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">Trayectos por Mes</h3>
              <p className="text-xs text-gray-400 mt-0.5">Volumen mensual comparado</p>
            </div>
            <div className="p-2 bg-[#E8F5E0] rounded-xl"><Route className="w-5 h-5 text-[#5A9642]" /></div>
          </div>
          {loading ? (
            <div className="h-60 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
          ) : chartData.length > 0 ? (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="monthLabel" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <Tooltip cursor={{ fill: "#f9fafb" }} contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} formatter={(v: number) => [v, "Trayectos"]} />
                  <Bar dataKey="totalTravels" fill="#9dd187" radius={[8, 8, 0, 0]} name="Trayectos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-60 flex items-center justify-center text-gray-400 text-sm">No hay datos disponibles</div>
          )}
        </Card>

        <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">Tasa de Ocupación</h3>
              <p className="text-xs text-gray-400 mt-0.5">% de plazas reservadas sobre plazas ofrecidas — por mes</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-xl"><Car className="w-5 h-5 text-blue-500" /></div>
          </div>
          {loading ? (
            <div className="h-60 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
          ) : chartData.length > 0 ? (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="monthLabel" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <YAxis axisLine={false} tickLine={false} unit="%" tick={{ fontSize: 11, fill: "#9ca3af" }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} formatter={(v: number) => [`${v}%`, "Ocupación"]} />
                  <Line type="monotone" dataKey="occupancy" stroke="#2a2c38" strokeWidth={3} dot={{ r: 6, fill: "#9dd187", strokeWidth: 0 }} name="Ocupación %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-60 flex items-center justify-center text-gray-400 text-sm">No hay datos disponibles</div>
          )}
        </Card>
      </div>

      {/* ══════════════════════════════════════════
          CONDUCTORES Y COCHES
          All values scoped to selected month
      ══════════════════════════════════════════ */}
      <div className="space-y-6">

        <div className="flex items-center gap-4 pt-4">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
          <div className="flex items-center gap-3 px-5 py-2.5 bg-[#2a2c38] rounded-full shadow-lg">
            <Car className="w-4 h-4 text-[#9dd187]" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.22em]">
              Conductores y coches · {currentMonthData?.monthLabel ?? ""}
            </span>
          </div>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-[#2a2c38] text-white">
            <div className="p-3 bg-[#9dd187]/15 rounded-2xl w-fit mb-4">
              <Car size={24} className="text-[#9dd187]" />
            </div>
            <p className="text-[10px] font-black text-[#9dd187] uppercase tracking-widest mb-1">Coches habilitados</p>
            <h3 className="text-4xl font-black text-white">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : displayValue(currentMonthData?.activeDrivers ?? 0)}
            </h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Empleados que han publicado al menos una ruta en {currentMonthData?.monthLabel ?? "este mes"}.
            </p>
          </Card>

          <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-white hover:shadow-md transition-shadow">
            <div className="p-3 bg-[#E8F5E0] rounded-2xl w-fit mb-4">
              <Users size={24} className="text-[#5A9642]" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Plazas disponibles</p>
            <h3 className="text-4xl font-black text-[#2a2c38]">
              {loading ? <Loader2 className="w-6 h-6 animate-spin text-gray-300" /> : displayValue(currentMonthData?.availableSeats ?? 0)}
            </h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Total de plazas ofrecidas en trayectos publicados este mes.
            </p>
          </Card>

          <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-linear-to-br from-amber-50 to-orange-50 hover:shadow-md transition-shadow">
            <div className="p-3 bg-white/80 rounded-2xl w-fit mb-4">
              <Percent size={24} className="text-amber-500" />
            </div>
            <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">Ratio de activación</p>
            <h3 className="text-4xl font-black text-[#2a2c38]">
              {loading ? <Loader2 className="w-6 h-6 animate-spin text-gray-300" /> : `${activationRatio}%`}
            </h3>
            <p className="text-xs text-amber-700/70 mt-2 leading-relaxed">
              {activationRatio !== "0"
                ? `El ${activationRatio}% de la plantilla ha habilitado su coche en ${currentMonthData?.monthLabel}.`
                : "Aún no hay datos de activación para este mes."}
            </p>
          </Card>

          <Card className="p-6 rounded-[2.5rem] border-none shadow-sm bg-linear-to-br from-[#E8F5E0] to-[#F0F8EC] hover:shadow-md transition-shadow">
            <div className="p-3 bg-white/80 rounded-2xl w-fit mb-4">
              <Zap size={24} className="text-[#5A9642]" />
            </div>
            <p className="text-[10px] font-black text-[#5A9642] uppercase tracking-widest mb-1">Nuevos conductores</p>
            <h3 className="text-4xl font-black text-[#2a2c38]">
              {loading ? <Loader2 className="w-6 h-6 animate-spin text-gray-300" /> : displayValue(currentMonthData?.newDrivers ?? 0)}
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              {currentMonthData?.newDrivers
                ? `${currentMonthData.newDrivers} empleado${currentMonthData.newDrivers !== 1 ? "s han" : " ha"} habilitado su coche por primera vez en ${currentMonthData.monthLabel}.`
                : `Sin nuevas activaciones en ${currentMonthData?.monthLabel ?? "este mes"}.`}
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">Activación de vehículos</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Conductores activos vs total registrados · {currentMonthData?.monthLabel ?? ""}
                </p>
              </div>
              <div className="p-2 bg-[#E8F5E0] rounded-xl"><UserCheck className="w-5 h-5 text-[#5A9642]" /></div>
            </div>
            {loading ? (
              <div className="h-52 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
            ) : activationChartData.length > 0 ? (
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activationChartData} layout="vertical" margin={{ left: 0, right: 32 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#4a4c58" }} width={155} />
                    <Tooltip cursor={{ fill: "#f9fafb" }} contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
                    <Bar dataKey="value" name="Personas" radius={[0, 8, 8, 0]} fill="#9dd187"
                      label={{ position: "right", fontSize: 12, fontWeight: 700, fill: "#2a2c38" }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-52 flex items-center justify-center text-gray-400 text-sm">No hay datos disponibles</div>
            )}
          </Card>

          <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">Capacidad de carpooling</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Trayectos · reservas · plazas libres · {currentMonthData?.monthLabel ?? ""}
                </p>
              </div>
              <div className="p-2 bg-blue-50 rounded-xl"><Route className="w-5 h-5 text-blue-500" /></div>
            </div>
            {loading ? (
              <div className="h-52 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
            ) : capacityChartData.length > 0 ? (
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={capacityChartData} layout="vertical" margin={{ left: 0, right: 32 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#4a4c58" }} width={155} />
                    <Tooltip cursor={{ fill: "#f9fafb" }} contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
                    <Bar dataKey="value" name="Cantidad" radius={[0, 8, 8, 0]} fill="#93c5fd"
                      label={{ position: "right", fontSize: 12, fontWeight: 700, fill: "#2a2c38" }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-52 flex items-center justify-center text-gray-400 text-sm">No hay datos disponibles</div>
            )}
          </Card>
        </div>

        <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">
                Crecimiento de la red de carpooling
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Conductores activos y nuevas incorporaciones mes a mes
              </p>
            </div>
            <div className="p-2 bg-[#E8F5E0] rounded-xl"><TrendingUp className="w-5 h-5 text-[#5A9642]" /></div>
          </div>
          <div className="mb-6 px-5 py-3 bg-[#f6fdf2] border border-[#9dd187]/40 rounded-2xl">
            <p className="text-xs text-[#5A9642] leading-relaxed">
              La red de carpooling continúa creciendo con nuevos conductores que ponen plazas disponibles cada mes en SharetoGo.
            </p>
          </div>
          {loading ? (
            <div className="h-64 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
          ) : driverGrowthData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={driverGrowthData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="monthLabel" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
                  <Line
                    type="monotone" dataKey="conductores" stroke="#9dd187" strokeWidth={3}
                    dot={{ r: 5, fill: "#9dd187", strokeWidth: 0 }}
                    activeDot={{ r: 7, fill: "#9dd187", stroke: "#2a2c38", strokeWidth: 2 }}
                    name="Conductores activos"
                  />
                  <Line
                    type="monotone" dataKey="nuevos" stroke="#2a2c38" strokeWidth={2} strokeDasharray="5 4"
                    dot={{ r: 4, fill: "#2a2c38", strokeWidth: 0 }}
                    name="Nuevos este mes"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400 text-sm">No hay datos disponibles</div>
          )}
        </Card>
      </div>

      {/* ══════════════════════════════════════════
          TRAVEL MODE BREAKDOWN
          Donut (selected month) + stacked bar trend
      ══════════════════════════════════════════ */}
      <div className="space-y-6">

        {/* Section divider */}
        <div className="flex items-center gap-4 pt-4">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
          <div className="flex items-center gap-3 px-5 py-2.5 bg-[#2a2c38] rounded-full shadow-lg">
            <Route className="w-4 h-4 text-[#9dd187]" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.22em]">
              Medios de transporte · {currentMonthData?.monthLabel ?? ""}
            </span>
          </div>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Donut chart: share per mode this month ── */}
          <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">
                  Distribución por medio
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Trayectos por tipo de transporte · {currentMonthData?.monthLabel ?? ""}
                </p>
              </div>
              <div className="p-2 bg-[#E8F5E0] rounded-xl">
                <Route className="w-5 h-5 text-[#5A9642]" />
              </div>
            </div>

            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
              </div>
            ) : travelModeChartData.length > 0 ? (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Donut */}
                <div className="w-44 h-44 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={travelModeChartData}
                        cx="50%" cy="50%"
                        innerRadius={50} outerRadius={72}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                      >
                        {travelModeChartData.map(entry => (
                          <Cell key={entry.mode} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: 12 }}
                        formatter={(value: number, _: string, props: any) => [
                          `${value} trayecto${value !== 1 ? "s" : ""} (${props.payload.pct}%)`,
                          props.payload.name,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend list */}
                <div className="flex flex-col gap-2.5 flex-1 w-full">
                  {travelModeChartData.map(entry => (
                    <div key={entry.mode} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs text-gray-600 truncate">{entry.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-[#2a2c38]">{entry.value}</span>
                        <span className="text-[10px] text-gray-400 w-10 text-right">{entry.pct}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
                No hay datos disponibles
              </div>
            )}
          </Card>

          {/* ── Stat cards: one per mode ── */}
          <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">
                  Detalle por medio
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Número de trayectos por tipo · {currentMonthData?.monthLabel ?? ""}
                </p>
              </div>
              <div className="p-2 bg-purple-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
            </div>

            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {(Object.keys(TRAVEL_MODE_CONFIG) as TravelMode[]).map(mode => {
                  const cfg = TRAVEL_MODE_CONFIG[mode];
                  const count = currentMonthData?.travelModeBreakdown[mode] ?? 0;
                  const pct = currentMonthData && currentMonthData.totalTravels > 0
                    ? ((count / currentMonthData.totalTravels) * 100).toFixed(0)
                    : "0";
                  const ModeIcon =
                    mode === "car" ? Car :
                      mode === "walking" ? Footprints :
                        mode === "bicycle" ? Bike :
                          mode === "e_scooter" ? Bolt : Train;

                  return (
                    <div
                      key={mode}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/60 hover:bg-gray-50 transition-colors"
                    >
                      <div className={`p-2 ${cfg.bg} rounded-xl shrink-0`}>
                        <ModeIcon className={`w-4 h-4 ${cfg.text}`} />
                      </div>
                      <span className="text-sm text-gray-600 flex-1">{cfg.label}</span>
                      <div className="flex items-center gap-3">
                        {/* Progress bar */}
                        <div className="w-20 h-1.5 rounded-full bg-gray-200 overflow-hidden hidden sm:block">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, backgroundColor: cfg.color }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                        <span className="text-sm font-black text-[#2a2c38] w-6 text-right">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* ── Stacked bar: mode trend across all months ── */}
        {chartData.length > 1 && (
          <Card className="p-6 lg:p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-black text-[#2a2c38] uppercase tracking-tight">
                  Evolución de medios de transporte
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Trayectos por tipo mes a mes
                </p>
              </div>
              <div className="p-2 bg-purple-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={travelModeTrendData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="monthLabel" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }}
                      cursor={{ fill: "#f9fafb" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
                    {(Object.keys(TRAVEL_MODE_CONFIG) as TravelMode[]).map(mode => (
                      <Bar
                        key={mode}
                        dataKey={mode}
                        name={TRAVEL_MODE_CONFIG[mode].label}
                        stackId="modes"
                        fill={TRAVEL_MODE_CONFIG[mode].color}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        )}
      </div>

      {/* ══════════════════════════════════════════
          INFO FOOTER
      ══════════════════════════════════════════ */}
      <div className="bg-linear-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gray-100 rounded-xl">
            <Info className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#2a2c38] mb-1">Acerca de estos datos</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Cada mes se muestra exclusivamente a partir del documento metrics/summary guardado.
              Los valores &quot;-&quot; indican ausencia de datos en el resumen mensual.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
