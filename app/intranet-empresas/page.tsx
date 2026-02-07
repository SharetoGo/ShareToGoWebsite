// app/intranet-empresas/page.tsx
'use client'

import { DashboardView } from "@/components/dashboard/views/dashboard-view";
import { useRouter } from "next/navigation";

export default function EspacioEmpresas() {
  const router = useRouter();

  const handleNavigate = (tab: string) => {
    router.push(`/intranet-empresas/${tab === 'dashboard' ? '' : tab}`);
  };

  return (
    <DashboardView setActiveTab={handleNavigate} />
  );
}