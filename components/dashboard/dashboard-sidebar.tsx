// components/dashboard/sidebar.tsx
'use client'

import { useAuth } from '@/app/intranet-empresas/auth/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { 
  LogOut, LayoutDashboard, Users, Leaf, 
  BarChart3, Settings, AppWindow, UserCircle 
} from 'lucide-react'

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "employees", label: "Empleados", icon: Users },
  { id: "analytics", label: "Analytics", icon: Leaf },
  { id: "content", label: "Contenido Sostenible", icon: AppWindow },
  { id: "reports", label: "Reportes", icon: BarChart3 },
  { id: "settings", label: "Ajustes", icon: Settings },
];

export function DashboardSidebar({ activeTab, setActiveTab }: any) {
  const router = useRouter()
  const { companyData, user } = useAuth() // Get both company and user info

  const handleLogout = async () => {
    await signOut(auth)
    router.replace('/intranet-empresas/auth')
  }

  return (
    <aside className="w-64 bg-[#2a2c38] text-white hidden lg:flex flex-col border-r border-gray-800 shrink-0 h-full overflow-hidden">
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
              activeTab === item.id 
                ? "bg-[#9dd187] text-[#2a2c38] font-bold shadow-lg shadow-[#9dd187]/10" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer Profile Section */}
      <div className="p-4 mt-auto">
        <div className="bg-white/5 rounded-[2rem] p-4 border border-white/10">
          {/* Company Info Row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-[#9dd187] overflow-hidden flex items-center justify-center">
                {companyData?.logoUrl ? (
                  <img 
                    src={companyData.logoUrl} 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold text-[#9dd187]">
                    {companyData?.name?.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              {/* Status Indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#2a2c38] rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {companyData?.name || "Cargando..."}
              </p>
            </div>
          </div>

          {/* User Admin Row */}
          <div className="flex items-center gap-2 px-2 py-2 bg-white/5 rounded-xl mb-2">
            <UserCircle size={14} className="text-gray-400" />
            <span className="text-[11px] text-gray-300 truncate font-medium">
              {user?.email || "Admin Session"}
            </span>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 hover:text-white hover:bg-red-300 text-red-400 bg-red-400/10 transition-all w-full py-2 rounded-xl text-xs font-bold"
          >
            <LogOut size={14} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </aside>
  );
}