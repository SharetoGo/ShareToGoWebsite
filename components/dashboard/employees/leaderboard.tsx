// components/dashboard/employees/leaderboard.tsx
import { Award, Car } from "lucide-react";
import Image from "next/image";

export function Leaderboard({ employees, onSelect }: { employees: any[], onSelect: (e: any) => void }) {
  // Ensure we are showing the same "Top 3"
  const topThree = employees.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {topThree.map((emp, i) => (
        <div
          key={emp.id}
          onClick={() => onSelect(emp)}
          className="bg-white p-6 rounded-[3rem] border border-gray-100 shadow-sm flex items-center gap-5 relative overflow-hidden group hover:border-[#9dd187] transition-all cursor-pointer"
        >
          {/* Background decoration */}
          <div className="absolute -top-2 -right-2 p-4 opacity-5 text-[#2a2c38] group-hover:text-[#9dd187] group-hover:opacity-10 transition-all">
            <Award size={80} />
          </div>

          <div className="relative">
            <div className="w-20 h-20 rounded-4xl overflow-hidden bg-gray-50 relative border-2 border-white shadow-md group-hover:border-[#9dd187]/30 transition-all">
              {emp.profilePicture ? (
                <Image src={emp.profilePicture} alt={emp.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-black text-2xl text-gray-300 uppercase bg-gray-50">
                  {emp.name ? emp.name[0] : "?"}
                </div>
              )}
            </div>
            {/* Rank badge */}
            <div className={`absolute -top-1 -left-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-lg border-2 border-white
              ${i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-slate-300 text-white" : "bg-amber-600 text-white"}`}>
              {i + 1}
            </div>
          </div>

          <div className="z-10">
            <p className="font-black text-[#2a2c38] text-xl leading-tight mb-1">
              {emp.name} <span className="text-gray-400 font-bold">{emp.lastName?.split(" ")[0]}</span>
            </p>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
               <Car size={12} className="text-[#9dd187]" />
               <span className="text-[11px] font-black text-[#2a2c38]">
                 {(emp.kmTravelled || 0).toLocaleString()} <span className="text-gray-400 uppercase tracking-tighter">km</span>
               </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}