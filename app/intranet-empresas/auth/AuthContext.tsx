'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface Zone {
  key: string;
  region: string;
}

interface CompanyData {
  adminIds: string[];
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
  headquarters: string[];
  co2Target: number;
  zones: Zone[];
}

interface AuthContextType {
  user: User | null;
  companyData: CompanyData | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  companyData: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setUser(user);
    
    if (user) {
      try {
        // 1. Create a query to find companies where adminIds array contains user.uid
        const companiesRef = collection(db, 'companies');
        const q = query(companiesRef, where("adminIds", "array-contains", user.uid));
        
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // 2. Take the first company found
          const docData = querySnapshot.docs[0].data() as CompanyData;
          console.log("Acceso concedido a la empresa:", docData.name);
          setCompanyData(docData);
        } else {
          console.error("El usuario no es administrador de ninguna empresa.");
          setCompanyData(null);
        }
      } catch (err) {
        console.error("Error fetching company data:", err);
        setCompanyData(null);
      }
    } else {
      setCompanyData(null);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);
  return (
    <AuthContext.Provider value={{ user, companyData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};