// components/dashboard/charts/user-role-stats.tsx
"use client";

import { useEffect, useState } from "react";
import { Users, Car, UserCheck } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, documentId } from "firebase/firestore";

interface UserRoleStatsProps {
  companyName: string;
  totalMembers: number;
  travelIds: string[];
}

interface RoleStats {
  drivers: number;
  passengers: number;
  driversPercentage: number;
  passengersPercentage: number;
  loading: boolean;
}

export function UserRoleStats({ companyName, totalMembers, travelIds }: UserRoleStatsProps) {
  const [stats, setStats] = useState<RoleStats>({
    drivers: 0,
    passengers: 0,
    driversPercentage: 0,
    passengersPercentage: 0,
    loading: true,
  });

  useEffect(() => {
    // Si no hay datos suficientes para buscar, salir inmediatamente
    if (!companyName || totalMembers === 0 || !travelIds || travelIds.length === 0) {
      setStats((prev) => ({ ...prev, loading: false }));
      return;
    }

    const fetchUserRoleStats = async () => {
      try {
        setStats((prev) => ({ ...prev, loading: true }));

        const driverIds = new Set<string>();
        const passengerIds = new Set<string>();

        // Procesar en batches de 30 (límite de Firestore para "in" queries)
        for (let i = 0; i < travelIds.length; i += 30) {
          const batch = travelIds.slice(i, i + 30);

          const travelsRef = collection(db, "travels");
          const travelsQuery = query(travelsRef, where(documentId(), "in", batch));
          const travelsSnapshot = await getDocs(travelsQuery);

          travelsSnapshot.forEach((travelDoc) => {
            const travelData = travelDoc.data();

            // Conductor
            if (travelData.userId) {
              driverIds.add(travelData.userId);
            }

            // Pasajeros
            if (travelData.reservedBy && Array.isArray(travelData.reservedBy)) {
              travelData.reservedBy.forEach((userId: string) => {
                passengerIds.add(userId);
              });
            }
          });
        }

        const companyDrivers = driverIds.size;
        const companyPassengers = passengerIds.size;

        const driversPercentage =
          totalMembers > 0 ? Math.round((companyDrivers / totalMembers) * 100) : 0;
        const passengersPercentage =
          totalMembers > 0 ? Math.round((companyPassengers / totalMembers) * 100) : 0;

        setStats({
          drivers: companyDrivers,
          passengers: companyPassengers,
          driversPercentage,
          passengersPercentage,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching user role stats:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchUserRoleStats();
  }, [companyName, totalMembers, travelIds]);

  // Carga
  if (stats.loading) {
    return (
      <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9CD186]"></div>
        </div>
      </div>
    );
  }

  // Sin datos
  if (!companyName || totalMembers === 0 || (stats.drivers === 0 && stats.passengers === 0)) {
    return (
      <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-[#9CD186]" />
          <h3 className="text-lg font-semibold text-[#2a2c38]">Participación de Usuarios</h3>
        </div>

        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <div className="p-4 bg-gray-50 rounded-2xl">
            <Users className="w-10 h-10 text-gray-300" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-400">Sin datos de participación</p>
            <p className="text-xs text-gray-300 mt-1 max-w-xs mx-auto">
              Los datos aparecerán una vez que los empleados publiquen o reserven trayectos.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Datos disponibles
  return (
    <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-[#9CD186]" />
        <h3 className="text-lg font-semibold text-[#2a2c38]">Participación de Usuarios</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CONDUCTORES */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#9dd187]/20 rounded-xl">
                <Car className="w-6 h-6 text-[#2a2c38]" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Conductores</p>
                <p className="text-2xl font-bold text-[#2a2c38]">{stats.drivers}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#9CD186]">{stats.driversPercentage}%</p>
              <p className="text-xs text-gray-400">del total</p>
            </div>
          </div>

          <div className="relative">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#9CD186] to-[#7AB86A] rounded-full transition-all duration-500"
                style={{ width: `${stats.driversPercentage}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-gray-500">
            {stats.drivers} de {totalMembers} usuarios han publicado trayectos
          </p>
        </div>

        {/* PASAJEROS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#9dd187]/20 rounded-xl">
                <UserCheck className="w-6 h-6 text-[#2a2c38]" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Pasajeros</p>
                <p className="text-2xl font-bold text-[#2a2c38]">{stats.passengers}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#9CD186]">{stats.passengersPercentage}%</p>
              <p className="text-xs text-gray-400">del total</p>
            </div>
          </div>

          <div className="relative">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#9CD186] to-[#7AB86A] rounded-full transition-all duration-500"
                style={{ width: `${stats.passengersPercentage}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-gray-500">
            {stats.passengers} de {totalMembers} usuarios han reservado trayectos
          </p>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-6 p-4 bg-gradient-to-br from-[#E8F5E0] to-[#F0F8EC] rounded-xl border border-[#9CD186]/20">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg mt-0.5">
            <Users className="w-4 h-4 text-[#5A9642]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#2a2c38] mb-1">Tasa de Participación Total</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              {Math.round(((stats.drivers + stats.passengers) / totalMembers) * 100)}% de tus
              empleados están participando activamente en el programa de carpooling.
              {stats.drivers > stats.passengers ? (
                <span className="text-[#5A9642] font-medium">
                  {" "}
                  Hay más conductores que pasajeros, ¡excelente!
                </span>
              ) : (
                <span className="text-[#5A9642] font-medium">
                  {" "}
                  Considera incentivar a más empleados a ofrecer plazas.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
