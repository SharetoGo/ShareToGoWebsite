// components/dashboard/widgets/top-carpoolers.tsx
import { Award, Medal, Trophy } from "lucide-react";

export function TopCarpoolers() {
  // Logic: In a real scenario, you'd fetch this from a 'users' collection 
  // filtered by companyId. For now, we use high-fidelity mock data.
  const champions = [
    { name: "Angel Halouane", trips: 42, co2: 84.5, rank: 1, color: "text-yellow-500" },
    { name: "Marta García", trips: 38, co2: 76.2, rank: 2, color: "text-slate-400" },
    { name: "Joan Reixach", trips: 31, co2: 62.0, rank: 3, color: "text-amber-700" },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="text-[#9dd187]" size={20} />
          <h4 className="font-bold text-[#2a2c38]">Top Carpoolers</h4>
        </div>
        <span className="text-[10px] font-bold bg-gray-50 px-2 py-1 rounded-md text-gray-400 uppercase tracking-wider">Mes Actual</span>
      </div>

      <div className="space-y-4 flex-1">
        {champions.map((person, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-gray-50 group-hover:bg-white transition-colors ${person.color}`}>
                <Medal size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#2a2c38]">{person.name}</p>
                <p className="text-[10px] text-gray-400 font-medium">{person.trips} viajes realizados</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-[#9dd187]">-{person.co2}kg</p>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">CO2e</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full py-2 text-xs font-bold text-gray-400 hover:text-[#2a2c38] transition-colors border-t border-dashed border-gray-100 pt-4">
        Ver ranking completo
      </button>
    </div>
  );
}