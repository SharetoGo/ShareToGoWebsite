// components/dashboard/widgets/quick-stats-compact.tsx
import { Car, Users, Leaf, Percent, Calendar } from "lucide-react";

interface QuickStatsCompactProps {
  totalCo2: number;
  seatOccupancyRate: number;
  participationRate: number;
  totalTravelsMonthly: number;
}

export function QuickStatsCompact({
  totalCo2,
  seatOccupancyRate,
  participationRate,
  totalTravelsMonthly,
}: QuickStatsCompactProps) {
  const displayValue = (value: number, suffix = "") => (value === 0 ? "-" : `${value}${suffix}`);

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Resumen del mes
        </h5>
        <div className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-3 h-3" />
          <span className="text-[9px] font-semibold">Mes actual</span>
        </div>
      </div>

      <div className="grid grid-cols-4 divide-x divide-gray-100">
        {/* Trayectos */}
        <div className="px-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-[#E8F5E0] rounded-xl">
              <Car className="w-4 h-4 text-[#5A9642]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#2a2c38] mb-0.5">
            {displayValue(totalTravelsMonthly)}
          </p>
          <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
            Trayectos
          </p>
          <p className="text-[9px] text-gray-400 mt-1">este mes</p>
        </div>

        {/* Ocupación */}
        <div className="px-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-[#E8F5E0] rounded-xl">
              <Percent className="w-4 h-4 text-[#5A9642]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#2a2c38] mb-0.5">
            {displayValue(Math.round(seatOccupancyRate), "%")}
          </p>
          <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
            Ocupación
          </p>
          <p className="text-[9px] text-gray-400 mt-1">plazas utilizadas</p>
        </div>

        {/* Participación */}
        <div className="px-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-[#E8F5E0] rounded-xl">
              <Users className="w-4 h-4 text-[#5A9642]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#2a2c38] mb-0.5">
            {displayValue(Math.round(participationRate), "%")}
          </p>
          <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
            Participación
          </p>
          <p className="text-[9px] text-gray-400 mt-1">empleados activos</p>
        </div>

        {/* CO₂ */}
        <div className="px-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-[#E8F5E0] rounded-xl">
              <Leaf className="w-4 h-4 text-[#5A9642]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#9dd187] mb-0.5">
            {displayValue(Math.round(totalCo2))}
          </p>
          <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
            CO₂e evitado
          </p>
          <p className="text-[9px] text-gray-400 mt-1">kg este mes</p>
        </div>
      </div>
    </div>
  );
}
