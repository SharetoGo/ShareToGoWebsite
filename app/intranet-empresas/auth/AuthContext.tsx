'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface CompanyData {
  name: string;
  email: string;
  members: string[];
  events: string[];
  partners: string[];
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
        // User is logged in, fetch their company data
        const companyDocRef = doc(db, 'companies', user.uid);
        const companyDocSnap = await getDoc(companyDocRef);
        if (companyDocSnap.exists()) {
          setCompanyData(companyDocSnap.data() as CompanyData);
        } else {
          // Handle case where user exists in Auth but not in Firestore
          setCompanyData(null);
        }
      } else {
        // User is logged out
        setCompanyData(null);
      }
      setLoading(false)
    });

    // Cleanup subscription on unmount
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