"use client";

import { useState, useMemo } from "react";
import { useDashboard } from "@/app/intranet-empresas/dashboard/DashboardContext";
import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import {
  Search, Award, Edit3, X, Loader2, Trash2,
  ShieldAlert, ShieldCheck, ChevronLeft, ChevronRight, UserMinus, UserCheck, Save
} from "lucide-react";
import { EmployeeDetailsModal } from "@/components/dashboard/views/employee-details-modal";
import Image from "next/image";

// Configuration
const ITEMS_PER_PAGE = 8;

export default function EmployeesPage() {
  const { companyData } = useAuth();
  const { users, loading } = useDashboard();

  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"active" | "blocked">("active");
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  // Confirmation Modal State
  const [pendingAction, setPendingAction] = useState<{
    type: 'block' | 'unblock' | 'remove';
    emp: any;
  } | null>(null);

  // --- DATA PROCESSING ---
  const allProcessedEmployees = useMemo(() => {
    return users.map((user) => ({
      ...user,
      name: user.name || "Usuario",
      lastName: user.lastName || "",
      kmTravelled: user.kmTravelled || 0,
      totalTrips: (user.passengerTravels || 0) + (user.driverTravels || 0),
      isBlocked: companyData?.blockedIds?.includes(user.id) || false
    })).sort((a, b) => b.kmTravelled - a.kmTravelled);
  }, [users, companyData?.blockedIds]);

  // Top 3 for the Leaderboard
  const topThree = useMemo(() => {
    return allProcessedEmployees.filter(e => !e.isBlocked).slice(0, 3);
  }, [allProcessedEmployees]);

  // Filtered list based on search and current tab (Active/Blocked)
  const filteredEmployees = useMemo(() => {
    return allProcessedEmployees.filter((emp) => {
      const matchesSearch = `${emp.name} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesView = viewMode === "blocked" ? emp.isBlocked : !emp.isBlocked;
      return matchesSearch && matchesView;
    });
  }, [allProcessedEmployees, searchTerm, viewMode]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // --- HANDLERS ---
  const executeAction = async () => {
    if (!pendingAction || !companyData?.id) return;
    setIsActionLoading(true);
    
    try {
      const companyRef = doc(db, "companies", companyData.id);
      const uid = pendingAction.emp.id;

      if (pendingAction.type === 'block') {
        // Bloquear: Quitar de miembros Y añadir a bloqueados
        await updateDoc(companyRef, {
          membersIds: arrayRemove(uid),
          blockedIds: arrayUnion(uid)
        });
      } else if (pendingAction.type === 'remove') {
        // Suprimir: Solo quitar de miembros
        await updateDoc(companyRef, {
          membersIds: arrayRemove(uid)
        });
      } else if (pendingAction.type === 'unblock') {
        // Desbloquear: Quitar de bloqueados Y añadir a miembros
        await updateDoc(companyRef, {
          blockedIds: arrayRemove(uid),
          membersIds: arrayUnion(uid)
        });
      }
      setPendingAction(null);
    } catch (error) {
      console.error("Error executing action:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingEmployee) return;
    setIsActionLoading(true);
    try {
      const userRef = doc(db, "users", editingEmployee.id);
      await updateDoc(userRef, {
        name: editingEmployee.name,
        lastName: editingEmployee.lastName,
      });
      setEditingEmployee(null);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-[#9dd187]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#2a2c38]">Tu Equipo</h1>
          <p className="text-gray-500 font-medium italic">Gestiona el impacto y los accesos de tu empresa.</p>
        </div>

        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
          <button 
            onClick={() => { setViewMode("active"); setCurrentPage(1); }} 
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === "active" ? "bg-[#2a2c38] text-[#9dd187]" : "text-gray-400 hover:text-[#2a2c38]"}`}
          >
            Activos
          </button>
          <button 
            onClick={() => { setViewMode("blocked"); setCurrentPage(1); }} 
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === "blocked" ? "bg-red-500 text-white" : "text-gray-400 hover:text-red-500"}`}
          >
            Bloqueados
          </button>
        </div>
      </div>

      {/* 2. TOP 3 HIGHLIGHTS (Active View Only) */}
      {viewMode === "active" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topThree.map((emp, i) => (
            <div 
              key={emp.id} 
              onClick={() => setSelectedEmployee(emp)}
              className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-5 relative overflow-hidden group hover:border-[#9dd187] transition-all cursor-pointer"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 text-[#2a2c38] group-hover:text-[#9dd187] transition-colors">
                <Award size={64} />
              </div>
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 relative border-2 border-[#9dd187]/20">
                  {emp.profilePicture ? (
                    <Image src={emp.profilePicture} alt={emp.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#2a2c38] font-black text-xl uppercase">{emp.name[0]}</div>
                  )}
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#2a2c38] text-[#9dd187] rounded-full flex items-center justify-center text-[10px] font-black shadow-lg">
                  {i + 1}
                </div>
              </div>
              <div>
                <p className="font-black text-[#2a2c38] text-lg leading-tight">{emp.name} {emp.lastName.split(' ')[0]}</p>
                <p className="text-[10px] text-[#9dd187] font-black uppercase tracking-widest mt-1">
                  {emp.kmTravelled.toLocaleString()} Km Totales
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. SEARCH BAR */}
      <div className="relative w-full">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
        <input 
          type="text" 
          placeholder="Buscar por nombre o apellido..." 
          value={searchTerm} 
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
          className="w-full pl-16 pr-6 py-4 bg-white border border-transparent rounded-[2rem] shadow-xl shadow-[#2a2c38]/5 focus:ring-2 focus:ring-[#9dd187] outline-none transition-all font-medium" 
        />
      </div>

      {/* 4. MAIN TABLE */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fcfdfe] text-gray-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-50">
              <tr>
                <th className="px-10 py-6">Colaborador</th>
                <th className="px-10 py-6">Impacto</th>
                <th className="px-10 py-6">Estado</th>
                <th className="px-10 py-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedEmployee(emp)}>
                  <td className="px-10 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 overflow-hidden relative">
                        {emp.profilePicture ? <Image src={emp.profilePicture} fill className="object-cover" alt="" /> : emp.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-[#2a2c38] text-sm leading-none mb-1">{emp.name} {emp.lastName}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: {emp.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-5">
                    <div className="flex items-center gap-5">
                      <div className="flex flex-col"><span className="text-[9px] font-black text-gray-300 uppercase">Km</span><span className="text-xs font-bold text-[#2a2c38]">{emp.kmTravelled}</span></div>
                      <div className="flex flex-col"><span className="text-[9px] font-black text-gray-300 uppercase">Viajes</span><span className="text-xs font-bold text-[#2a2c38]">{emp.totalTrips || 0}</span></div>
                    </div>
                  </td>
                  <td className="px-10 py-5">
                    {emp.isBlocked ? (
                      <span className="flex items-center gap-1.5 text-red-500 text-[9px] font-black uppercase bg-red-50 px-2 py-1 rounded-md w-fit"><ShieldAlert size={10} /> Bloqueado</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[#9dd187] text-[9px] font-black uppercase bg-[#9dd187]/10 px-2 py-1 rounded-md w-fit"><ShieldCheck size={10} /> Activo</span>
                    )}
                  </td>
                  <td className="px-10 py-5 text-right">
                    {/* ACTION GROUP PILL */}
                    <div className="flex justify-end items-center gap-1 bg-gray-50 p-1 rounded-2xl w-fit ml-auto opacity-0 group-hover:opacity-100 transition-all border border-gray-100">
                      <button onClick={(e) => { e.stopPropagation(); setEditingEmployee(emp); }} className="p-2 text-gray-400 hover:text-[#2a2c38] hover:bg-white rounded-xl transition-all" title="Editar">
                        <Edit3 size={15} />
                      </button>
                      
                      {emp.isBlocked ? (
                        <button onClick={(e) => { e.stopPropagation(); setPendingAction({ type: 'unblock', emp }); }} className="p-2 text-green-500 hover:bg-white rounded-xl transition-all" title="Desbloquear">
                          <UserCheck size={15} />
                        </button>
                      ) : (
                        <>
                          <button onClick={(e) => { e.stopPropagation(); setPendingAction({ type: 'block', emp }); }} className="p-2 text-orange-400 hover:bg-white rounded-xl transition-all" title="Bloquear">
                            <UserMinus size={15} />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setPendingAction({ type: 'remove', emp }); }} className="p-2 text-red-400 hover:text-red-600 hover:bg-white rounded-xl transition-all" title="Eliminar de empresa">
                            <Trash2 size={15} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* 5. PAGINATION BAR */}
        <div className="px-10 py-4 bg-[#fcfdfe] border-t border-gray-50 flex items-center justify-between">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {filteredEmployees.length} Colaboradores encontrados
          </p>
          <div className="flex items-center gap-4">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 disabled:opacity-30 hover:shadow-sm transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-black text-[#2a2c38] uppercase tracking-tighter">Página {currentPage} de {totalPages || 1}</span>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 disabled:opacity-30 hover:shadow-sm transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      {pendingAction && (
        <div className="fixed inset-0 bg-[#2a2c38]/80 backdrop-blur-md z-[110] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 
              ${pendingAction.type === 'block' ? 'bg-orange-100 text-orange-500' : 
                pendingAction.type === 'remove' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>
              {pendingAction.type === 'block' ? <ShieldAlert size={30} /> : 
               pendingAction.type === 'remove' ? <Trash2 size={30} /> : <UserCheck size={30} />}
            </div>
            
            <h3 className="text-2xl font-black text-[#2a2c38] mb-2 uppercase tracking-tighter">
              {pendingAction.type === 'block' ? 'Bloquear Acceso' : 
               pendingAction.type === 'remove' ? 'Eliminar del equipo' : 'Restaurar Acceso'}
            </h3>
            
            <p className="text-gray-500 text-sm mb-10 leading-relaxed">
              ¿Estás seguro de que deseas {pendingAction.type === 'block' ? 'bloquear permanentemente' : 
               pendingAction.type === 'remove' ? 'eliminar del equipo' : 'restaurar'} a <br/>
              <span className="font-black text-[#2a2c38] text-base">{pendingAction.emp.name} {pendingAction.emp.lastName}</span>?
            </p>

            <div className="flex gap-3">
              <button onClick={() => setPendingAction(null)} className="flex-1 py-4 rounded-2xl border border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all">Cancelar</button>
              <button onClick={executeAction} disabled={isActionLoading} className={`flex-1 py-4 rounded-2xl font-black text-white shadow-lg transition-all 
                ${pendingAction.type === 'unblock' ? 'bg-[#9dd187] hover:bg-[#8bc475]' : 'bg-[#2a2c38] hover:bg-black'}`}>
                {isActionLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT MODAL --- */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-[#2a2c38]/80 backdrop-blur-md z-[110] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-2xl font-black text-[#2a2c38]">Editar Perfil</h3>
              <button onClick={() => setEditingEmployee(null)} className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"><X /></button>
            </div>
            <div className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nombre</label>
                <input type="text" value={editingEmployee.name} onChange={e => setEditingEmployee({ ...editingEmployee, name: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#9dd187] outline-none font-bold text-[#2a2c38]" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Apellidos</label>
                <input type="text" value={editingEmployee.lastName} onChange={e => setEditingEmployee({ ...editingEmployee, lastName: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#9dd187] outline-none font-bold text-[#2a2c38]" />
              </div>
              <button onClick={handleUpdateUser} disabled={isActionLoading} className="w-full bg-[#2a2c38] text-[#9dd187] py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-[1.02] transition-all disabled:opacity-50">
                {isActionLoading ? <Loader2 className="animate-spin mx-auto" /> : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DETAILS MODAL --- */}
      {selectedEmployee && !editingEmployee && (
        <EmployeeDetailsModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      )}
    </div>
  );
}