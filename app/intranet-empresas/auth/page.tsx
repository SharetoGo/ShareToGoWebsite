"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { collection, query, where, getDocs } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import Image from "next/image"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Globe } from "lucide-react"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForgotForm, setShowForgotForm] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [reason, setReason] = useState("")
  const [sending, setSending] = useState(false)
  const router = useRouter()

// Inside handleLogin function
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Find all companies where this user is an admin
    const q = query(collection(db, 'companies'), where("adminIds", "array-contains", user.uid));
    const snap = await getDocs(q);

    if (snap.empty) {
      setError("No tienes permisos de administrador.");
      await auth.signOut();
      return;
    }

    const companies = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Logic: If user is admin of "SharetoGo" (SuperAdmin) OR has multiple companies
    const isSuperAdmin = companies.some((c: any) => c.name === "SharetoGo");

    if (isSuperAdmin || companies.length > 1) {
      // Redirect to the new selection bubble page
      router.push("/intranet-empresas/seleccion");
    } else {
      // Just one company, go straight to dashboard
      // We'll store the companyId in localStorage so the Layout knows which one to load
      localStorage.setItem('selectedCompanyId', companies[0].id);
      router.push("/intranet-empresas");
    }
  } catch (err) {
    setError("Credenciales inválidas.");
  } finally {
    setLoading(false);
  }
};

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!forgotEmail || !reason) {
      alert("Por favor completa todos los campos.")
      return
    }

    setSending(true)
    try {
      const res = await fetch("/api/support/forgot-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: forgotEmail, reason }),
      })

      if (!res.ok) throw new Error("Error al enviar el mensaje")

      alert("Tu solicitud ha sido enviada correctamente. Te contactaremos pronto.")
      setShowForgotForm(false)
      setForgotEmail("")
      setReason("")
    } catch (error) {
      console.error(error)
      alert("Hubo un problema al enviar tu solicitud. Inténtalo más tarde.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Modern Background with animated-like gradients */}
      <div className="absolute inset-0 bg-[#f8fafc]" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#9dd187]/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2a2c38]/10 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/80 backdrop-blur-xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden border border-white/20">
        
        {/* Left Side: Visual/Marketing (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-[#2a2c38] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Globe size={300} className="text-[#9dd187]" />
          </div>
          
          <div className="relative z-10">
            <Image
              src="/logos/side_logo.png"
              alt="ShareToGo"
              width={180}
              height={60}
              className="brightness-0 invert mb-12"
            />
            <h2 className="text-4xl font-black leading-tight mb-6">
              Gestiona el impacto <br />
              <span className="text-[#9dd187]">sostenible</span> de tu equipo.
            </h2>
            <p className="text-gray-400 text-lg font-medium max-w-xs">
              Accede a métricas en tiempo real, reportes ESG y herramientas de fidelización.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="p-2 bg-[#9dd187] rounded-xl">
              <ShieldCheck className="text-[#2a2c38]" size={20} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-300">
              Portal de Administración Seguro
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="lg:hidden mb-8">
            <Image src="/logos/side_logo.png" alt="ShareToGo" width={140} height={50} className="mx-auto" />
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-black text-[#2a2c38] mb-2">Bienvenido</h1>
            <p className="text-gray-500 font-medium">Introduce tus credenciales para acceder al panel.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#9dd187] transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="nombre@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#9dd187] focus:outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contraseña</label>
                <button type="button" onClick={() => setShowForgotForm(true)} className="text-[10px] font-black uppercase tracking-widest text-[#9dd187] hover:underline">¿Olvidaste tu clave?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#9dd187] transition-colors" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#9dd187] focus:outline-none transition-all font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2a2c38] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-3 rounded-xl border border-red-100 animate-in fade-in zoom-in duration-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading} 
              className="w-full py-4 px-6 bg-[#2a2c38] text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-black hover:shadow-xl hover:shadow-[#2a2c38]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? "Verificando..." : "Entrar al Panel"}
              {!loading && <ArrowRight size={16} className="text-[#9dd187] group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400 font-medium">
            ¿No tienes cuenta?{" "}
            <Link href="/contratar" className="text-[#2a2c38] font-black hover:text-[#9dd187] transition-colors">
              Solicita una demo
            </Link>
          </p>
        </div>
      </div>

      {/* Modal de recuperación */}
      {showForgotForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 relative">
            <h3 className="text-xl font-semibold text-[#2a2c38] text-center mb-4">
              Recuperar acceso
            </h3>
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#9dd187]/70 focus:border-[#9dd187] outline-none"
                required
              />

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reason"
                    value="Necesito una nueva contraseña"
                    checked={reason === "Necesito una nueva contraseña"}
                    onChange={(e) => setReason(e.target.value)}
                    className="text-[#9dd187] focus:ring-[#9dd187]"
                  />
                  <span>Necesito una nueva contraseña</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reason"
                    value="He olvidado mi contraseña"
                    checked={reason === "He olvidado mi contraseña"}
                    onChange={(e) => setReason(e.target.value)}
                    className="text-[#9dd187] focus:ring-[#9dd187]"
                  />
                  <span>He olvidado mi contraseña</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reason"
                    value="Mi cuenta está bloqueada"
                    checked={reason === "Mi cuenta está bloqueada"}
                    onChange={(e) => setReason(e.target.value)}
                    className="text-[#9dd187] focus:ring-[#9dd187]"
                  />
                  <span>Mi cuenta está bloqueada</span>
                </label>
              </div>

              <div className="flex justify-between gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForgotForm(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className={`flex-1 py-2 rounded-md text-white transition ${
                    sending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#9dd187] hover:bg-[#8bc475]"
                  }`}
                >
                  {sending ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
