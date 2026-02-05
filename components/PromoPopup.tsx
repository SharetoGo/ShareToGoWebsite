"use client";

import { useState, useEffect } from "react";
import Logo from "./ui/logo";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Mostrar popup 1.5s después de entrar, si no ha participado
  useEffect(() => {
    if (localStorage.getItem("promoEmailSubmitted") !== "true") {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Hook para capturar tamaño de pantalla (necesario para Confetti)
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setShowConfetti(true);
        localStorage.setItem("promoEmailSubmitted", "true");
      }
    } catch (error) {
      console.error("Error al enviar el email:", error);
      setIsSubmitted(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      {/* 🎊 Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={220}
          gravity={0.25}
          recycle={false}
        />
      )}

      <div className="rounded-2xl shadow-xl max-w-xl w-full transform transition-all scale-100 overflow-hidden border border-[#e0ecd5] bg-white">
        {/* Header */}
        <div className="relative p-4 border-b border-gray-100 flex justify-between items-center bg-[#e0ecd5]">
          <div className="w-24">
            <Logo />
          </div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 text-center bg-[#f8faf8]">
          {!isSubmitted ? (
            <>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2a2c38] mb-4">
                ¡Consigue <span className="text-[#9dd187]">5€</span> de gasolina GRATIS!
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <input
                  type="email"
                  placeholder="Tu mejor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#9dd187] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2a2c38] focus:border-transparent transition bg-white placeholder-gray-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#2a2c38] text-white font-bold text-lg rounded-lg hover:bg-[#9dd187] hover:text-[#2a2c38] transform hover:scale-[1.03] transition-all shadow-lg"
                >
                  ¡LO QUIERO!
                </button>
              </form>

              <p className="text-gray-700 mt-4 text-sm">
                Indica tu email y te enviaremos al instante un PDF con todos los detalles del vale.
              </p>

              <p className="font-semibold text-[#2a2c38] mt-6">SharetoGo</p>

              <p className="text-xs text-gray-500 mt-4 italic">
                *Vale disponible solo para un número limitado de asistentes al evento.
              </p>
            </>
          ) : (
            <div className="py-8">
              <p className="text-xl md:text-2xl font-semibold text-[#2a2c38] leading-relaxed">
                ¡Hemos recibido tu email! 🎉 Revisa tu bandeja de entrada para ver los detalles del
                vale.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
