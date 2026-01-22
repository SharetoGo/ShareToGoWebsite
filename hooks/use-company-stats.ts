import { useAuth } from '@/app/intranet-empresas/auth/AuthContext';

export function useCompanyStats() {
  const { companyData, loading } = useAuth();

  // Helper to format numbers (e.g., 105.1599 -> 105,16)
  const formatNumber = (num: number = 0) => 
    new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(num);

  const stats = {
    name: companyData?.name || "Empresa",
    code: companyData?.accessCodeDisplay || "---",
    email: companyData?.email || "",
    
    // Core ESG Metrics
    co2Saved: formatNumber(companyData?.totalCo2),
    kmShared: formatNumber(companyData?.totalKm),
    driversCount: companyData?.totalDrivers || 0,
    travelsCount: companyData?.totalTrips || 0,
    passengersCount: companyData?.totalPassengers || 0,
    
    // Arrays and logic
    partners: companyData?.partners || [],
    zones: companyData?.zones || [],
    isRestricted: companyData?.tripsRestricted || false,
    
    // Calculations for the dashboard
    treesEquivalent: Math.floor((companyData?.totalCo2 || 0) / 21), // 1 tree approx 21kg/year
  };

  return { stats, loading };
}