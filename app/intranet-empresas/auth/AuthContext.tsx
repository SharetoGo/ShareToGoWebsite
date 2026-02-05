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
}

interface AuthContextType {
  user: FirebaseUser | null;
  companyData: CompanyData | null;
  loading: boolean;
  error: string | null;
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

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let isMounted = true;

    try {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
          if (!isMounted) return;

          setUser(firebaseUser);
          setError(null);

          if (firebaseUser?.uid) {
            // Fetch company data
            const companiesRef = collection(db, 'companies');
            const q = query(
              companiesRef,
              where("adminIds", "array-contains", firebaseUser.uid)
            );

            const querySnapshot = await getDocs(q);

            if (!isMounted) return;

            if (!querySnapshot.empty) {
              const companyDoc = querySnapshot.docs[0];
              const docData = {
                id: companyDoc.id,
                ...companyDoc.data()
              } as CompanyData;

              setCompanyData(docData);
              console.log("✅ Acceso concedido a la empresa:", docData.name);
            } else {
              console.warn("⚠️ El usuario no es administrador de ninguna empresa");
              setCompanyData(null);
              setError("No autorizado para acceder a ninguna empresa");
            }
          } else {
            setCompanyData(null);
          }
        } catch (err) {
          if (!isMounted) return;

          const errorMessage = err instanceof Error ? err.message : "Error desconocido";
          console.error("❌ Error en autenticación:", errorMessage);
          setError(errorMessage);
          setCompanyData(null);
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      });
    } catch (err) {
      if (isMounted) {
        const errorMessage = err instanceof Error ? err.message : "Error desconocido";
        console.error("❌ Error inicializando AuthProvider:", errorMessage);
        setError(errorMessage);
        setLoading(false);
      }
    }

    // Cleanup function
    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const value: AuthContextType = {
    user,
    companyData,
    loading,
    error
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