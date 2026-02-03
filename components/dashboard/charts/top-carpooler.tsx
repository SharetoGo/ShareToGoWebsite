// components/dashboard/widgets/top-carpoolers.tsx
'use client'

import { useMemo } from "react";
import { Trophy, Medal, Car, TrendingUp } from "lucide-react";

interface Champion {
  name: string;
  lastName: string;
  km: number;
  trips: number;
  color: string;
}

interface TopCarpoolersProps {
  users: any[];
}

export function TopCarpoolers({ users }: TopCarpoolersProps) {
  
  // ✨ CAMBIO CLAVE: En lugar de useEffect con queries, usamos useMemo con datos pre-cargados
  const champions = useMemo(() => {
    if (!users || users.length === 0) return [];

    return users
      .map(user => ({
        name: user.name || "Usuario",
        lastName: user.lastName || "",
        km: user.kmTravelled || 0,
        trips: (user.passengerTravels || 0) + (user.driverTravels || 0),
        color: ""
      }))
      .sort((a, b) => b.km - a.km)
      .slice(0, 3)
      .map((user, index) => ({
        ...user,
        color: index === 0 
          ? "text-yellow-500" 
          : index === 1 
            ? "text-slate-400" 
            : "text-amber-700"
      }));
  }, [users]);

  return (
    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="text-[#9dd187]" size={20} />
          <h4 className="font-bold text-[#2a2c38] text-sm">Top Carpoolers</h4>
        </div>
        <span className="text-[10px] font-bold bg-gray-50 px-2 py-1 rounded-md text-gray-400 uppercase tracking-wider">
          Distancia
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        {champions.length > 0 ? (
          <div className="space-y-2.5">
            {champions.map((person, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-gradient-to-r hover:from-[#E8F5E0]/30 hover:to-transparent transition-all border border-transparent hover:border-[#9dd187]/20 group"
              >
                {/* Left: Medal + User Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-xl bg-gray-50 group-hover:bg-white transition-colors ${person.color}`}>
                      <Medal size={16} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#2a2c38] truncate">
                        {person.name} {person.lastName}
                      </p>
                      {i === 0 && (
                        <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[9px] font-bold rounded uppercase flex-shrink-0">
                          MVP
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">
                      {person.trips} viajes
                    </p>
                  </div>
                </div>

                {/* Right: KM */}
                <div className="text-right flex-shrink-0 ml-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <Car className="text-[#9dd187]" size={14} />
                    <p className="text-lg font-bold text-[#2a2c38]">
                      {person.km.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-[9px] text-gray-400 uppercase font-bold">
                    km
                  </p>
                </div>
              </div>
            ))}

            {/* Summary Footer */}
            <div className="mt-3 p-3 rounded-2xl bg-gradient-to-br from-[#E8F5E0] to-[#F0F8EC] border border-[#9dd187]/20">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-white/80">
                  <TrendingUp className="text-[#5A9642]" size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#2a2c38] mb-1">
                    {champions[0].name} {champions[0].lastName} lidera
                  </p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">
                    {champions[0].km.toLocaleString()} km en {champions[0].trips} viajes
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <div className="p-3 rounded-full bg-gray-50 mb-2">
              <Trophy className="text-gray-200" size={32} />
            </div>
            <p className="text-sm text-gray-400 font-semibold">
              No hay datos
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Aparecerán al viajar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}