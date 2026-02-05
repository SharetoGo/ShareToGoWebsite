// components/dashboard/widgets/company-goals.tsx
"use client";

import { Target, TrendingUp, Leaf, Award, Settings, Info, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CompanyGoalsProps {
  co2Target?: number;
  totalCo2: number;
  onViewSettings: () => void;
}

export function CompanyGoals({ co2Target, totalCo2, onViewSettings }: CompanyGoalsProps) {
  const router = useRouter();
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  // Si no hay meta establecida, mostrar CTA
  if (!co2Target || co2Target === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-3xl border-2 border-dashed border-gray-200 shadow-sm">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="p-4 bg-gray-100 rounded-2xl mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>

          <h4 className="text-lg font-bold text-[#2a2c38] mb-2">Establece tu Meta de CO₂</h4>

          <p className="text-sm text-gray-500 mb-6 max-w-md">
            Define un objetivo anual de reducción de CO₂ para tu empresa y monitorea el progreso de
            tu equipo hacia la sostenibilidad.
          </p>

          <button
            onClick={onViewSettings}
            className="flex items-center gap-2 px-6 py-3 bg-[#9dd187] text-white rounded-xl font-semibold hover:bg-[#8bc175] transition-all shadow-md hover:shadow-lg"
          >
            <Settings className="w-4 h-4" />
            Configurar Meta
          </button>
        </div>
      </div>
    );
  }

  // Calcular métricas
  const co2Progress = Math.min((totalCo2 / co2Target) * 100, 100);
  const remaining = co2Target - totalCo2;
  const remainingPercentage = 100 - co2Progress;

  // Equivalencias
  const treesEquivalent = Math.round(totalCo2 / 21); // 1 árbol absorbe ~21kg CO2/año
  const carsOffRoad = Math.round(totalCo2 / 192); // Coche promedio emite ~192kg CO2/mes (2,300/12)

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="text-[#9dd187]" size={20} />
          <h4 className="font-bold text-[#2a2c38]">Meta de Sostenibilidad</h4>
        </div>
        <button
          onClick={() => router.push("/intranet-empresas/settings")}
          className="text-xs text-gray-400 hover:text-[#9dd187] transition-colors flex items-center gap-1"
        >
          <Settings className="w-3 h-3" />
          Editar
        </button>
      </div>

      {/* Main Progress */}
      <div className="mb-6">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">CO₂ Reducido</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-4xl font-bold text-[#2a2c38]">{totalCo2.toFixed(0)}</h3>
              <span className="text-lg text-gray-400 font-medium">/ {co2Target} kg</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[#9dd187]">{co2Progress.toFixed(0)}%</p>
            <p className="text-xs text-gray-400">completado</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#9dd187] to-[#7AB86A] rounded-full transition-all duration-500 relative"
            style={{ width: `${co2Progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {remaining > 0 ? (
            <>
              Faltan <span className="font-bold text-[#2a2c38]">{remaining.toFixed(0)} kg</span>{" "}
              para alcanzar la meta ({remainingPercentage.toFixed(0)}%)
            </>
          ) : (
            <span className="text-[#5A9642] font-bold">¡Meta alcanzada! 🎉</span>
          )}
        </p>
      </div>

      {/* Equivalences with Tooltips */}
      <div className="grid grid-cols-3 gap-4">
        {/* Trees */}
        <div className="relative p-4 rounded-2xl bg-gradient-to-br from-[#E8F5E0] to-[#F0F8EC] border border-[#9dd187]/20">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-[#5A9642]" />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Equivalente</span>

            {/* Info Icon with Tooltip */}
            <div className="relative ml-auto">
              <Info
                className="w-3 h-3 text-gray-400 cursor-help hover:text-[#5A9642] transition-colors"
                onMouseEnter={() => setHoveredTooltip("trees")}
                onMouseLeave={() => setHoveredTooltip(null)}
              />

              {hoveredTooltip === "trees" && (
                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-[#2a2c38] text-white text-xs rounded-xl shadow-lg z-50 animate-in fade-in duration-200">
                  <div className="flex items-start gap-2">
                    <Leaf className="w-4 h-4 text-[#9dd187] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Árboles equivalentes</p>
                      <p className="text-gray-300 leading-relaxed">
                        Un árbol adulto absorbe aproximadamente{" "}
                        <span className="text-[#9dd187] font-bold">21 kg de CO₂</span> por año. Tu
                        empresa ha ahorrado el equivalente a plantar{" "}
                        <span className="text-white font-bold">{treesEquivalent} árboles</span>.
                      </p>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full right-4 -mt-1">
                    <div className="border-8 border-transparent border-t-[#2a2c38]" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-2xl font-bold text-[#2a2c38] mb-1">{treesEquivalent}</p>
          <p className="text-[10px] text-gray-600 leading-tight">árboles plantados</p>
        </div>

        {/* Cars */}
        <div className="relative p-4 rounded-2xl bg-gradient-to-br from-[#E8F5E0] to-[#F0F8EC] border border-[#9dd187]/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#5A9642]" />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Impacto</span>

            {/* Info Icon with Tooltip */}
            <div className="relative ml-auto">
              <Info
                className="w-3 h-3 text-gray-400 cursor-help hover:text-[#5A9642] transition-colors"
                onMouseEnter={() => setHoveredTooltip("cars")}
                onMouseLeave={() => setHoveredTooltip(null)}
              />

              {hoveredTooltip === "cars" && (
                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-[#2a2c38] text-white text-xs rounded-xl shadow-lg z-50 animate-in fade-in duration-200">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-[#9dd187] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Coches fuera de circulación</p>
                      <p className="text-gray-300 leading-relaxed">
                        Un coche promedio emite{" "}
                        <span className="text-[#9dd187] font-bold">192 kg de CO₂</span> al mes. Tu
                        reducción equivale a sacar{" "}
                        <span className="text-white font-bold">{carsOffRoad} coches</span> de la
                        carretera durante un mes.
                      </p>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full right-4 -mt-1">
                    <div className="border-8 border-transparent border-t-[#2a2c38]" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-2xl font-bold text-[#2a2c38] mb-1">{carsOffRoad}</p>
          <p className="text-[10px] text-gray-600 leading-tight">coches fuera</p>
        </div>

        {/* Achievement */}
        <div className="relative p-4 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-yellow-600" />
            <span className="text-[10px] font-bold text-yellow-700 uppercase">Logro</span>

            {/* Info Icon with Tooltip */}
            <div className="relative ml-auto">
              <Info
                className="w-3 h-3 text-yellow-600 cursor-help hover:text-yellow-700 transition-colors"
                onMouseEnter={() => setHoveredTooltip("achievement")}
                onMouseLeave={() => setHoveredTooltip(null)}
              />

              {hoveredTooltip === "achievement" && (
                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-[#2a2c38] text-white text-xs rounded-xl shadow-lg z-50 animate-in fade-in duration-200">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Sistema de logros</p>
                      <p className="text-gray-300 leading-relaxed">
                        <Star className="w-3 h-3 inline text-yellow-400 fill-yellow-400" /> 0-49% de
                        la meta
                        <br />
                        <Star className="w-3 h-3 inline text-yellow-400 fill-yellow-400" />
                        <Star className="w-3 h-3 inline text-yellow-400 fill-yellow-400" /> 50-74%
                        de la meta
                        <br />
                        <Star className="w-3 h-3 inline text-yellow-400 fill-yellow-400" />
                        <Star className="w-3 h-3 inline text-yellow-400 fill-yellow-400" />
                        <Star className="w-3 h-3 inline text-yellow-400 fill-yellow-400" /> 75-100%
                        de la meta
                      </p>
                      <p className="text-gray-400 text-[10px] mt-2">
                        Actualmente: {co2Progress.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full right-4 -mt-1">
                    <div className="border-8 border-transparent border-t-[#2a2c38]" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-2xl font-bold text-yellow-700 mb-1 flex items-center gap-0.5">
            {co2Progress >= 75 ? (
              <>
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </>
            ) : co2Progress >= 50 ? (
              <>
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </>
            ) : (
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            )}
          </div>
          <p className="text-[10px] text-yellow-700 leading-tight font-medium">
            {co2Progress >= 75 ? "¡Excelente!" : co2Progress >= 50 ? "Buen avance" : "Sigue así"}
          </p>
        </div>
      </div>
    </div>
  );
}
