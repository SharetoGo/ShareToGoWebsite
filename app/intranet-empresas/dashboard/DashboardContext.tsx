// app/intranet-empresas/dashboard/DashboardContext.tsx
'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth } from '../auth/AuthContext'
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  documentId,
} from "firebase/firestore";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

export interface User {
  id: string;
  name: string;
  lastName: string;
  emailAdress: string;
  phoneNumber?: string;
  profilePicture?: string;
  kmTravelled: number;
  passengerTravels: number;
  driverTravels: number;
  co2SavedKg: number;
  zones?: Array<{ name: string; lat: number; lng: number }>;
  reviews?: Array<{
    authorName: string;
    rating: number;
    comment: string;
  }>;
  company: string;
}

export interface Travel {
  id: string;
  userId: string;
  origin: string;
  destination: string;
  date: any;
  seats: number;
  availableSeats: number;
  reservedBy: string[];
}

export interface MonthlyMetrics {
  co2SavedKg: number;
  seatOccupancyRate: number;
  participationRate: number;
  totalTravels: number;
  totalTrips: number;
}

interface DashboardContextData {
  // Data
  users: User[];
  travels: Travel[];
  monthlyMetrics: MonthlyMetrics | null;
  
  // States
  loading: boolean;
  error: string | null;
  
  // Actions
  refresh: () => Promise<void>;
}

/* ═══════════════════════════════════════════════════════════
   CONTEXT
   ═══════════════════════════════════════════════════════════ */

const DashboardContext = createContext<DashboardContextData | undefined>(undefined);

/* ═══════════════════════════════════════════════════════════
   PROVIDER
   ═══════════════════════════════════════════════════════════ */

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { companyData, loading: authLoading } = useAuth();
  
  const [users, setUsers] = useState<User[]>([]);
  const [travels, setTravels] = useState<Travel[]>([]);
  const [monthlyMetrics, setMonthlyMetrics] = useState<MonthlyMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  /* ═══════════════════════════════════════════════════════════
     LOAD ALL DATA
     ═══════════════════════════════════════════════════════════ */

  const loadDashboardData = useCallback(async () => {
    // No cargar si no hay companyData o ya se está cargando
    if (!companyData?.id || hasLoaded) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Cargar datos en paralelo
      const [metricsData, usersData, travelsData] = await Promise.all([
        loadMonthlyMetrics(companyData.id),
        loadUsers(companyData.membersIds || []),
        loadTravels(companyData.travels || [])
      ]);

      setMonthlyMetrics(metricsData);
      setUsers(usersData);
      setTravels(travelsData);
      setHasLoaded(true);

    } catch (err) {
      console.error("❌ Error loading dashboard data:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
      setHasLoaded(true);
    } finally {
      setLoading(false);
    }
  }, [companyData?.id, companyData?.membersIds, companyData?.travels, hasLoaded]);

  /* ═══════════════════════════════════════════════════════════
     DATA LOADERS
     ═══════════════════════════════════════════════════════════ */

  async function loadMonthlyMetrics(companyId: string): Promise<MonthlyMetrics | null> {
    try {
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const previousMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

      // Intenta mes actual
      try {
        const currentRef = doc(db, "companies", companyId, "metrics", "metrics", "monthly", currentMonth);
        const currentSnap = await getDoc(currentRef);

        if (currentSnap.exists()) {
          return currentSnap.data() as MonthlyMetrics;
        }
      } catch (e) {
        console.warn("Current month metrics not found:", e);
      }

      // Fallback a mes anterior
      try {
        const prevRef = doc(db, "companies", companyId, "metrics", "metrics", "monthly", previousMonth);
        const prevSnap = await getDoc(prevRef);

        return prevSnap.exists() ? (prevSnap.data() as MonthlyMetrics) : null;
      } catch (e) {
        console.warn("Previous month metrics not found:", e);
        return null;
      }
    } catch (error) {
      console.error("❌ Error loading monthly metrics:", error);
      return null;
    }
  }

  async function loadUsers(memberIds: string[]): Promise<User[]> {
    if (!memberIds || memberIds.length === 0) return [];

    try {
      const allUsers: User[] = [];

      // Procesar en lotes de 30 (límite de Firestore)
      for (let i = 0; i < memberIds.length; i += 30) {
        const batch = memberIds.slice(i, i + 30);
        const usersQuery = query(
          collection(db, "users"),
          where(documentId(), "in", batch)
        );
        const usersSnap = await getDocs(usersQuery);
        
        usersSnap.docs.forEach(doc => {
          allUsers.push({ id: doc.id, ...doc.data() } as User);
        });
      }

      return allUsers;
    } catch (error) {
      console.error("❌ Error loading users:", error);
      return [];
    }
  }

  async function loadTravels(travelIds: string[]): Promise<Travel[]> {
    if (!travelIds || travelIds.length === 0) return [];

    try {
      const allTravels: Travel[] = [];

      // Procesar en lotes de 30
      for (let i = 0; i < travelIds.length; i += 30) {
        const batch = travelIds.slice(i, i + 30);
        const travelsQuery = query(
          collection(db, "travels"),
          where(documentId(), "in", batch)
        );
        const travelsSnap = await getDocs(travelsQuery);
        
        travelsSnap.docs.forEach(doc => {
          allTravels.push({ id: doc.id, ...doc.data() } as Travel);
        });
      }

      return allTravels;
    } catch (error) {
      console.error("❌ Error loading travels:", error);
      return [];
    }
  }

  /* ═══════════════════════════════════════════════════════════
     EFFECTS
     ═══════════════════════════════════════════════════════════ */

  // Solo cargar cuando companyData esté listo y Auth haya terminado
  useEffect(() => {
    if (!authLoading && companyData?.id && !hasLoaded) {
      loadDashboardData();
    }
  }, [authLoading, companyData?.id, hasLoaded, loadDashboardData]);

  /* ══════════════════════════════════════════════════════════
     REFRESH FUNCTION
     ═══════════════════════════════════════════════════════════ */

  const refresh = async () => {
    setHasLoaded(false);
    await loadDashboardData();
  };

  /* ═══════════════════════════════════════════════════════════
     CONTEXT VALUE
     ═══════════════════════════════════════════════════════════ */

  const value: DashboardContextData = {
    users,
    travels,
    monthlyMetrics,
    loading,
    error,
    refresh
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOOK
   ═══════════════════════════════════════════════════════════ */

export function useDashboard() {
  const context = useContext(DashboardContext);
  
  if (context === undefined) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  
  return context;
}