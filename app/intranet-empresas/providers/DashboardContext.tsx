'use client'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from "react";
import { useAuth } from '@/app/intranet-empresas/providers/AuthContext';
import { db } from "@/lib/firebase";
import {
    collection,
    query,
    getDocs,
    doc,
    getDoc,
    where,
    documentId,
    orderBy,
} from "firebase/firestore";

export interface User {
    id: string;
    name: string;
    lastName: string;
    emailAdress: string;
    profilePicture?: string;
    kmTravelled: number;
    passengerTravels: number;
    driverTravels: number;
    co2SavedKg: number;
}

export interface Travel {
    id: string;
    userId: string;
    origine: string;        // note: Firestore field is "origine" (typo in original data)
    destination: string;
    travelDate: any;
    carSeatsAvailable: number;
    carSeatsTaken: number;
    reservedBy: string[];
    distance: number;
    /** Per-travel CO₂ saved (kg) — computed by the mobile app for the driver's share. */
    co2SavedKg: number;
    /** Total CO₂ saved including all passengers on this travel. */
    totalCo2SavedKg?: number;
    travelMode: string;
    verificationStatus: string;
    month: string;
    companyId: string;
}

export type TravelMode = "car" | "walking" | "bicycle" | "e_scooter" | "public_transport";

export interface MonthlyMetrics {
    activeDrivers: number;
    availableSeats: number;
    co2SavedKg: number;
    participationRate: number;
    reservedSeats: number;
    seatOccupancyRate: number;
    totalTravels: number;
    totalTrips: number;
    totalUsers: number;
    /** Drivers who posted a ride for the first time ever this month. */
    newDrivers: number;
    /** UIDs of all drivers who posted at least one ride this month. Stored for newDrivers tracking. */
    driverIds: string[];
    /** Count of travels per travelMode for this month. */
    travelModeBreakdown: Record<TravelMode, number>;
}

interface DashboardContextData {
    users: User[];
    travels: Travel[]; // Added to interface
    monthlyMetrics: MonthlyMetrics | null;
    availableMonths: string[];
    selectedMonth: string;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    changeMonth: (month: string) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextData | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
    const { companyData, loading: authLoading } = useAuth();

    const [users, setUsers] = useState<User[]>([]);
    const [travels, setTravels] = useState<Travel[]>([]); // Initialize as empty array
    const [monthlyMetrics, setMonthlyMetrics] = useState<MonthlyMetrics | null>(null);
    const [availableMonths, setAvailableMonths] = useState<string[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>("all");

    const getCurrentMonthStr = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadDashboardData = useCallback(async (targetMonth: string) => {
        if (!companyData?.id) return;

        try {
            setLoading(true);
            setError(null);

            // 1. Fetch available months list
            const monthsRef = collection(db, "companies", companyData.id, "month");
            const monthsSnap = await getDocs(query(monthsRef, orderBy("__name__", "desc")));
            const monthsList = monthsSnap.docs.map(d => d.id);

            const current = getCurrentMonthStr();
            if (!monthsList.includes(current)) monthsList.unshift(current);
            setAvailableMonths(Array.from(new Set(monthsList)));

            // 2. Fetch Metrics: /companies/{id}/month/{month}/metrics/summary
            const metricsDocRef = doc(db, "companies", companyData.id, "month", targetMonth, "metrics", "summary");
            const metricsSnap = await getDoc(metricsDocRef);

            // 3. Fetch Travels: /companies/{id}/month/{month}/travels/
            const travelsRef = collection(db, "companies", companyData.id, "month", targetMonth, "travels");
            const travelsSnap = await getDocs(travelsRef);
            const travelsList = travelsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Travel));

            // 4. Fetch Users (Global/Lifetime)
            const usersResults: User[] = [];
            const memberIds = companyData.membersIds || [];
            if (memberIds.length > 0) {
                for (let i = 0; i < memberIds.length; i += 30) {
                    const batch = memberIds.slice(i, i + 30);
                    const q = query(collection(db, "users"), where(documentId(), "in", batch));
                    const s = await getDocs(q);
                    s.docs.forEach(d => usersResults.push({ id: d.id, ...d.data() } as User));
                }
            }

            setUsers(usersResults);
            setTravels(travelsList); // Correctly setting the travels state
            setMonthlyMetrics(metricsSnap.exists() ? (metricsSnap.data() as MonthlyMetrics) : null);

        } catch (err) {
            console.error("❌ Dashboard Fetch Error:", err);
            setError("Error al sincronizar los datos.");
            setTravels([]); // Fallback to empty array on error
        } finally {
            setLoading(false);
        }
    }, [companyData?.id, companyData?.membersIds]);

    useEffect(() => {
        if (!authLoading && companyData?.id) {
            loadDashboardData(selectedMonth);
        }
    }, [authLoading, companyData?.id, selectedMonth, loadDashboardData]);

    useEffect(() => {
        const fetchMonths = async () => {
            if (companyData?.id) {
                try {
                    const monthsSnap = await getDocs(collection(db, "companies", companyData.id, "month"));
                    // Sort months descending (e.g., "2026-05" before "2026-04")
                    const months = monthsSnap.docs
                        .map(d => d.id)
                        .sort((a, b) => b.localeCompare(a));

                    setAvailableMonths(months);

                    // If no month is selected yet, pick the most recent one automatically
                    if (months.length > 0 && !selectedMonth) {
                        setSelectedMonth(months[0]);
                    }
                } catch (err) {
                    console.error("Error discovery months:", err);
                }
            }
        };
        fetchMonths();
    }, [companyData?.id, selectedMonth]);

    const changeMonth = async (month: string) => {
        setSelectedMonth(month);
    };

    const refresh = async () => {
        await loadDashboardData(selectedMonth);
    };

    return (
        <DashboardContext.Provider value={{
            users, travels, monthlyMetrics, availableMonths, selectedMonth,
            loading, error, refresh, changeMonth
        }}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (context === undefined) throw new Error("useDashboard must be used within DashboardProvider");
    return context;
}