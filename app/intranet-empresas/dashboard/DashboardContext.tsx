// app/intranet-empresas/dashboard/DashboardContext.tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from '../auth/AuthContext'
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  documentId
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
  const { companyData } = useAuth();
  
  const [users, setUsers] = useState<User[]>([]);
  const [travels, setTravels] = useState<Travel[]>([]);
  const [monthlyMetrics, setMonthlyMetrics] = useState<MonthlyMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ═══════════════════════════════════════════════════════════
     LOAD ALL DATA
     ═══════════════════════════════════════════════════════════ */

  const loadDashboardData = async () => {
    if (!companyData?.name) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Get company ID
      const companiesQuery = query(
        collection(db, "companies"),
        where("name", "==", companyData.name)
      );
      const companiesSnap = await getDocs(companiesQuery);
      
      if (companiesSnap.empty) {
        throw new Error("Company not found");
      }

      const companyId = companiesSnap.docs[0].id;

      // 2️⃣ Load all data in parallel
      const [metricsData, usersData, travelsData] = await Promise.all([
        loadMonthlyMetrics(companyId),
        loadUsers(companyData.membersIds || []),
        loadTravels(companyData.travels || [])
      ]);

      setMonthlyMetrics(metricsData);
      setUsers(usersData);
      setTravels(travelsData);

    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  /* ═══════════════════════════════════════════════════════════
     DATA LOADERS
     ═══════════════════════════════════════════════════════════ */

  async function loadMonthlyMetrics(companyId: string): Promise<MonthlyMetrics | null> {
    try {
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const previousMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

      // Try current month
      const currentRef = doc(db, "companies", companyId, "metrics", "metrics", "monthly", currentMonth);
      const currentSnap = await getDoc(currentRef);

      if (currentSnap.exists()) {
        return currentSnap.data() as MonthlyMetrics;
      }

      // Fallback to previous month
      const prevRef = doc(db, "companies", companyId, "metrics", "metrics", "monthly", previousMonth);
      const prevSnap = await getDoc(prevRef);

      return prevSnap.exists() ? (prevSnap.data() as MonthlyMetrics) : null;
    } catch (error) {
      console.error("Error loading monthly metrics:", error);
      return null;
    }
  }

  async function loadUsers(memberIds: string[]): Promise<User[]> {
    if (!memberIds || memberIds.length === 0) return [];

    try {
      const allUsers: User[] = [];

      // Process in batches of 30 (Firestore limit)
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
      console.error("Error loading users:", error);
      return [];
    }
  }

  async function loadTravels(travelIds: string[]): Promise<Travel[]> {
    if (!travelIds || travelIds.length === 0) return [];

    try {
      const allTravels: Travel[] = [];

      // Process in batches of 30
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
      console.error("Error loading travels:", error);
      return [];
    }
  }

  /* ═══════════════════════════════════════════════════════════
     EFFECTS
     ═══════════════════════════════════════════════════════════ */

  useEffect(() => {
    loadDashboardData();
  }, [companyData?.name]);

  /* ═══════════════════════════════════════════════════════════
     CONTEXT VALUE
     ═══════════════════════════════════════════════════════════ */

  const value: DashboardContextData = {
    users,
    travels,
    monthlyMetrics,
    loading,
    error,
    refresh: loadDashboardData
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