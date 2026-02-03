// app/intranet-empresas/page.tsx (EspacioEmpresas)
'use client'

import { useState, useEffect } from "react";
import { useAuth } from './auth/AuthContext'
import { useRouter } from 'next/navigation'
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardProvider } from "./dashboard/DashboardContext";

// Views
import { DashboardView } from "@/components/dashboard/views/dashboard-view";
import { EmployeesView } from "@/components/dashboard/views/employees-view";
import { AnalyticsView } from "@/components/dashboard/views/analytics-view";
import { ContentView } from "@/components/dashboard/views/content-view";
import { ReportsView } from "@/components/dashboard/views/reports-view";
import { SettingsView } from "@/components/dashboard/views/settings-view";

export default function EspacioEmpresas() {
  const { user, companyData, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard");

  // View Switcher Logic
  const renderView = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardView setActiveTab={setActiveTab} />;
      case "employees": return <EmployeesView />;
      case "analytics": return <AnalyticsView setActiveTab={setActiveTab} />;
      case "content":   return <ContentView />;
      case "reports":   return <ReportsView />;
      case "settings":  return <SettingsView />;
      default: return <DashboardView setActiveTab={setActiveTab} />;
    }
  };

  // Smart redirect
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/intranet-empresas/auth')
    }
  }, [user, loading, router])

  // Loading state
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#f8fafc]">
        <div className="w-10 h-10 border-4 border-[#9dd187]/20 border-t-[#9dd187] rounded-full animate-spin" />
        <p className="mt-4 text-[#2a2c38] font-medium animate-pulse">Sincronizando con SharetoGo...</p>
      </div>
    )
  }

  // Fallback
  if (!user || !companyData) return null

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full overflow-hidden bg-[#f8fafc]">
      {/* SIDEBAR */}
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* 🔥 WRAP VIEWS WITH DASHBOARD PROVIDER 🔥 */}
            <DashboardProvider>
              {renderView()}
            </DashboardProvider>
          </div>
        </div>
      </main>
    </div>
  )
}