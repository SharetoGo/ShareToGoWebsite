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
    origin: string;
    destination: string;
    travelDate: any;
    carSeatsAvailable: number;
    carSeatsTaken: number;
    reservedBy: string[];
    distance: number;
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
    
    const getCurrentMonthStr = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    };

    const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonthStr());
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