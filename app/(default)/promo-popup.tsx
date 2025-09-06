'use client'

import { useState, useEffect } from 'react'
import Logo from '@/components/ui/logo'
import Confetti from 'react-confetti'

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Email submitted and notification sent!');
        setShowConfetti(true);
        // Close the popup after the confetti animation
        setTimeout(() => {
          handleClose();
        }, 5000); // Let confetti run for 5 seconds
      }
    } catch (error) {
      console.error('Failed to submit email:', error)
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      {showConfetti && <Confetti />}
      <div style={{ backgroundColor: '#9dd187' } } className="rounded-2xl shadow-2xl max-w-xl w-full transform transition-all scale-100 animate-in-fast">
        {/* Header */}
        <div className="relative p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="w-24">
            <Logo />
          </div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-black mb-4 animate-pulse-slow">
            ¡Consigue 5€ de gasolina GRATIS!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <input
              type="email"
              placeholder="Tu mejor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-800 text-white font-bold text-lg rounded-lg hover:bg-green-900 transform hover:scale-105 transition-all shadow-lg"
            >
              ¡LO QUIERO!
            </button>
          </form>

          <p className="text-gray-700 mt-4 text-sm">
            Indica tu mail y te enviaremos un PDF al instante con todos los detalles del vale.
          </p>

          <p className="font-semibold text-gray-800 mt-6">
            SharetoGo
          </p>

          <p className="text-xs text-gray-700 mt-4 italic">
            *vale disponible únicamente para un número limitado de asistentes al evento, ¡no te lo pierdas!
          </p>
        </div>
      </div>
    </div>
  )
}