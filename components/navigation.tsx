"use client"

import { useState, useRef } from "react"
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

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileEspaciosOpen, setMobileEspaciosOpen] = useState(false)
  const [mobileAyudaOpen, setMobileAyudaOpen] = useState(false)
  const [openEspacios, setOpenEspacios] = useState(false)
  const [openAyuda, setOpenAyuda] = useState(false)
  const hideEspaciosTO = useRef<NodeJS.Timeout | null>(null)
  const hideAyudaTO = useRef<NodeJS.Timeout | null>(null)

  const pathname = usePathname()

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

  // Ahora excluimos Contacto (va dentro de Ayuda) en lugar de Quiénes somos
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
  // Ayuda activo: FAQs o Contacto
  const ayudaIsActive =
    pathname.startsWith("/faqs") || pathname.startsWith("/contacto")

  // helpers hover
  const openWithHover = (setter: (b: boolean) => void, toRef: React.MutableRefObject<NodeJS.Timeout | null>) => {
    if (toRef.current) clearTimeout(toRef.current)
    setter(true)
  }
  const closeWithDelay = (setter: (b: boolean) => void, toRef: React.MutableRefObject<NodeJS.Timeout | null>) => {
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
            {/* Enlaces directos (Contacto ya no aparece aquí; ahora Quiénes somos sí) */}
            {itemsSinEspaciosNiAyuda.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${linkBase} ${isActive(item.href) ? linkActive : ""}`}
              >
                {item.label}
              </Link>
            ))}

            {/* Espacios (hover) */}
            <div
              className="relative"
              onMouseEnter={() => openWithHover(setOpenEspacios, hideEspaciosTO)}
              onMouseLeave={() => closeWithDelay(setOpenEspacios, hideEspaciosTO)}
            >
              <DropdownMenu open={openEspacios} onOpenChange={setOpenEspacios} modal={false}>
                <DropdownMenuTrigger
                  className={`${linkBase} inline-flex items-center gap-1 ${espaciosIsActive ? linkActive : ""} focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0`}
                >
                  Espacios <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  onMouseEnter={() => openWithHover(setOpenEspacios, hideEspaciosTO)}
                  onMouseLeave={() => closeWithDelay(setOpenEspacios, hideEspaciosTO)}
                >
                  <DropdownMenuItem
                    asChild
                    className="focus:bg-green-50 data-[highlighted]:bg-green-50 data-[highlighted]:text-green-700 focus-visible:outline-none"
                  >
                    <Link href="/espacio-empresas" className="w-full">Empresas</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="focus:bg-green-50 data-[highlighted]:bg-green-50 data-[highlighted]:text-green-700 focus-visible:outline-none"
                  >
                    <Link href="/espacio-eventos" className="w-full">Eventos</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Ayuda (hover) → FAQs + Contacto */}
            <div
              className="relative"
              onMouseEnter={() => openWithHover(setOpenAyuda, hideAyudaTO)}
              onMouseLeave={() => closeWithDelay(setOpenAyuda, hideAyudaTO)}
            >
              <DropdownMenu open={openAyuda} onOpenChange={setOpenAyuda} modal={false}>
                <DropdownMenuTrigger
                  className={`${linkBase} inline-flex items-center gap-1 ${ayudaIsActive ? linkActive : ""} focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0`}
                >
                  Ayuda <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  onMouseEnter={() => openWithHover(setOpenAyuda, hideAyudaTO)}
                  onMouseLeave={() => closeWithDelay(setOpenAyuda, hideAyudaTO)}
                >
                  <DropdownMenuItem
                    asChild
                    className="focus:bg-green-50 data-[highlighted]:bg-green-50 data-[highlighted]:text-green-700 focus-visible:outline-none"
                  >
                    <Link href="/faqs" className="w-full">FAQs</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="focus:bg-green-50 data-[highlighted]:bg-green-50 data-[highlighted]:text-green-700 focus-visible:outline-none"
                  >
                    <Link href="/contacto" className="w-full">Contacto</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* CTA */}
            <Link
              href="https://apps.apple.com/us/app/sharetogo-carpooling/id6746420222"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2a2c38] hover:text-[#9dd187] transition-colors duration-200 font-medium"
            >
              <Button className="bg-[#9dd187] hover:bg-[#8bc475] text-white">Descarga la app</Button>
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
              <Link
                href="/"
                className={`block px-3 py-2 ${linkBase} ${isActive("/") ? linkActive : ""}`}
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>

              <Link
                href="/funcionamiento"
                className={`block px-3 py-2 ${linkBase} ${isActive("/funcionamiento") ? linkActive : ""}`}
                onClick={() => setIsOpen(false)}
              >
                Cómo funciona
              </Link>

              {/* Espacios (acordeón móvil) */}
              <button
                className="flex w-full items-center justify-between px-3 py-2 text-left font-medium text-[#2a2c38] focus-visible:outline-none"
                onClick={() => setMobileEspaciosOpen((v) => !v)}
                aria-expanded={mobileEspaciosOpen}
              >
                Espacios
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileEspaciosOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileEspaciosOpen && (
                <div className="ml-4">
                  <Link
                    href="/espacio-empresas"
                    className={`block px-3 py-2 ${linkBase} ${isActive("/espacio-empresas") ? linkActive : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Empresas
                  </Link>
                  <Link
                    href="/espacio-eventos"
                    className={`block px-3 py-2 ${linkBase} ${isActive("/espacio-eventos") ? linkActive : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Eventos
                  </Link>
                </div>
              )}

              {/* Ayuda (acordeón móvil) → FAQs + Contacto */}
              <button
                className="flex w-full items-center justify-between px-3 py-2 text-left font-medium text-[#2a2c38] focus-visible:outline-none"
                onClick={() => setMobileAyudaOpen((v) => !v)}
                aria-expanded={mobileAyudaOpen}
              >
                Ayuda
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileAyudaOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAyudaOpen && (
                <div className="ml-4">
                  <Link
                    href="/faqs"
                    className={`block px-3 py-2 ${linkBase} ${isActive("/faqs") ? linkActive : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    FAQs
                  </Link>
                  <Link
                    href="/contacto"
                    className={`block px-3 py-2 ${linkBase} ${isActive("/contacto") ? linkActive : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Contacto
                  </Link>
                </div>
              )}

              {/* Donde antes estaba Contacto, ahora va Quiénes somos */}
              <Link
                href="/quienes-somos"
                className={`block px-3 py-2 ${linkBase} ${isActive("/quienes-somos") ? linkActive : ""}`}
                onClick={() => setIsOpen(false)}
              >
                Quiénes somos
              </Link>

              <Link
                href="/contratar"
                className={`block px-3 py-2 ${linkBase} ${isActive("/contratar") ? linkActive : ""}`}
                onClick={() => setIsOpen(false)}
              >
                Contratar
              </Link>

              <div className="px-3 py-2">
                <Button className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white">
                  Descarga la app
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
