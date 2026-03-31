"use client";

import { BarChart3, ArrowRight, Leaf, TrendingUp, PieChart } from "lucide-react";
import { useRouter } from "next/navigation";

export function AnalyticsHub({
  totalCo2,
  onViewAnalytics,
}: {
  totalCo2: number;
  onViewAnalytics: () => void;
}) {
  const router = useRouter();

  return (
    <div className="bg-[#2a2c38] text-white p-8 rounded-[2.5rem] border border-white/5 shadow-sm relative overflow-hidden group hover:shadow-md transition-all flex flex-col h-full">
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity text-white">
        <BarChart3 size={200} className="-rotate-12" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#9dd187]/10 rounded-xl">
              <TrendingUp size={20} className="text-[#9dd187]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Insights Hub
            </span>
          </div>
          <div className="flex -space-x-2">
            {[PieChart, BarChart3].map((Icon, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/5 border-2 border-[#2a2c38] flex items-center justify-center text-gray-500">
                <Icon size={12} />
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h4 className="text-2xl font-black text-white leading-tight mb-2">
            Métricas de <span className="text-[#9dd187]">Impacto</span>
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed font-medium">
            Visualiza tendencias de uso, tasas de ocupación y el ahorro de CO₂e acumulado de tu comunidad.
          </p>
        </div>

        {/* Mini Stat Card */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 w-full">
            <div className="p-2 bg-[#9dd187] rounded-lg">
              <Leaf size={16} className="text-[#2a2c38]" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Ahorro Mensual
              </p>
              <p className="text-xl font-black text-white">
                {totalCo2.toFixed(0)} <span className="text-xs font-medium text-gray-500">kg CO₂e</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={() => router.push("/intranet-empresas/analiticas")}
            className="w-full bg-[#9dd187] text-[#2a2c38] font-black py-4 px-6 rounded-2xl hover:bg-[#b4e69f] transition-all flex items-center justify-center gap-3 group/btn shadow-lg shadow-black/20"
          >
            <span className="text-xs uppercase tracking-widest">Ver Analytics</span>
            <ArrowRight
              size={16}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
