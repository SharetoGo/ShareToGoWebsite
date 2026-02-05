// components/dashboard/sidebar.tsx
"use client";

import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LogOut,
  LayoutDashboard,
  Users,
  Leaf,
  BarChart3,
  Settings,
  AppWindow,
  UserCircle,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "employees", label: "Empleados", icon: Users },
  { id: "analytics", label: "Analytics", icon: Leaf },
  { id: "content", label: "Contenido Sostenible", icon: AppWindow },
  { id: "reports", label: "Reportes", icon: BarChart3 },
  { id: "settings", label: "Ajustes", icon: Settings },
];

export function DashboardSidebar({ activeTab, setActiveTab }: any) {
  const router = useRouter();
  const { companyData, user } = useAuth(); // Get both company and user info

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/intranet-empresas/auth");
  };

  return (
    <aside className="w-64 bg-[#2a2c38] text-white hidden lg:flex flex-col border-r border-gray-800 shrink-0 h-full overflow-hidden">
      {/* Company Header */}
      <div className="p-6 pb-2 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
          {companyData?.logoUrl ? (
            <Image
              src={companyData.logoUrl}
              alt="Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-lg font-bold text-[#2a2c38]">
              {companyData?.name?.substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <p className="font-bold text-white truncate text-lg flex-1">
          {companyData?.name || "Cargando..."}
        </p>
      </div>

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
        <div className="bg-white/5 rounded-4xl p-4 border border-white/10">
          {/* User Admin Row */}
          <div className="flex items-center gap-3 mb-3 px-2">
            <UserCircle size={20} className="text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Sesión</p>
              <p className="text-xs text-white truncate font-medium">
                {user?.email || "Admin Session"}
              </p>
            </div>
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
