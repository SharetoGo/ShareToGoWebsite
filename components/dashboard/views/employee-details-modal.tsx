// components/dashboard/views/employee-details-modal.tsx
'use client'

import Image from "next/image";
import { X, Mail, Phone, MapPin, Star, Car, Users, Leaf, Calendar } from "lucide-react";

interface EmployeeDetailsModalProps {
  employee: any; // Using any to catch all the raw Firebase fields you provided
  onClose: () => void;
}

export function EmployeeDetailsModal({ employee, onClose }: EmployeeDetailsModalProps) {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-[#2a2c38]/60 backdrop-blur-md z-60 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-300">
        
        {/* Header / Cover Area */}
        <div className="relative h-32 bg-[#2a2c38]">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex items-end gap-6">
            <div className="w-32 h-32 rounded-[2.5rem] border-4 border-white overflow-hidden bg-gray-100 shadow-xl relative">
              {employee.profilePicture ? (
                <Image src={employee.profilePicture} alt="" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-300 uppercase">
                  {employee.name[0]}
                </div>
              )}
            </div>
            <div className="pb-2">
              <h2 className="text-3xl font-black text-[#2a2c38] leading-tight">
                {employee.name} {employee.lastName}
              </h2>
              <div className="flex items-center gap-2 text-[#9dd187] font-bold text-sm uppercase tracking-widest">
                <Leaf size={14} />
                <span>Impacto {employee.co2SavedKg > 100 ? 'Alto' : 'Activo'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <StatCard icon={<Car size={18}/>} label="KM Totales" value={`${employee.kmTravelled?.toFixed(1) || 0} km`} />
            <StatCard icon={<Users size={18}/>} label="Viajes" value={employee.passengerTravels + employee.driverTravels} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Contact & Zones */}
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Contacto</h4>
                <div className="space-y-3">
                  <ContactItem icon={<Mail size={16}/>} text={employee.emailAdress || "No disponible"} />
                  <ContactItem icon={<Phone size={16}/>} text={employee.phoneNumber || "Sin teléfono"} />
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Zonas Frecuentes</h4>
                <div className="flex flex-wrap gap-2">
                  {employee.zones?.map((zone: any, i: number) => (
                    <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold border border-gray-100">
                      <MapPin size={12} className="text-[#9dd187]" />
                      {zone.name}
                    </span>
                  )) || <p className="text-xs text-gray-400 italic">No hay zonas registradas</p>}
                </div>
              </div>
            </div>

            {/* Right Column: Reviews */}
            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 text-right">Valoraciones Recientes</h4>
              <div className="space-y-4">
                {employee.reviews?.length > 0 ? (
                  employee.reviews.slice(0, 3).map((rev: any, i: number) => (
                    <div key={i} className="bg-[#fcfdfe] p-4 rounded-2xl border border-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-[#2a2c38]">{rev.authorName}</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} fill={i < rev.rating ? "currentColor" : "none"} strokeWidth={3} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 italic leading-relaxed">"{rev.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic text-right">Sin valoraciones aún</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color = "text-[#2a2c38]" }: any) {
  return (
    <div className="bg-[#fcfdfe] p-5 rounded-4xl border border-gray-50">
      <div className="text-gray-300 mb-2">{icon}</div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-xl font-black ${color}`}>{value}</p>
    </div>
  );
}

function ContactItem({ icon, text }: any) {
  return (
    <div className="flex items-center gap-3 text-gray-600">
      <div className="text-[#9dd187]">{icon}</div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}