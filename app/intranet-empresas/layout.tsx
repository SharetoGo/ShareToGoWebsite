'use client'

import { useEffect } from 'react'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardProvider } from "./dashboard/DashboardContext"
import AOS from 'aos'
import 'aos/dist/aos.css'

// 1. Create a "Shell" component that can safely use useAuth()
function IntranetShell({ children }: { children: React.ReactNode }) {
  const { user, companyData, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Smart redirect: If not logged in and not on the auth page
    if (!loading && !user && pathname !== '/intranet-empresas/auth') {
      router.replace('/intranet-empresas/auth')
    }
  }, [user, loading, router, pathname])

  // Loading state
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#f8fafc]">
        <div className="w-10 h-10 border-4 border-[#9dd187]/20 border-t-[#9dd187] rounded-full animate-spin" />
        <p className="mt-4 text-[#2a2c38] font-medium animate-pulse">Sincronizando con SharetoGo...</p>
      </div>
    )
  }

  // If we are on the login/auth page, don't show the sidebar
  if (pathname === '/intranet-empresas/auth') {
    return <main className="grow">{children}</main>
  }

  // Fallback while redirecting or if data is missing
  if (!user || !companyData) return null

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full overflow-hidden bg-[#f8fafc]">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <DashboardProvider>
              {children}
            </DashboardProvider>
          </div>
        </div>
      </main>
    </div>
  )
}

// 2. The main Layout only provides the AuthContext
export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <AuthProvider>
      <IntranetShell>
        {children}
      </IntranetShell>
    </AuthProvider>
  )
}