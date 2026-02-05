// components/dashboard/widgets/analytics-hub.tsx
"use client";

import { BarChart3, ArrowRight, Leaf, TrendingUp } from "lucide-react";
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
    <div className="bg-gradient-to-br from-[#2a2c38] to-[#3a3d48] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden group hover:shadow-xl transition-all">
      {/* Background decoration */}
      <div className="absolute -bottom-10 -left-10 opacity-10 group-hover:opacity-20 transition-opacity">
        <BarChart3 size={150} className="-rotate-12" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-[#9dd187]/20 rounded-lg backdrop-blur-sm">
            <BarChart3 size={18} className="text-[#9dd187]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
            Análisis Mensual
          </span>
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold mb-2 text-white">Información detallada</h4>

        <p className="text-sm font-semibold text-gray-300 mb-1">Visualiza tu impacto mes a mes</p>

        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          Accede a gráficos detallados de CO₂e evitado, tendencias de uso, ocupación y análisis
          completo de tu programa de carpooling.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="w-4 h-4 text-[#9dd187]" />
              <span className="text-xs text-gray-400">CO₂e Total</span>
            </div>
            <p className="text-lg font-bold text-white">{totalCo2.toFixed(0)} kg</p>
          </div>

          <div className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-[#9dd187]" />
              <span className="text-xs text-gray-400">Evolución</span>
            </div>
            <p className="text-lg font-bold text-[#9dd187]">+15%</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onViewAnalytics}
          className="w-full bg-[#9dd187] text-[#2a2c38] font-bold py-3 px-4 rounded-xl hover:bg-[#8bc175] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group/btn"
        >
          Ver análisis completo
          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
