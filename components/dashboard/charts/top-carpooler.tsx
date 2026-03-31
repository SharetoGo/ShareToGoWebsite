// components/dashboard/widgets/top-carpoolers.tsx
'use client'

import { useMemo } from "react";
import { Trophy, Medal, Car, TrendingUp } from "lucide-react";
import { useAuth } from "@/app/intranet-empresas/providers/AuthContext";

interface TopCarpoolersProps {
  users: any[];
}

export function TopCarpoolers({ users }: TopCarpoolersProps) {
  const { companyData } = useAuth();
  
  const champions = useMemo(() => {
    if (!users || users.length === 0) return [];

    const blockedIds = companyData?.blockedIds || [];

    return users
      // 1. Same Filter as Employees Page: Only active members
      .filter(u => !blockedIds.includes(u.id))
      // 2. Same Data Mapping
      .map(user => ({
        name: user.name || "Usuario",
        lastName: user.lastName || "",
        km: user.kmTravelled || 0,
        trips: (user.passengerTravels || 0) + (user.driverTravels || 0),
      }))
      // 3. Same Sort: By KM traveled (The "Impact" metric)
      .sort((a, b) => b.km - a.km)
      .slice(0, 3)
      .map((user, index) => ({
        ...user,
        color: index === 0 ? "text-yellow-500" : index === 1 ? "text-slate-400" : "text-amber-700"
      }));
  }, [users, companyData]);

  if (champions.length === 0) return null;

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-50 rounded-xl">
            <Trophy className="text-yellow-600" size={20} />
          </div>
          <h4 className="font-black text-[#2a2c38] text-base tracking-tight">Top Carpoolers</h4>
        </div>
        <span className="text-[10px] font-black bg-gray-50 px-3 py-1.5 rounded-full text-gray-400 uppercase tracking-widest border border-gray-100">
          Global
        </span>
      </div>

      <div className="space-y-1 flex-1">
        {champions.map((person, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-3xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-2xl bg-white shadow-sm border border-gray-50 ${person.color}`}>
                <Medal size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-[#2a2c38]">
                  {person.name} {person.lastName.split(' ')[0]}
                </p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                  {person.trips} viajes realizados
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-[#9dd187]">
                <Car size={14} />
                <p className="text-md font-black text-[#2a2c38]">{person.km.toLocaleString()}</p>
              </div>
              <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">km</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 p-5 rounded-4xl bg-[#2a2c38] text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#9dd187] rounded-xl shadow-lg shadow-[#9dd187]/20">
            <TrendingUp className="text-[#2a2c38]" size={14} />
          </div>
          <p className="text-[11px] font-medium leading-tight">
            <span className="font-black text-[#9dd187] uppercase tracking-wider block mb-0.5">MVP del mes</span>
            {champions[0].name} lidera con {champions[0].km.toFixed(2)}km compartidos.
          </p>
        </div>
      </div>
    </div>
  );
}