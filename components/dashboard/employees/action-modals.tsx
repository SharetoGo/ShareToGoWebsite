import { ShieldAlert, Trash2, UserCheck, Loader2, X } from "lucide-react";

export function ActionModals({ pendingAction, setPendingAction, editingEmployee, setEditingEmployee, isActionLoading, onConfirmAction, onConfirmUpdate }: any) {
  return (
    <>
      {/* CONFIRMATION MODAL */}
      {pendingAction && (
        <div className="fixed inset-0 bg-[#2a2c38]/80 backdrop-blur-md z-[120] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 
              ${pendingAction.type === "block" ? "bg-orange-100 text-orange-500" : pendingAction.type === "remove" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"}`}>
              {pendingAction.type === "block" ? <ShieldAlert size={30} /> : pendingAction.type === "remove" ? <Trash2 size={30} /> : <UserCheck size={30} />}
            </div>
            <h3 className="text-2xl font-black text-[#2a2c38] mb-2 uppercase tracking-tighter">
              {pendingAction.type === "block" ? "Bloquear Acceso" : pendingAction.type === "remove" ? "Eliminar del equipo" : "Restaurar Acceso"}
            </h3>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed">¿Seguro que deseas {pendingAction.type} a <span className="font-black text-[#2a2c38]">{pendingAction.emp.name}</span>?</p>
            <div className="flex gap-3">
              <button onClick={() => setPendingAction(null)} className="flex-1 py-4 rounded-2xl border border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all">Cancelar</button>
              <button onClick={onConfirmAction} disabled={isActionLoading} className={`flex-1 py-4 rounded-2xl font-black text-white shadow-lg transition-all ${pendingAction.type === "unblock" ? "bg-[#9dd187] hover:bg-[#8bc475]" : "bg-[#2a2c38] hover:bg-black"}`}>
                {isActionLoading ? <Loader2 className="animate-spin mx-auto" /> : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-[#2a2c38]/80 backdrop-blur-md z-[120] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-2xl font-black text-[#2a2c38]">Editar Perfil</h3>
              <button onClick={() => setEditingEmployee(null)} className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"><X /></button>
            </div>
            <form className="p-10 space-y-6" onSubmit={(e) => { e.preventDefault(); onConfirmUpdate({ name: editingEmployee.name, lastName: editingEmployee.lastName }); }}>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nombre</label>
                <input type="text" value={editingEmployee.name} onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#9dd187] outline-none font-bold text-[#2a2c38]" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Apellidos</label>
                <input type="text" value={editingEmployee.lastName} onChange={(e) => setEditingEmployee({ ...editingEmployee, lastName: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#9dd187] outline-none font-bold text-[#2a2c38]" />
              </div>
              <button disabled={isActionLoading} className="w-full bg-[#2a2c38] text-[#9dd187] py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-[1.02] transition-all disabled:opacity-50">
                {isActionLoading ? <Loader2 className="animate-spin mx-auto" /> : "Guardar Cambios"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}