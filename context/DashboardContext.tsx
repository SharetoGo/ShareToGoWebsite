'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from '@/app/intranet-empresas/auth/AuthContext';
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  documentId,
  setDoc,
  serverTimestamp,
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
  reviews?: Array<{ authorName: string; rating: number; comment: string }>;
  company: string;
}

export interface Travel {
  id: string;
  userId: string;
  origin: string;
  destination: string;
  date: any;
  carSeatsAvailable: number;
  reservedBy: string[];
}

/**
 * Monthly metrics stored at:
 *   /companies/{companyId}/month/{year-month}/metrics/{metricId}
 *
 * Fields written by computeAndSaveMonthlyMetrics():
 *  - totalTravels        : number of travel docs in that month's subcollection
 *  - totalTrips          : total passengers who booked (sum of reservedBy.length)
 *  - availableSeats      : sum of (seats - 1) across all travels (driver excluded)
 *  - reservedSeats       : sum of (seats - availableSeats) per travel
 *  - co2SavedKg          : kg CO₂ avoided  (reservedSeats × avg_km × 0.21 kg/km)
 *  - seatOccupancyRate   : reservedSeats / availableSeats × 100  (%)
 *  - participationRate   : unique participants / totalMembers × 100  (%)
 *  - activeDrivers       : unique driver userIds this month
 *  - totalUsers          : snapshot of company member count
 *  - newDrivers          : drivers who had NOT posted in ANY previous month
 *  - computedAt          : server timestamp
 */
export interface MonthlyMetrics {
  totalTravels: number;
  totalTrips: number;
  availableSeats: number;
  reservedSeats: number;
  co2SavedKg: number;
  seatOccupancyRate: number;
  participationRate: number;
  activeDrivers: number;
  totalUsers: number;
  newDrivers: number;
  computedAt?: any;
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
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

/** Average one-way commute distance used for CO₂ estimates (km). */
const AVG_COMMUTE_KM = 15;

/** CO₂ emission factor for a petrol passenger car (kg per km per passenger). */
const CO2_KG_PER_KM = 0.21;

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */

/** Returns "YYYY-MM" for a given Date. */
function toYearMonth(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
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
    if (!companyData?.id || hasLoaded) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const now = new Date();
      const currentYM = toYearMonth(now);

      // Ensure metrics exist for the current month before loading
      await computeAndSaveMonthlyMetrics(
        companyData.id,
        currentYM,
        companyData.membersIds || [],
      );

      const [metricsData, usersData, travelsData] = await Promise.all([
        loadCurrentMonthMetrics(companyData.id, currentYM),
        loadUsers(companyData.membersIds || []),
        loadCurrentMonthTravels(companyData.id, currentYM),
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
  }, [companyData?.id, companyData?.membersIds, hasLoaded]);

  /* ═══════════════════════════════════════════════════════════
     COMPUTE & SAVE MONTHLY METRICS
     Path: /companies/{companyId}/month/{yearMonth}/metrics/summary
     ═══════════════════════════════════════════════════════════ */

  async function computeAndSaveMonthlyMetrics(
    companyId: string,
    yearMonth: string,
    memberIds: string[],
  ): Promise<void> {
    const summaryRef = doc(
      db,
      "companies", companyId,
      "month", yearMonth,
      "metrics", "summary",
    );

    // Skip recomputing if a fresh snapshot already exists for today
    const existing = await getDoc(summaryRef);
    if (existing.exists()) {
      const data = existing.data();
      if (data?.computedAt) {
        const computedDate: Date =
          data.computedAt.toDate ? data.computedAt.toDate() : new Date(data.computedAt);
        const today = new Date();
        const sameDay =
          computedDate.getFullYear() === today.getFullYear() &&
          computedDate.getMonth() === today.getMonth() &&
          computedDate.getDate() === today.getDate();
        if (sameDay) return; // already computed today
      }
    }

    try {
      // 1. Fetch all travels for this month
      const travelsSnap = await getDocs(
        collection(db, "companies", companyId, "month", yearMonth, "travels"),
      );

      const monthTravels: Travel[] = travelsSnap.docs.map(d => ({
        id: d.id,
        ...d.data(),
      } as Travel));

      // 2. Core aggregations
      const totalTravels = monthTravels.length;

      let totalReservedSeats = 0;
      let totalAvailableSeats = 0;
      const driverIds = new Set<string>();
      const passengerIds = new Set<string>();

      for (const t of monthTravels) {
        // seats = total capacity including driver; available = free seats for passengers
        const capacity = t.carSeatsAvailable ?? 0;
        const reserved = Array.isArray(t.reservedBy) ? t.reservedBy.length : 0;
        const available = Math.max(capacity - 1 - reserved, 0); // -1 for driver

        totalReservedSeats += reserved;
        totalAvailableSeats += capacity; // seats offered (driver excluded)

        if (t.userId) driverIds.add(t.userId);
        if (Array.isArray(t.reservedBy)) {
          t.reservedBy.forEach(uid => passengerIds.add(uid));
        }
      }

      // totalTrips = total passenger bookings this month
      const totalTrips = totalReservedSeats;

      // CO₂ saved: each reserved seat replaces one solo car trip
      // co2 (kg) = reservedSeats × avg_km × CO2_factor
      const co2SavedKg = parseFloat(
        (totalReservedSeats * AVG_COMMUTE_KM * CO2_KG_PER_KM).toFixed(2),
      );

      // Seat occupancy rate: % of offered seats that were filled
      const seatOccupancyRate =
        totalAvailableSeats > 0
          ? parseFloat(((totalReservedSeats / totalAvailableSeats) * 100).toFixed(2))
          : 0;

      // Participation rate: unique members (drivers + passengers) / total members
      const uniqueParticipants = new Set([...driverIds, ...passengerIds]);
      const totalMembers = memberIds.length;
      const participationRate =
        totalMembers > 0
          ? parseFloat(((uniqueParticipants.size / totalMembers) * 100).toFixed(2))
          : 0;

      const activeDrivers = driverIds.size;
      const totalUsers = totalMembers;

      // 3. Determine new drivers (drivers who posted for the first time this month)
      //    Compare against all previous months' known driver sets
      const newDrivers = await countNewDrivers(companyId, yearMonth, driverIds);

      // 4. Write to Firestore
      const metrics: MonthlyMetrics = {
        totalTravels,
        totalTrips,
        availableSeats: totalAvailableSeats,
        reservedSeats: totalReservedSeats,
        co2SavedKg,
        seatOccupancyRate,
        participationRate,
        activeDrivers,
        totalUsers,
        newDrivers,
        computedAt: serverTimestamp(),
      };

      await setDoc(summaryRef, metrics);
    } catch (err) {
      console.error("❌ Error computing monthly metrics:", err);
    }
  }

  /**
   * Returns how many drivers in `currentDriverIds` have NOT appeared
   * as drivers in any month before `yearMonth`.
   */
  async function countNewDrivers(
    companyId: string,
    yearMonth: string,
    currentDriverIds: Set<string>,
  ): Promise<number> {
    if (currentDriverIds.size === 0) return 0;

    try {
      // Fetch all month documents that come before this one
      const monthsSnap = await getDocs(
        collection(db, "companies", companyId, "month"),
      );

      const priorMonths = monthsSnap.docs
        .map(d => d.id)
        .filter(id => id < yearMonth); // lexicographic comparison works for "YYYY-MM"

      const historicDriverIds = new Set<string>();

      for (const m of priorMonths) {
        const snap = await getDoc(
          doc(db, "companies", companyId, "month", m, "metrics", "summary"),
        );
        if (snap.exists()) {
          // We stored driverIds as an array in a dedicated field for this purpose
          const data = snap.data();
          if (Array.isArray(data?.driverIds)) {
            data.driverIds.forEach((uid: string) => historicDriverIds.add(uid));
          }
        }
      }

      let newCount = 0;
      currentDriverIds.forEach(uid => {
        if (!historicDriverIds.has(uid)) newCount++;
      });
      return newCount;
    } catch (err) {
      console.error("❌ Error counting new drivers:", err);
      return 0;
    }
  }

  /* ═══════════════════════════════════════════════════════════
     DATA LOADERS
     ═══════════════════════════════════════════════════════════ */

  /** Load already-computed metrics for a specific month. */
  async function loadCurrentMonthMetrics(
    companyId: string,
    yearMonth: string,
  ): Promise<MonthlyMetrics | null> {
    try {
      const ref = doc(db, "companies", companyId, "month", yearMonth, "metrics", "summary");
      const snap = await getDoc(ref);
      return snap.exists() ? (snap.data() as MonthlyMetrics) : null;
    } catch (err) {
      console.error("❌ Error loading monthly metrics:", err);
      return null;
    }
  }

  /** Load travel documents for the current month. */
  async function loadCurrentMonthTravels(
    companyId: string,
    yearMonth: string,
  ): Promise<Travel[]> {
    try {
      const snap = await getDocs(
        collection(db, "companies", companyId, "month", yearMonth, "travels"),
      );
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Travel));
    } catch (err) {
      console.error("❌ Error loading travels:", err);
      return [];
    }
  }

  /** Load user documents by IDs (batched to respect Firestore 30-item limit). */
  async function loadUsers(memberIds: string[]): Promise<User[]> {
    if (!memberIds || memberIds.length === 0) return [];

    try {
      const allUsers: User[] = [];

      for (let i = 0; i < memberIds.length; i += 30) {
        const batch = memberIds.slice(i, i + 30);
        const usersSnap = await getDocs(
          query(collection(db, "users"), where(documentId(), "in", batch)),
        );
        usersSnap.docs.forEach(d => allUsers.push({ id: d.id, ...d.data() } as User));
      }

      return allUsers;
    } catch (err) {
      console.error("❌ Error loading users:", err);
      return [];
    }
  }

  /* ═══════════════════════════════════════════════════════════
     EFFECTS
     ═══════════════════════════════════════════════════════════ */

  useEffect(() => {
    if (!authLoading && companyData?.id && !hasLoaded) {
      loadDashboardData();
    }
  }, [authLoading, companyData?.id, hasLoaded, loadDashboardData]);

  /* ═══════════════════════════════════════════════════════════
     REFRESH
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
    refresh,
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