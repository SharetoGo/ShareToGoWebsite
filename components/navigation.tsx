"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { QRCodeCanvas } from "qrcode.react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileEspaciosOpen, setMobileEspaciosOpen] = useState(false)
  const [mobileAyudaOpen, setMobileAyudaOpen] = useState(false)
  const [openEspacios, setOpenEspacios] = useState(false)
  const [openAyuda, setOpenAyuda] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const hideEspaciosTO = useRef<NodeJS.Timeout | null>(null)
  const hideAyudaTO = useRef<NodeJS.Timeout | null>(null)

  const pathname = usePathname()
  const qrLink = "https://sharetogo.es/downloads"

  // --- Detect mobile screen size ---
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/funcionamiento", label: "Cómo funciona" },
    { href: "/espacio-empresas", label: "Espacio Empresas" },
    { href: "/espacio-eventos", label: "Espacio Eventos" },
    { href: "/faqs", label: "FAQs" },
    { href: "/quienes-somos", label: "Quiénes somos" },
    { href: "/contacto", label: "Contacto" },
    { href: "/contratar", label: "Contratar" },
  ]

  const itemsSinEspaciosNiAyuda = navItems.filter(
    (i) =>
      i.href !== "/espacio-empresas" &&
      i.href !== "/espacio-eventos" &&
      i.href !== "/faqs" &&
      i.href !== "/contacto"
  )

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const linkBase =
    "font-medium transition-colors duration-200 whitespace-nowrap text-[#2a2c38] hover:text-[#9dd187]"
  const linkActive = "text-[#9dd187] font-semibold"

  const espaciosIsActive =
    pathname.startsWith("/espacio-empresas") || pathname.startsWith("/espacio-eventos")
  const ayudaIsActive =
    pathname.startsWith("/faqs") || pathname.startsWith("/contacto")

  const openWithHover = (
    setter: (b: boolean) => void,
    toRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    if (toRef.current) clearTimeout(toRef.current)
    setter(true)
  }
  const closeWithDelay = (
    setter: (b: boolean) => void,
    toRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    if (toRef.current) clearTimeout(toRef.current)
    toRef.current = setTimeout(() => setter(false), 120)
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" aria-label="Ir al inicio" className="flex items-center gap-2">
            <Image
              src="/logos/side_logo.png"
              alt="SharetoGo"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {itemsSinEspaciosNiAyuda.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${linkBase} ${isActive(item.href) ? linkActive : ""}`}
              >
                {item.label}
              </Link>
            ))}

            {/* Espacios dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openWithHover(setOpenEspacios, hideEspaciosTO)}
              onMouseLeave={() => closeWithDelay(setOpenEspacios, hideEspaciosTO)}
            >
              <DropdownMenu open={openEspacios} onOpenChange={setOpenEspacios} modal={false}>
                <DropdownMenuTrigger
                  className={`${linkBase} inline-flex items-center gap-1 ${espaciosIsActive ? linkActive : ""} focus-visible:outline-none`}
                >
                  Espacios <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  onMouseEnter={() => openWithHover(setOpenEspacios, hideEspaciosTO)}
                  onMouseLeave={() => closeWithDelay(setOpenEspacios, hideEspaciosTO)}
                >
                  <DropdownMenuItem asChild>
                    <Link href="/espacio-empresas" className="w-full">
                      Empresas
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/espacio-eventos" className="w-full">
                      Eventos
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Ayuda dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openWithHover(setOpenAyuda, hideAyudaTO)}
              onMouseLeave={() => closeWithDelay(setOpenAyuda, hideAyudaTO)}
            >
              <DropdownMenu open={openAyuda} onOpenChange={setOpenAyuda} modal={false}>
                <DropdownMenuTrigger
                  className={`${linkBase} inline-flex items-center gap-1 ${ayudaIsActive ? linkActive : ""} focus-visible:outline-none`}
                >
                  Ayuda <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  onMouseEnter={() => openWithHover(setOpenAyuda, hideAyudaTO)}
                  onMouseLeave={() => closeWithDelay(setOpenAyuda, hideAyudaTO)}
                >
                  <DropdownMenuItem asChild>
                    <Link href="/faqs" className="w-full">
                      FAQs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/contacto" className="w-full">
                      Contacto
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

         

            {/* CTA with QR code */}
            <div
              className="relative"
              onMouseEnter={() => !isMobile && setShowQR(true)}
              onMouseLeave={() => !isMobile && setShowQR(false)}
            >
              <Link href={"/descargar"} className="w-full">
                <Button className="bg-[#9dd187] hover:bg-[#8bc475] text-white">
                  Descarga la app
                </Button>
              </Link>

              <AnimatePresence>
                {showQR && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white border rounded-2xl shadow-lg p-3 z-50"
                  >
                    <QRCodeCanvas value={qrLink} size={120} />
                    <p className="text-xs text-center mt-2 text-[#2a2c38]">
                      Escanea para descargar
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 🔹 Nuevo botón: Intranet Empresas */}
            <Link href="/intranet-empresas" className="w-full">
              <Button
                variant="outline"
                className="border-[#9dd187] text-[#9dd187] hover:bg-[#9dd187] hover:text-white transition-colors"
              >
                Iniciar sesión
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#2a2c38]"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {itemsSinEspaciosNiAyuda.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 ${linkBase}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Espacios accordion */}
              <button
                className="flex w-full items-center justify-between px-3 py-2 text-left font-medium text-[#2a2c38]"
                onClick={() => setMobileEspaciosOpen((v) => !v)}
              >
                Espacios
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileEspaciosOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileEspaciosOpen && (
                <div className="ml-4">
                  <Link
                    href="/espacio-empresas"
                    className={`block px-3 py-2 ${linkBase}`}
                    onClick={() => {
                      setIsOpen(false)
                      setMobileEspaciosOpen(false)
                    }}
                  >
                    Empresas
                  </Link>
                  <Link
                    href="/espacio-eventos"
                    className={`block px-3 py-2 ${linkBase}`}
                    onClick={() => {
                      setIsOpen(false)
                      setMobileEspaciosOpen(false)
                    }}
                  >
                    Eventos
                  </Link>
                </div>
              )}

              {/* Ayuda accordion */}
              <button
                className="flex w-full items-center justify-between px-3 py-2 text-left font-medium text-[#2a2c38]"
                onClick={() => setMobileAyudaOpen((v) => !v)}
              >
                Ayuda
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileAyudaOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAyudaOpen && (
                <div className="ml-4">
                  <Link
                    href="/faqs"
                    className={`block px-3 py-2 ${linkBase}`}
                    onClick={() => {
                      setIsOpen(false)
                      setMobileAyudaOpen(false)
                    }}
                  >
                    FAQs
                  </Link>
                  <Link
                    href="/contacto"
                    className={`block px-3 py-2 ${linkBase}`}
                    onClick={() => {
                      setIsOpen(false)
                      setMobileAyudaOpen(false)
                    }}
                  >
                    Contacto
                  </Link>
                </div>
              )}

              <Link
                href="/quienes-somos"
                className={`block px-3 py-2 ${linkBase}`}
                onClick={() => setIsOpen(false)}
              >
                Quiénes somos
              </Link>

              <Link
                href="/contratar"
                className={`block px-3 py-2 ${linkBase}`}
                onClick={() => setIsOpen(false)}
              >
                Contratar
              </Link>

              {/* 🔹 Nuevo: Intranet Empresas (versión móvil) */}
              <Link
                href="/intranet"
                className={`block px-3 py-2 ${linkBase}`}
                onClick={() => setIsOpen(false)}
              >
                Intranet Empresas
              </Link>

              <div className="px-3 py-2">
                <Link
                  href={"/descargar"}
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white">
                    Descarga la app
                  </Button>
                </Link>
                <div className="flex justify-center mt-3">
                  <QRCodeCanvas value={qrLink} size={120} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
