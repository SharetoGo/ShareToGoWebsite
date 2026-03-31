// app/intranet-empresas/auth/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

interface Zone {
  key: string;
  region: string;
}

export interface CompanyData {
  id: string;
  name: string;
  email: string;
  accessCode: string;
  accessCodeDisplay: string;
  partners: string[];
  totalCo2: number;
  totalDrivers: number;
  totalKm: number;
  totalPassengers: number;
  totalTravels: number;
  totalTrips: number;
  tripsRestricted: boolean;
  logoUrl: string;
  industry: string;
  employeeCount: number;
  travels: string[];
  headquarters: string[];
  co2Target: number;
  zones: Zone[];
  adminIds: string[];
  membersIds: string[];
  blockedIds: string[];
}

interface AuthContextType {
  user: FirebaseUser | null;
  companyData: CompanyData | null;
  loading: boolean;
  error: string | null;
  switchCompany: (companyId: string) => Promise<void>;
}

/* ═══════════════════════════════════════════════════════════
   CONTEXT
   ═══════════════════════════════════════════════════════════ */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ═══════════════════════════════════════════════════════════
   PROVIDER
   ═══════════════════════════════════════════════════════════ */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const switchCompany = async (companyId: string) => {
    if (!user) return;
    try {
      setLoading(true);
      const docRef = doc(db, 'companies', companyId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() } as CompanyData;
        // Verify user is still an admin of this company
        if (data.adminIds.includes(user.uid)) {
          localStorage.setItem('selectedCompanyId', companyId);
          setCompanyData(data);
        }
      }
    } catch (err) {
      console.error("Error switching company:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          setError(null);

          // 1. Check if we have a specific company selected in this session
          const selectedId = localStorage.getItem('selectedCompanyId');

          // 2. Fetch companies for the user
          const companiesRef = collection(db, 'companies');
          const q = query(
            companiesRef,
            where("adminIds", "array-contains", firebaseUser.uid)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // 3. If no ID in storage, or the ID is no longer valid, default to the first one
            const userCompanies = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as CompanyData[];

            const activeCompany =
              userCompanies.find((c) => c.id === selectedId) || userCompanies[0];

            setCompanyData(activeCompany);
          } else {
            console.warn("⚠️ El usuario no es administrador de ninguna empresa");
            setCompanyData(null);
            setError("No autorizado para acceder a ninguna empresa");
          }
        } else {
          setUser(null);
          setCompanyData(null);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        console.error("❌ Error en autenticación:", errorMessage);
        setError(errorMessage);
        setCompanyData(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    companyData,
    loading,
    error,
    switchCompany,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* ═══════════════════════════════════════════════════════════
   HOOK
   ═══════════════════════════════════════════════════════════ */

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};