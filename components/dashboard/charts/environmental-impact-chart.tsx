// components/dashboard/charts/environmental-impact-chart.tsx
import { TrendingDown } from "lucide-react";

export function EnvironmentalImpactChart() {
  // Mock data representing CO2 savings over the last 6 months
  const months = ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const points = "0,80 40,60 80,70 120,40 160,30 200,10"; // SVG coordinate path

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h4 className="font-bold text-[#2a2c38]">Tendencia de Emisiones</h4>
          <p className="text-xs text-gray-400">Emisiones de la flota (kg CO2e)</p>
        </div>
        <div className="flex items-center gap-1 text-green-500 bg-green-50 px-2 py-1 rounded-lg">
          <TrendingDown size={14} />
          <span className="text-xs font-bold">-14%</span>
        </div>
      </div>

      {/* Simplified SVG Chart */}
      <div className="relative h-40 w-full px-2">
        <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
          {/* Grid Lines */}
          <line x1="0" y1="0" x2="200" y2="0" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="50" x2="200" y2="50" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="#f1f5f9" strokeWidth="1" />

          {/* The Data Line */}
          <polyline
            fill="none"
            stroke="#9dd187"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            className="drop-shadow-md"
          />

          {/* Animated Gradient Area */}
          <path d={`M ${points} V 100 H 0 Z`} fill="url(#gradient)" className="opacity-20" />

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9dd187" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>

        {/* Labels */}
        <div className="flex justify-between mt-4">
          {months.map((m, i) => (
            <span key={i} className="text-[10px] font-bold text-gray-300 uppercase">
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
