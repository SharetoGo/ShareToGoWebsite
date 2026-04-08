"use client";

import { useState, useMemo } from "react";
import { useDashboard } from "../providers/DashboardContext";
import { useAuth } from "@/app/intranet-empresas/providers/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { Search, Loader2 } from "lucide-react";

import { Leaderboard } from "@/components/dashboard/employees/leaderboard";
import { EmployeeTable } from "@/components/dashboard/employees/employees-table";
import { ActionModals } from "@/components/dashboard/employees/action-modals";
import { EmployeeDetailsModal } from "@/components/dashboard/views/employee-details-modal";

export default function EmployeesPage() {
  const { companyData } = useAuth();
  const { users, travels, loading, selectedMonth } = useDashboard();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"active" | "blocked">("active");
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: "block" | "unblock" | "remove";
    emp: any;
  } | null>(null);

  // --- CLEAN DATA PROCESSING ---
  const activeEmployees = useMemo(() => {
    const ids = companyData?.membersIds || [];
    const isGlobal = selectedMonth === "all";
    
    // Safety check: ensure travels is an array
    const safeTravels = travels || [];

    return ids
      .map((id) => {
        const fullData = users.find((u) => u.id === id);
        
        let finalTrips = 0;
        let finalKm = 0;

        if (isGlobal && fullData) {
          // 1. If Global: Use the lifetime totals saved in the User document
          finalTrips = (fullData.passengerTravels || 0) + (fullData.driverTravels || 0);
          finalKm = fullData.kmTravelled || 0;
        } else {
          // 2. If Monthly: Calculate dynamically from the 'travels' array of that month
          const userTravels = safeTravels.filter(t => 
            t.userId === id || (t.reservedBy && t.reservedBy.includes(id))
          );
          finalTrips = userTravels.length;
          finalKm = userTravels.reduce((acc, t) => acc + (t.distance || 0), 0);
        }

        return fullData
          ? { 
              ...fullData, 
              status: "active",
              trips: finalTrips,
              kmTravelled: finalKm
            }
          : {
              id,
              name: "Cargando...",
              lastName: "",
              status: "active",
              kmTravelled: 0,
              trips: 0,
            };
      })
      .sort((a, b) => (b.kmTravelled || 0) - (a.kmTravelled || 0));
  }, [users, travels, companyData?.membersIds, selectedMonth]);

  const blockedEmployees = useMemo(() => {
    const ids = companyData?.blockedIds || [];
    return ids.map((id) => {
      const fullData = users.find((u) => u.id === id);

      return fullData
        ? {
            ...fullData,
            status: "blocked",
          }
        : {
            id,
            name: "Usuario Bloqueado",
            lastName: `(${id.slice(0, 5)})`,
            status: "blocked",
            kmTravelled: 0,
            trips: 0,
          };
    });
  }, [users, companyData?.blockedIds]);

  const currentList =
    viewMode === "active" ? activeEmployees : blockedEmployees;

  const filteredEmployees = useMemo(() => {
    return currentList
      .filter((emp) =>
        `${emp.name} ${emp.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => (b.kmTravelled || 0) - (a.kmTravelled || 0));
  }, [currentList, searchTerm]);

  // --- DATABASE ACTIONS (Keep as is) ---
  const handleExecuteAction = async () => {
    if (!pendingAction || !companyData?.id) return;
    setIsActionLoading(true);

    try {
      const companyRef = doc(db, "companies", companyData.id);
      const userRef = doc(db, "users", pendingAction.emp.id);
      const uid = pendingAction.emp.id;
      const cid = companyData.id;

      if (pendingAction.type === "block") {
        await updateDoc(companyRef, {
          membersIds: arrayRemove(uid),
          blockedIds: arrayUnion(uid),
        });
        await updateDoc(userRef, {
          blockedFrom: arrayUnion(cid),
        });
      } else if (pendingAction.type === "unblock") {
        await updateDoc(companyRef, {
          blockedIds: arrayRemove(uid),
        });
        await updateDoc(userRef, {
          blockedFrom: arrayRemove(cid),
        });
      } else if (pendingAction.type === "remove") {
        await updateDoc(companyRef, {
          membersIds: arrayRemove(uid),
          blockedIds: arrayRemove(uid),
        });
        await updateDoc(userRef, {
          blockedFrom: arrayRemove(cid),
        });
      }
      setPendingAction(null);
    } catch (e) {
      console.error("Critical update error:", e);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUpdateUser = async (updatedData: {
    name: string;
    lastName: string;
  }) => {
    if (!editingEmployee) return;
    setIsActionLoading(true);
    try {
      await updateDoc(doc(db, "users", editingEmployee.id), updatedData);
      setEditingEmployee(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsActionLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-[#9dd187]" />
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#2a2c38]">Tu Equipo</h1>
          <p className="text-gray-500 font-medium italic">
            Mostrando datos {selectedMonth === "all" ? "Históricos Globales" : "del mes seleccionado"}.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => { setViewMode("active"); setCurrentPage(1); }}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === "active" ? "bg-[#2a2c38] text-[#9dd187]" : "text-gray-400"}`}
          >
            Activos ({activeEmployees.length})
          </button>
          <button
            onClick={() => { setViewMode("blocked"); setCurrentPage(1); }}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === "blocked" ? "bg-red-500 text-white" : "text-gray-400"}`}
          >
            Bloqueados ({blockedEmployees.length})
          </button>
        </div>
      </div>

      {viewMode === "active" && (
        <Leaderboard
          employees={activeEmployees.slice(0, 3)}
          onSelect={setSelectedEmployee}
        />
      )}

      <div className="relative w-full">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
        <input
          type="text"
          placeholder={`Buscar en ${viewMode === "active" ? "miembros activos" : "bloqueados"}...`}
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="w-full pl-16 pr-6 py-4 bg-white border border-transparent rounded-4xl shadow-xl shadow-[#2a2c38]/5 focus:ring-2 focus:ring-[#9dd187] outline-none transition-all font-medium"
        />
      </div>

      <EmployeeTable
        employees={filteredEmployees}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onEdit={setEditingEmployee}
        onAction={setPendingAction}
        onSelect={setSelectedEmployee}
        viewMode={viewMode}
      />

      <ActionModals
        pendingAction={pendingAction}
        setPendingAction={setPendingAction}
        editingEmployee={editingEmployee}
        setEditingEmployee={setEditingEmployee}
        isActionLoading={isActionLoading}
        onConfirmAction={handleExecuteAction}
        onConfirmUpdate={handleUpdateUser}
      />

      {selectedEmployee && !editingEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}