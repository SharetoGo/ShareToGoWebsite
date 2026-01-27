// components/dashboard/widgets/top-carpoolers.tsx
'use client'

import { useState, useEffect } from "react";
import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, documentId } from "firebase/firestore";
import { Trophy, Medal, Car, Loader2 } from "lucide-react";

interface Champion {
  name: string;
  lastName: string;
  km: number;
  trips: number;
  color: string;
}

export function TopCarpoolers() {
  const { companyData } = useAuth();
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopCarpoolers() {
      if (!companyData?.membersIds || companyData.membersIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const ids = companyData.membersIds.slice(0, 30); // Firestore limit
        const q = query(collection(db, "users"), where(documentId(), "in", ids));
        const snapshot = await getDocs(q);
        
        const fetchedUsers = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            name: data.name || "Usuario",
            lastName: data.lastName || "",
            km: data.kmTravelled || 0,
            trips: (data.passengerTravels || 0) + (data.driverTravels || 0),
          };
        });

        // Sort by KM descending and take top 3
        const sorted = fetchedUsers
          .sort((a, b) => b.km - a.km)
          .slice(0, 3)
          .map((user, index) => ({
            ...user,
            color: index === 0 ? "text-yellow-500" : index === 1 ? "text-slate-400" : "text-amber-700"
          }));

        setChampions(sorted);
      } catch (error) {
        console.error("Error fetching top carpoolers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopCarpoolers();
  }, [companyData?.membersIds]);

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="text-[#9dd187]" size={20} />
          <h4 className="font-bold text-[#2a2c38]">Top Carpoolers</h4>
        </div>
        <span className="text-[10px] font-bold bg-gray-50 px-2 py-1 rounded-md text-gray-400 uppercase tracking-wider">Por Distancia</span>
      </div>

      <div className="space-y-4 flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="animate-spin text-gray-200" size={24} />
          </div>
        ) : champions.length > 0 ? (
          champions.map((person, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-gray-50 group-hover:bg-white transition-colors ${person.color}`}>
                  <Medal size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2a2c38] truncate max-w-[120px]">
                    {person.name} {person.lastName}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">{person.trips} viajes totales</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-[#9dd187]">
                   <Car size={12} />
                   <p className="text-xs font-bold">{person.km.toLocaleString()}</p>
                </div>
                <p className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">Kilómetros</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-xs text-gray-300 font-medium italic">No hay datos suficientes</p>
          </div>
        )}
      </div>
    </div>
  );
}