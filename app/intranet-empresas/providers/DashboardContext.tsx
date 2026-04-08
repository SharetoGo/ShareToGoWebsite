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

// --- Interfaces ---
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
    travelModeBreakdown?: any;
}

interface DashboardContextData {
    users: User[];
    travels: any[];
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
    const [travels, setTravels] = useState<any[]>([]);
    const [monthlyMetrics, setMonthlyMetrics] = useState<MonthlyMetrics | null>(null);
    const [availableMonths, setAvailableMonths] = useState<string[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadDashboardData = useCallback(async (targetMonth: string) => {
        if (!companyData?.id) return;

        try {
            setLoading(true);
            setError(null);

            // 1. Get all available month IDs
            const monthsRef = collection(db, "companies", companyData.id, "month");
            const monthsSnap = await getDocs(query(monthsRef, orderBy("__name__", "desc")));
            const monthsList = monthsSnap.docs.map(d => d.id);
            setAvailableMonths(["all", ...monthsList]);

            let accumulatedMetrics: MonthlyMetrics = {
                activeDrivers: 0,
                availableSeats: 0,
                co2SavedKg: 0,
                participationRate: 0,
                reservedSeats: 0,
                seatOccupancyRate: 0,
                totalTravels: 0,
                totalTrips: 0,
                totalUsers: companyData.membersIds?.length || 0,
            };

            let travelsList: any[] = [];

            if (targetMonth === "all") {
                // --- ACCUMULATION LOGIC ---
                // We loop through every month and sum the metrics
                for (const mId of monthsList) {
                    const mRef = doc(db, "companies", companyData.id, "month", mId, "metrics", "summary");
                    const mSnap = await getDoc(mRef);
                    if (mSnap.exists()) {
                        const data = mSnap.data() as MonthlyMetrics;
                        accumulatedMetrics.totalTravels += (data.totalTravels || 0);
                        accumulatedMetrics.co2SavedKg += (data.co2SavedKg || 0);
                        accumulatedMetrics.reservedSeats += (data.reservedSeats || 0);
                        accumulatedMetrics.activeDrivers += (data.activeDrivers || 0);
                        // For rates, we use averages or the latest month's value depending on preference
                        accumulatedMetrics.participationRate = data.participationRate; 
                    }
                }
                setMonthlyMetrics(accumulatedMetrics);
                setTravels([]); // Empty travels for global to maintain performance
            } else {
                // --- SPECIFIC MONTH LOGIC ---
                const metricsDocRef = doc(db, "companies", companyData.id, "month", targetMonth, "metrics", "summary");
                const metricsSnap = await getDoc(metricsDocRef);
                
                const travelsRef = collection(db, "companies", companyData.id, "month", targetMonth, "travels");
                const travelsSnap = await getDocs(travelsRef);
                
                setMonthlyMetrics(metricsSnap.exists() ? (metricsSnap.data() as MonthlyMetrics) : null);
                setTravels(travelsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
            }

            // Fetch Global Users for the Top Carpoolers ranking
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

        } catch (err) {
            console.error("❌ Sync Error:", err);
            setError("Error al sincronizar datos.");
        } finally {
            setLoading(false);
        }
    }, [companyData]);

    useEffect(() => {
        if (!authLoading && companyData?.id) {
            loadDashboardData(selectedMonth);
        }
    }, [authLoading, companyData?.id, selectedMonth, loadDashboardData]);

    const changeMonth = async (month: string) => setSelectedMonth(month);
    const refresh = async () => await loadDashboardData(selectedMonth);

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