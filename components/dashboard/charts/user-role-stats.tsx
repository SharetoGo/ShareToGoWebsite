// components/dashboard/charts/user-role-stats.tsx
"use client";

import { useMemo } from "react";
import { Users, Car, UserCheck, Info, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UserRoleStatsProps {
  companyName: string;
  totalMembers: number;
  travels: any[];
  users: any[];
}

export function UserRoleStats({ totalMembers, travels }: UserRoleStatsProps) {
  const stats = useMemo(() => {
    // If we have no travels, everything is 0
    if (!travels || travels.length === 0) return { d: 0, p: 0, dP: 0, pP: 0 };

    // Unique Drivers: Count unique UserIDs who created a travel this month
    const drivers = new Set(travels.map(t => t.userId)).size;

    // Unique Passengers: Flatten all 'reservedBy' arrays and count unique UIDs
    const passengers = new Set(
        travels.flatMap(t => t.reservedBy || [])
    ).size;

    return {
      d: drivers,
      p: passengers,
      // Participation rate = (Active People / Total Employees) * 100
      dP: totalMembers > 0 ? Math.round((drivers / totalMembers) * 100) : 0,
      pP: totalMembers > 0 ? Math.round((passengers / totalMembers) * 100) : 0,
    };
  }, [travels, totalMembers]);

  // Optional: Add a subtle placeholder if data is empty
  const hasData = travels && travels.length > 0;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 px-8">
      {!hasData && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
           <p className="text-sm text-gray-400 italic">No hay actividad registrada en este periodo</p>
        </div>
      )}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-900 rounded-2xl">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#2a2c38]">Participación</h3>
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Distribución de roles este mes</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl font-black text-[#9CD186]">{Math.min(100, stats.dP + stats.pP)}%</span>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Total Activos</p>
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
          description="han ofrecido su coche"
        />

        {/* PASAJEROS */}
        <RoleCard 
          label="Pasajeros" 
          count={stats.p} 
          total={totalMembers} 
          percent={stats.pP} 
          icon={UserCheck} 
          color="bg-[#9dd187]" 
          description="han reservado plazas"
        />
      </div>

      {/* FOOTER INSIGHT */}
      <div className="mt-12 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4">
        <div className="p-2 bg-white rounded-xl shadow-sm">
          <TrendingUp className="w-4 h-4 text-[#5A9642]" />
        </div>
        <p className="text-xs text-gray-600 font-medium leading-relaxed">
          <span className="font-bold text-[#2a2c38]">Análisis:</span> 
          {stats.d >= stats.p 
            ? " Tienes una base sólida de conductores. El ratio de oferta es saludable." 
            : " Hay alta demanda de plazas. Considera incentivar a más conductores."}
        </p>
      </div>
    </div>
  );
}

function RoleCard({ label, count, total, percent, icon: Icon, color, description }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 ${color}/10 rounded-xl`}>
            <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#2a2c38]">{label}</p>
            <p className="text-xs text-gray-400 font-medium">{count} usuarios</p>
          </div>
        </div>
        <p className="text-2xl font-black text-[#2a2c38]">{percent}%</p>
      </div>
      <Progress value={percent} className={`h-2 bg-gray-100 ${color}`} />
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        {count} de {total} empleados {description}
      </p>
    </div>
  );
}