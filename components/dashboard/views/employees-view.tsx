// components/dashboard/views/employees-view.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import {
  Search,
  MoreVertical,
  Award,
  Users,
  Leaf,
  Car,
  Trash2,
  Edit3,
  X,
  Save,
} from "lucide-react";
import { EmployeeDetailsModal } from "./employee-details-modal";
import Image from "next/image";

interface Employee {
  id: string;
  name: string;
  lastName: string;
  profilePicture?: string;
  passengerTravel: number;
  kmTraveled: number;
  totalTrips?: number;
}

export function EmployeesView() {
  const { companyData } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  // Edit State
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showMenuId, setShowMenuId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmployees() {
      if (!companyData?.membersIds || companyData.membersIds.length === 0) {
        setEmployees([]);
        setLoading(false);
        return;
      }

      try {
        const ids = companyData.membersIds;
        const fetchedEmployees: Employee[] = [];

        for (let i = 0; i < ids.length; i += 30) {
          const chunk = ids.slice(i, i + 30);
          const q = query(collection(db, "users"), where(documentId(), "in", chunk));
          const snapshot = await getDocs(q);

          snapshot.forEach((doc) => {
            const data = doc.data();
            fetchedEmployees.push({
              ...data,
              id: doc.id,
              name: data.name || "Usuario",
              lastName: data.lastName || "",
              profilePicture: data.profilePicture,
              passengerTravel: data.passengerTravels || 0,
              kmTraveled: data.kmTravelled || 0,
              totalTrips: (data.passengerTravels || 0) + (data.driverTravels || 0),
            });
          });
        }

        // Sort by kmTraveled for the KM-based leaderboard
        setEmployees(fetchedEmployees.sort((a, b) => b.kmTraveled - a.kmTraveled));
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
  }, [companyData?.membersIds]);

  const filteredEmployees = useMemo(
    () =>
      employees.filter((emp) =>
        `${emp.name} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [employees, searchTerm],
  );

  // --- CRUD ACTIONS ---

  const handleUpdate = async () => {
    if (!editingEmployee) return;
    setIsUpdating(true);
    try {
      const userRef = doc(db, "users", editingEmployee.id);
      await updateDoc(userRef, {
        name: editingEmployee.name,
        lastName: editingEmployee.lastName,
      });

      setEmployees((prev) => prev.map((e) => (e.id === editingEmployee.id ? editingEmployee : e)));
      setEditingEmployee(null);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (empId: string) => {
    if (
      !companyData?.id ||
      !confirm("¿Estás seguro de que deseas eliminar a este empleado de la empresa?")
    )
      return;

    try {
      const companyRef = doc(db, "companies", companyData.id);
      await updateDoc(companyRef, {
        membersIds: arrayRemove(empId),
      });
      // Filter out locally
      setEmployees((prev) => prev.filter((e) => e.id !== empId));
      setShowMenuId(null);
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center animate-pulse text-gray-400 font-bold uppercase tracking-widest">
        Cargando equipo...
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2a2c38]">Tu Equipo</h1>
          <p className="text-gray-500 font-medium italic">
            Gestiona el impacto de tus colaboradores.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-[#9dd187] outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 2. Leaderboard Highlights (Top 3 by KM) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {employees.slice(0, 3).map((emp, i) => (
          <div
            key={emp.id}
            className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex items-center gap-5 relative overflow-hidden group hover:border-[#9dd187] transition-all"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 hover:text-[#9dd187] transition-colors">
              <Award size={64} />
            </div>
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 relative border-2 border-[#9dd187]/20">
                {emp.profilePicture ? (
                  <Image src={emp.profilePicture} alt={emp.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#2a2c38] font-bold text-xl uppercase">
                    {emp.name[0]}
                  </div>
                )}
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#2a2c38] text-[#9dd187] rounded-full flex items-center justify-center text-xs font-black shadow-lg">
                {i + 1}
              </div>
            </div>
            <div>
              <p className="font-bold text-[#2a2c38] text-lg leading-tight">
                {emp.name} {emp.lastName}
              </p>
              <p className="text-[10px] text-[#9dd187] font-black uppercase tracking-widest mt-1">
                {emp.kmTraveled.toLocaleString()} Km Ahorrados
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-visible">
        <div className="overflow-x-auto overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fcfdfe] text-gray-400 text-[10px] uppercase font-black tracking-[0.15em]">
              <tr>
                <th className="px-8 py-6">Colaborador</th>
                <th className="px-8 py-6">Trayectos Totales</th>
                <th className="px-8 py-6">Km Recorridos</th>
                <th className="px-8 py-6">Impacto</th>
                <th className="px-8 py-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  onClick={() => setSelectedEmployee(emp)}
                  className="hover:bg-gray-50/50 transition-colors group relative"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center text-[10px] font-bold text-gray-400 overflow-hidden uppercase">
                        {emp.profilePicture ? (
                          <Image
                            src={emp.profilePicture}
                            alt=""
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          emp.name[0]
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-[#2a2c38]">
                          {emp.name} {emp.lastName}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">
                          ID: {emp.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-[#9dd187]" />
                      {emp.totalTrips}
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-gray-600">
                    <div className="flex items-center gap-2">
                      <Car size={14} className="text-[#9dd187]" />
                      {emp.kmTraveled.toLocaleString()} km
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                        emp.kmTraveled > 100
                          ? "bg-[#9dd187]/10 text-[#2a2c38]"
                          : "bg-gray-50 text-gray-300"
                      }`}
                    >
                      {emp.kmTraveled > 100 ? "Alto Impacto" : "Activo"}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right relative overflow-visible">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingEmployee(emp)}
                        className="p-2 text-gray-300 hover:text-[#2a2c38] hover:bg-white rounded-xl transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-[#2a2c38]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-[#2a2c38] text-xl">Editar Información</h3>
              <button
                onClick={() => setEditingEmployee(null)}
                className="text-gray-300 hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={editingEmployee.name}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                  className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#9dd187] outline-none font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Apellidos
                </label>
                <input
                  type="text"
                  value={editingEmployee.lastName}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, lastName: e.target.value })
                  }
                  className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#9dd187] outline-none font-medium"
                />
              </div>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="w-full bg-[#2a2c38] text-[#9dd187] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-black/20"
              >
                {isUpdating ? (
                  "Guardando..."
                ) : (
                  <>
                    <Save size={18} /> Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DETAILS MODAL --- */}
      {selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}
