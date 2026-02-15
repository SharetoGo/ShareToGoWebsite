"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../auth/AuthContext"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Image from "next/image"
import { Building2, ChevronRight, Sparkles } from "lucide-react"

export default function SelectionPage() {
  const { user, loading, switchCompany } = useAuth()
  const [companies, setCompanies] = useState<any[]>([])
  const [fetching, setFetching] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function getAdminCompanies() {
      if (!user) return
      const q = query(collection(db, 'companies'), where("adminIds", "array-contains", user.uid))
      const snap = await getDocs(q)
      setCompanies(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setFetching(false)
    }
    if (!loading) getAdminCompanies()
  }, [user, loading])

  const selectCompany = async (companyId: string) => {
    await switchCompany(companyId) // This updates the global state
    router.push("/intranet-empresas") // Now when we redirect, the data is already there
  }

  if (fetching) return <div className="h-screen flex items-center justify-center">Cargando empresas...</div>

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8fafc] to-[#eef6ee] flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#9dd187]/10 text-[#2a2c38] px-4 py-2 rounded-full mb-4">
          <Sparkles size={16} className="text-[#9dd187]" />
          <span className="text-xs font-bold uppercase tracking-widest">Panel Multicompany</span>
        </div>
        <h1 className="text-4xl font-black text-[#2a2c38]">Bienvenido, {user?.email?.split('@')[0]}</h1>
        <p className="text-gray-500 mt-2 font-medium">Selecciona la organización que deseas gestionar hoy.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
        {companies.map((company) => (
          <button
            key={company.id}
            onClick={() => selectCompany(company.id)}
            className="group relative flex flex-col items-center"
          >
            {/* The Bubble */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-xl border-4 border-transparent group-hover:border-[#9dd187] transition-all duration-500 flex items-center justify-center overflow-hidden mb-4 relative z-10 group-hover:scale-110 group-active:scale-95">
              {company.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              ) : (
                <Building2 size={40} className="text-gray-300" />
              )}
            </div>
            
            {/* Label */}
            <div className="text-center">
              <p className="font-bold text-[#2a2c38] text-lg group-hover:text-[#9dd187] transition-colors">{company.name}</p>
              <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black uppercase text-gray-400">Acceder</span>
                <ChevronRight size={10} className="text-[#9dd187]" />
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-[#9dd187]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-150 z-0" />
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => router.push('/intranet-empresas/auth')}
        className="mt-16 text-gray-400 text-sm font-medium hover:text-red-500 hover:font-bold transition-colors"
      >
        Cerrar sesión y salir
      </button>
    </div>
  )
}