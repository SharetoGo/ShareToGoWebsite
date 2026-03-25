import { Award } from "lucide-react";
import Image from "next/image";

export function Leaderboard({ employees, onSelect }: { employees: any[], onSelect: (e: any) => void }) {
  const bgColors = ["bg-yellow-50", "bg-gray-50", "bg-yellow-100"];
  const textColors = ["text-yellow-500", "text-gray-500", "text-yellow-700"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {employees.map((emp, i) => (
        <div
          key={emp.id}
          onClick={() => onSelect(emp)}
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
                <div className={`w-full h-full flex items-center justify-center font-black text-xl uppercase ${bgColors[i % 3]} ${textColors[i % 3]}`}>
                  {emp.name ? emp.name[0] : "?"}
                </div>
              )}
            </div>
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#2a2c38] text-[#9dd187] rounded-full flex items-center justify-center text-[10px] font-black shadow-lg">
              {i + 1}
            </div>
          </div>
          <div>
            <p className="font-black text-[#2a2c38] text-lg leading-tight">{emp.name} {emp.lastName.split(" ")[0]}</p>
            
          </div>
        </div>
      ))}
    </div>
  );
}