import {
  Edit3,
  UserCheck,
  UserMinus,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const ITEMS_PER_PAGE = 8;

export function EmployeeTable({
  employees,
  currentPage,
  setCurrentPage,
  onEdit,
  onAction,
  onSelect,
}: any) {
  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
  const paginatedData = employees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
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
            {paginatedData.map((emp: any) => (
              <tr
                key={emp.id}
                className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                onClick={() => onSelect(emp)}
              >
                <td className="px-10 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 overflow-hidden relative border border-gray-50">
                      {emp.profilePicture ? (
                        <Image src={emp.profilePicture} fill className="object-cover" alt="" />
                      ) : (
                        emp.name ? emp.name[0] : "?"
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-[#2a2c38] text-sm leading-none mb-1">
                        {emp.name} {emp.lastName}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                        ID: {emp.id.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                </td>
                
                <td className="px-10 py-5">
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-300 uppercase">Km</span>
                      <span className="text-xs font-bold text-[#2a2c38]">{emp.kmTravelled ? Number(emp.kmTravelled).toFixed(2) : 0}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-300 uppercase">Viajes</span>
                      <span className="text-xs font-bold text-[#2a2c38]">{emp.totalTrips || 0}</span>
                    </div>
                  </div>
                </td>

                <td className="px-10 py-5">
                  {/* Changed from isBlocked to status for consistency */}
                  {emp.status === 'blocked' ? (
                    <span className="flex items-center gap-1.5 text-red-500 text-[9px] font-black uppercase bg-red-50 px-2 py-1 rounded-md w-fit">
                      <ShieldAlert size={10} /> Bloqueado
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[#9dd187] text-[9px] font-black uppercase bg-[#9dd187]/10 px-2 py-1 rounded-md w-fit">
                      <ShieldCheck size={10} /> Activo
                    </span>
                  )}
                </td>

                <td className="px-10 py-5 text-right">
                  <div className="flex justify-end items-center gap-1 bg-gray-50 p-1 rounded-2xl w-fit ml-auto opacity-0 group-hover:opacity-100 transition-all border border-gray-100 shadow-sm">
                    <button
                      onClick={(e) => { e.stopPropagation(); onEdit(emp); }}
                      className="p-2 text-gray-400 hover:text-[#2a2c38] hover:bg-white rounded-xl transition-all"
                      title="Editar Perfil"
                    >
                      <Edit3 size={15} />
                    </button>

                    {/* THIS IS WHERE YOUR NEW UNBLOCK BUTTON GOES */}
                    {emp.status === 'blocked' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAction({ type: "unblock", emp });
                        }}
                        className="p-2 text-green-500 hover:bg-white rounded-xl transition-all flex items-center gap-2 pr-3"
                        title="Restaurar Acceso"
                      >
                        <UserCheck size={15} />
                        <span className="text-[10px] font-black uppercase">Restaurar</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); onAction({ type: "block", emp }); }}
                          className="p-2 text-orange-400 hover:bg-white rounded-xl transition-all"
                          title="Bloquear Usuario"
                        >
                          <UserMinus size={15} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onAction({ type: "remove", emp }); }}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-white rounded-xl transition-all"
                          title="Eliminar del Equipo"
                        >
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

      {/* PAGINATION */}
      <div className="px-10 py-4 bg-[#fcfdfe] border-t border-gray-50 flex items-center justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {employees.length} Colaboradores
        </p>
        <div className="flex items-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p: number) => p - 1)}
            className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 disabled:opacity-30 transition-all hover:border-[#9dd187]/30"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-black text-[#2a2c38]">
            Página {currentPage} de {totalPages || 1}
          </span>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p: number) => p + 1)}
            className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 disabled:opacity-30 transition-all hover:border-[#9dd187]/30"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}