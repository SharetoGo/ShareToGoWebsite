'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'

export default function Header() {
  const [showMore, setShowMore] = useState(false)
  const extraRef = useRef<HTMLDivElement | null>(null)
  const coreRef = useRef<HTMLDivElement | null>(null)
  const [extraWidth, setExtraWidth] = useState(0)

  // measure extra panel width
  useEffect(() => {
    const measure = () => {
      if (extraRef.current) setExtraWidth(extraRef.current.offsetWidth)
    }
    measure()
    const ro = typeof ResizeObserver !== 'undefined' && extraRef.current
      ? new ResizeObserver(measure)
      : null
    if (ro && extraRef.current) ro.observe(extraRef.current)
    window.addEventListener('resize', measure)
    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const coreStyle: React.CSSProperties = {
    transform: showMore ? `translateX(-${extraWidth}px)` : 'translateX(0)',
    transition: 'transform 380ms cubic-bezier(0.2,0.8,0.2,1)'
  }

  const extraStyle: React.CSSProperties = {
    transform: showMore ? 'translateX(0)' : 'translateX(110%)',
    transition: 'transform 380ms cubic-bezier(0.2,0.8,0.2,1)'
  }

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out backdrop-blur-sm shadow-sm`}
      style={{ backgroundColor: '#9dd187' }}
    >
      <div className="max-w-8xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-2">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav
            className="hidden md:flex md:grow"
            onMouseLeave={() => setShowMore(false)}
          >
            <ul className="relative flex grow justify-end items-center h-16 md:h-20">

              {/* Core items */}
              <div
                ref={coreRef}
                style={coreStyle}
                className="flex items-center gap-0 md:gap-0"
              >
                <li>
                  <Link
                    href="/"
                    className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 transition"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contratar-sharetogo"
                    className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 transition"
                  >
                    Contratar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto-sharetogo"
                    className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 transition"
                  >
                    Contacto
                  </Link>
                </li>
              </div>

              {/* "Ver más" – only triggers open */}
              {!showMore && (
                <li
                  onMouseEnter={() => setShowMore(true)}
                  className="font-medium text-teal-950 px-5 py-3 cursor-pointer hover:text-teal-700 transition"
                >
                  Ver más ▸
                </li>
              )}

              {/* Extra menu sliding in */}
              <div
                ref={extraRef}
                style={extraStyle}
                className="absolute right-0 top-0 h-full flex items-center gap-0 md:gap-0 bg-[#9dd187]"
              >
                <li>
                  <Link href="/about-compartir-coche" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 transition">
                    Quiénes somos
                  </Link>
                </li>
                <li>
                  <Link href="/funcionamiento-carpooling-empresas" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 transition">
                    Funcionamiento de la App
                  </Link>
                </li>
                <li>
                  <Link href="/espacio-empresas" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 transition">
                    Espacio Empresas
                  </Link>
                </li>
                <li>
                  <Link href="/espacio-eventos-sharetogo" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 transition">
                    Espacio Eventos
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 transition">
                    Política de privacidad
                  </Link>
                </li>
              </div>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
