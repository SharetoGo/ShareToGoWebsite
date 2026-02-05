"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotForm, setShowForgotForm] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [reason, setReason] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Optional: Pre-verify admin status to show a specific error
      const q = query(collection(db, "companies"), where("adminIds", "array-contains", user.uid));
      const snap = await getDocs(q);

      if (snap.empty) {
        setError("No tienes permisos de administrador para acceder.");
        await auth.signOut();
      } else {
        router.push("/intranet-empresas");
      }
    } catch (err) {
      setError("Credenciales inválidas.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !reason) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/support/forgot-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: forgotEmail, reason }),
      });

      if (!res.ok) throw new Error("Error al enviar el mensaje");

      alert("Tu solicitud ha sido enviada correctamente. Te contactaremos pronto.");
      setShowForgotForm(false);
      setForgotEmail("");
      setReason("");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al enviar tu solicitud. Inténtalo más tarde.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Fondo con mesh blur */}
      <div className="absolute inset-0 bg-linear-to-br from-[#eef6ee] via-[#e7f3e6] to-[#dcecd9]" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#9dd187]/40 blur-3xl rounded-full" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[400px] h-[400px] bg-[#2a2c38]/20 blur-[140px] rounded-full" />

      {/* Tarjeta principal */}
      <div className="relative z-10 w-full max-w-lg bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        <div className="flex items-center justify-center py-3 px-4 bg-linear-to-r from-[#9dd187] to-[#b1dea0]">
          <Image
            src="/logos/side_logo.png"
            alt="ShareToGo"
            width={160}
            height={80}
            className="mx-auto drop-shadow-sm"
            priority
          />
        </div>
        <div className="h-px w-full bg-gray-100" />

        <div className="p-9">
          <h1 className="text-2xl font-bold text-[#2a2c38] mb-1 text-center">Iniciar sesión</h1>
          <h2 className="text-base text-[#2a2c38] font-medium text-center">
            Bienvenido a tu panel de empresa
          </h2>
          <p className="text-gray-500 text-sm mt-3 mb-8 text-center">
            Accede al panel sostenible de tu empresa o solicita acceso{" "}
            <Link href="/contratar" className="text-[#8bc475] font-semibold hover:underline">
              aquí
            </Link>
            .
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400 h-4 w-4" />
              <input
                type="email"
                placeholder="Dirección de correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9dd187]/70 focus:border-[#9dd187] transition"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400 h-4 w-4" />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9dd187]/70 focus:border-[#9dd187] transition"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-md border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-4 rounded-lg text-white font-semibold shadow-md transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2a2c38] hover:bg-[#1f212c] hover:shadow-lg"
              }`}
            >
              {loading ? "Accediendo..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="text-center text-xs text-gray-500 mt-8">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#9dd187] font-semibold">SharetoGo</span> — Acceso restringido al
            personal autorizado
          </div>
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
                    sending ? "bg-gray-400 cursor-not-allowed" : "bg-[#9dd187] hover:bg-[#8bc475]"
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
  );
}
