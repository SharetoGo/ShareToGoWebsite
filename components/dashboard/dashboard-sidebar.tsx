// components/dashboard/dashboard-sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/app/intranet-empresas/auth/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import {
  LogOut, LayoutDashboard, Users, Leaf,
  BarChart3, Settings, AppWindow, UserCircle, Building
} from 'lucide-react'
import Image from 'next/image'

const NAV_ITEMS = [
  { href: "/intranet-empresas", label: "Dashboard", icon: LayoutDashboard },
  { href: "/intranet-empresas/empleados", label: "Empleados", icon: Users },
  { href: "/intranet-empresas/analiticas", label: "Analytics", icon: Leaf },
  { href: "/intranet-empresas/contenido-sostenible", label: "Contenido Sostenible", icon: AppWindow },
  { href: "/intranet-empresas/informes", label: "Reportes", icon: BarChart3 },
  { href: "/intranet-empresas/ajustes", label: "Ajustes", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { companyData, user } = useAuth()

  const handleLogout = async () => {
    await signOut(auth)
    router.replace('/intranet-empresas/auth')
  }

  return (
    <aside className="w-64 bg-[#2a2c38] text-white hidden lg:flex flex-col border-r border-gray-800 shrink-0 h-full overflow-hidden">
      <div className="p-6 pb-2 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
          {companyData?.logoUrl ? (
            <Image
              src={companyData.logoUrl}
              alt="Logo"
              width={320}
              height={640}
              className="w-full h-full object-contain"
              priority
            />
          ) : (
            <span className="text-lg font-bold text-white">
              {companyData?.name?.substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <p className="font-bold text-white truncate text-lg flex-1">{companyData?.name || "Empresa"}</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${isActive
                  ? "bg-[#9dd187] text-[#2a2c38] font-bold shadow-lg shadow-[#9dd187]/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-white/5 rounded-4xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <UserCircle size={20} className="text-gray-400" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Sesión</p>
              <p className="text-xs text-white truncate font-medium">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/intranet-empresas/seleccion')}
            className="flex items-center justify-center gap-2 mb-2 text-gray-400 hover:text-[#9dd187] bg-white/5 hover:bg-white/10 transition-all w-full py-2 rounded-xl text-xs font-bold"
          >
            <Building size={14} />
            <span>Cambiar empresa</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 hover:text-white hover:bg-red-500 text-red-400 bg-red-400/10 transition-all w-full py-2 rounded-xl text-xs font-bold"
          >
            <LogOut size={14} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </aside>
  );
}