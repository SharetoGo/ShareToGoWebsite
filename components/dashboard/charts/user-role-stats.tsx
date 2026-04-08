// components/dashboard/charts/user-role-stats.tsx
"use client";

import { useMemo } from "react";
import { Users, Car, UserCheck, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UserRoleStatsProps {
  companyName: string;
  totalMembers: number;
  travels: any[];
  users: any[];
  isGlobal?: boolean;
}

export function UserRoleStats({ totalMembers, travels, users, isGlobal = false }: UserRoleStatsProps) {
  const stats = useMemo(() => {
    let activeDrivers = 0;
    let activePassengers = 0;

    if (isGlobal) {
      // --- GLOBAL LOGIC ---
      // Check the lifetime stats of each user object
      users.forEach(user => {
        if ((user.driverTravels || 0) > 0) activeDrivers++;
        if ((user.passengerTravels || 0) > 0) activePassengers++;
      });
    } else {
      // --- MONTHLY LOGIC ---
      // Calculate based only on the travels provided for the specific month
      if (travels && travels.length > 0) {
        activeDrivers = new Set(travels.map(t => t.userId)).size;
        activePassengers = new Set(
          travels.flatMap(t => t.reservedBy || [])
        ).size;
      }
    }

    return {
      d: activeDrivers,
      p: activePassengers,
      // Participation rate relative to total company members
      dP: totalMembers > 0 ? Math.round((activeDrivers / totalMembers) * 100) : 0,
      pP: totalMembers > 0 ? Math.round((activePassengers / totalMembers) * 100) : 0,
    };
  }, [travels, users, totalMembers, isGlobal]);

  // If we are in monthly mode and there are no travels, we show the placeholder
  const hasData = isGlobal ? users.length > 0 : travels && travels.length > 0;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 px-8 relative overflow-hidden h-full">
      {!hasData && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
           <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">No hay actividad registrada</p>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-900 rounded-2xl">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#2a2c38]">Participación</h3>
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
              {isGlobal ? "Distribución histórica" : "Distribución este mes"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl font-black text-[#9CD186]">{Math.min(100, stats.dP + stats.pP)}%</span>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Tasa de Adopción</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* CONDUCTORES */}
        <RoleCard 
          label="Conductores" 
          count={stats.d} 
          total={totalMembers} 
          percent={stats.dP} 
          icon={Car} 
          color="bg-[#9dd187]" 
          description={isGlobal ? "han conducido alguna vez" : "han ofrecido su coche"}
        />

        {/* PASAJEROS */}
        <RoleCard 
          label="Pasajeros" 
          count={stats.p} 
          total={totalMembers} 
          percent={stats.pP} 
          icon={UserCheck} 
          color="bg-[#9dd187]" 
          description={isGlobal ? "han viajado alguna vez" : "han reservado plazas"}
        />
      </div>

      {/* FOOTER INSIGHT */}
      <div className="mt-12 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4">
        <div className="p-2 bg-white rounded-xl shadow-sm">
          <TrendingUp className="w-4 h-4 text-[#5A9642]" />
        </div>
        <p className="text-xs text-gray-600 font-medium leading-relaxed">
          <span className="font-bold text-[#2a2c38]">Análisis:</span> 
          {isGlobal 
            ? ` Un total de ${stats.d + stats.p} empleados han probado SharetoGo hasta ahora.` 
            : stats.d >= stats.p 
              ? " Tienes una base sólida de conductores este mes. El ratio de oferta es saludable." 
              : " Hay alta demanda de plazas este mes. Considera incentivar a más conductores."}
        </p>
      </div>
    </div>
  );
}

function RoleCard({ label, count, total, percent, icon: Icon, color, description }: any) {
  // Use a safer way to apply the text color based on the bg color passed
  const textColor = "text-[#9dd187]"; 

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 bg-[#9dd187]/10 rounded-xl`}>
            <Icon className={`w-5 h-5 ${textColor}`} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#2a2c38]">{label}</p>
            <p className="text-xs text-gray-400 font-medium">{count} usuarios</p>
          </div>
        </div>
        <p className="text-2xl font-black text-[#2a2c38]">{percent}%</p>
      </div>
      <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-[#9dd187] transition-all duration-500" 
          style={{ width: `${Math.min(100, percent)}%` }}
        />
      </div>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        {count} de {total} empleados {description}
      </p>
    </div>
  );
}