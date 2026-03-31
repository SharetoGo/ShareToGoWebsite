// components/dashboard/widgets/quick-stats-compact.tsx
import { Car, Users, Leaf, Percent } from "lucide-react";

export function QuickStatsCompact({ totalCo2, seatOccupancyRate, participationRate, totalTravelsMonthly }: any) {
  const stats = [
    { label: "Trayectos", val: totalTravelsMonthly || "-", icon: Car, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Ocupación", val: seatOccupancyRate ? `${Math.round(seatOccupancyRate)}%` : "-", icon: Percent, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Participación", val: participationRate ? `${Math.round(participationRate)}%` : "-", icon: Users, color: "text-[#9dd187]", bg: "bg-green-50" },
    { label: "CO₂ Evitado", val: totalCo2 ? `${Math.round(totalCo2)}kg` : "-", icon: Leaf, color: "text-green-600", bg: "bg-[#E8F5E0]" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 ${s.bg} rounded-xl group-hover:scale-110 transition-transform`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
          </div>
          <p className="text-3xl font-black text-[#2a2c38]">{s.val}</p>
        </div>
      ))}
    </div>
  );
}