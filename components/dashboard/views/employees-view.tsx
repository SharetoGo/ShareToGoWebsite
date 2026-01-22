// app/components/views/employees-view.tsx
import { Search, Filter, MoreVertical, Award } from "lucide-react";

const employees = [
  { id: 1, name: "Lucía García", dept: "Marketing", trips: 24, co2: "42kg", status: "Driver" },
  { id: 2, name: "Marcos Ruiz", dept: "IT", trips: 18, co2: "31kg", status: "Passenger" },
  { id: 3, name: "Elena Sanz", dept: "Sales", trips: 15, co2: "26kg", status: "Driver" },
];

export function EmployeesView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#2a2c38]">Panel de Empleados</h2>
          <p className="text-gray-500">Gestiona y premia la participación de tu equipo.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar empleado..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#9dd187] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Leaderboard Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {employees.slice(0, 3).map((emp, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
            <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <Award className="absolute -top-1 -right-1 text-[#9dd187] bg-white rounded-full" size={20} />
            </div>
            <div>
              <p className="font-bold text-[#2a2c38]">{emp.name}</p>
              <p className="text-xs text-[#9dd187] font-semibold">{emp.trips} viajes compartidos</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Empleado</th>
              <th className="px-6 py-4">Departamento</th>
              <th className="px-6 py-4">Viajes</th>
              <th className="px-6 py-4">CO2e Ahorrado</th>
              <th className="px-6 py-4">Rol Principal</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-[#2a2c38]">{emp.name}</td>
                <td className="px-6 py-4 text-gray-600">{emp.dept}</td>
                <td className="px-6 py-4 font-semibold">{emp.trips}</td>
                <td className="px-6 py-4 text-[#9dd187] font-bold">{emp.co2}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    emp.status === 'Driver' ? 'bg-[#2a2c38] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-[#2a2c38]"><MoreVertical size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}