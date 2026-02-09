"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { QRCodeCanvas } from "qrcode.react"
import { MdLanguage } from "react-icons/md"

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
  const { t, i18n } = useTranslation()

  const qrLink = "https://sharetogo.es/downloads"

  // Detect mobile size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const linkBase =
    "font-medium text-xs xl:text-sm transition-colors duration-200 whitespace-nowrap text-[#2a2c38] hover:text-[#9dd187]"
  const linkActive = "text-[#9dd187] font-semibold"

  // Language options
  const languageOptions = [
    { code: "es", label: "Español" },
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ] as const

  type LanguageCode = (typeof languageOptions)[number]["code"]

  const currentLanguage =
    languageOptions.find((option) => i18n.language?.startsWith(option.code))?.code ?? "es"

  const handleLanguageChange = (lng: LanguageCode) => {
    if (lng === currentLanguage) return
    i18n.changeLanguage(lng)
  }

  const logoDimensions =
    currentLanguage === "fr"
      ? { width: 120, height: 50 }
      : { width: 160, height: 50 }

  // Hover helpers
  const openWithHover = (
    setter: (value: boolean) => void,
    toRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    if (toRef.current) clearTimeout(toRef.current)
    setter(true)
  }

  const closeWithDelay = (
    setter: (value: boolean) => void,
    toRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    if (toRef.current) clearTimeout(toRef.current)
    toRef.current = setTimeout(() => setter(false), 120)
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center h-16 gap-4">

          {/* LOGO */}
          <Link href="/" aria-label={t("nav_aria_home")} className="flex items-center gap-2 shrink-0">
            <Image
              src="/logos/side_logo.png"
              alt="SharetoGo"
              width={logoDimensions.width}
              height={logoDimensions.height}
              className="h-12 w-auto shrink-0"
              priority
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center justify-end gap-x-6 flex-1 min-w-0">

            <Link href="/" className={`${linkBase} ${pathname === "/" ? linkActive : ""}`}>
              {t("nav_inicio")}
            </Link>

            <Link href="/funcionamiento" className={`${linkBase} ${isActive("/funcionamiento") ? linkActive : ""}`}>
              {t("nav_funcionamiento")}
            </Link>

            <Link href="/quienes-somos" className={`${linkBase} ${isActive("/quienes-somos") ? linkActive : ""}`}>
              {t("nav_quienes")}
            </Link>

            {/* ESPACIOS */}
            <div
              className="relative"
              onMouseEnter={() => openWithHover(setOpenEspacios, hideEspaciosTO)}
              onMouseLeave={() => closeWithDelay(setOpenEspacios, hideEspaciosTO)}
            >
              <DropdownMenu open={openEspacios} onOpenChange={setOpenEspacios} modal={false}>
                <DropdownMenuTrigger
                  className={`${linkBase} inline-flex items-center gap-1 ${isActive("/espacio") ? linkActive : ""}`}
                >
                  {t("nav_espacios")} <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <Link href="/espacio-empresas">{t("nav_empresas_simple")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/consultoria-de-sostenibilidad">{t("nav_consultoria_sostenibilidad")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/zonas-favoritas">{t("nav_eventos_simple")}</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* AYUDA */}
            <div
              className="relative"
              onMouseEnter={() => openWithHover(setOpenAyuda, hideAyudaTO)}
              onMouseLeave={() => closeWithDelay(setOpenAyuda, hideAyudaTO)}
            >
              <DropdownMenu open={openAyuda} onOpenChange={setOpenAyuda} modal={false}>
                <DropdownMenuTrigger
                  className={`${linkBase} inline-flex items-center gap-1 ${isActive("/faqs") || isActive("/contacto") ? linkActive : ""}`}
                >
                  {t("nav_ayuda")} <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild><Link href="/faqs">{t("nav_faqs")}</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/contacto">{t("nav_contacto")}</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/contratar">{t("nav_contratar")}</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* 🌐 IDIOMA (ES/EN/FR compacto) */}
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-2 py-1 text-sm">
                <MdLanguage className="w-4 h-4" />
                <span className="uppercase">{currentLanguage}</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                {languageOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.code}
                    className="flex items-center gap-3 cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault()
                      handleLanguageChange(option.code)
                    }}
                  >
                    <span className="font-semibold uppercase">{option.code}</span>
                    <span className="flex-1">{option.label}</span>
                    {currentLanguage === option.code && (
                      <span className="text-xs font-semibold text-[#9dd187]">●</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* LOGIN */}
            <Link href="/intranet-empresas">
              <Button
                variant="outline"
                className="border-[#9dd187] text-[#9dd187] hover:bg-[#9dd187] hover:text-white"
              >
                {t("nav_login")}
              </Button>
            </Link>

            {/* DESCARGAR */}
            <div
              className="relative"
              onMouseEnter={() => !isMobile && setShowQR(true)}
              onMouseLeave={() => !isMobile && setShowQR(false)}
            >
              <Link href="/descargar">
                <Button className="bg-[#9dd187] hover:bg-[#8bc475] text-white">
                  {t("nav_descarga")}
                </Button>
              </Link>
              {!isMobile && showQR && (
                <div className="absolute top-full right-0 mt-3">
                  <div className="bg-white border rounded-2xl shadow-lg p-3 flex flex-col items-center gap-2 w-40">
                    <QRCodeCanvas value={qrLink} size={110} />
                    <p className="text-xs text-[#2a2c38] leading-tight text-center">
                      {t("nav_descargar_app")}
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">

              <Link href="/" className={`block px-3 py-2 text-sm ${linkBase}`} onClick={() => setIsOpen(false)}>
                {t("nav_inicio")}
              </Link>

              <Link href="/funcionamiento" className={`block px-3 py-2 text-sm ${linkBase}`} onClick={() => setIsOpen(false)}>
                {t("nav_funcionamiento")}
              </Link>

              <Link href="/quienes-somos" className={`block px-3 py-2 text-sm ${linkBase}`} onClick={() => setIsOpen(false)}>
                {t("nav_quienes")}
              </Link>

              {/* ESPACIOS MOBILE */}
              <button
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium"
                onClick={() => setMobileEspaciosOpen(v => !v)}
              >
                {t("nav_espacios")}
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileEspaciosOpen ? "rotate-180" : ""}`} />
              </button>

              {mobileEspaciosOpen && (
                <div className="ml-4">
                  <Link href="/espacio-empresas" className="block px-3 py-2 text-sm" onClick={() => setIsOpen(false)}>
                    {t("nav_empresas_simple")}
                  </Link>
                  <Link href="/consultoria-de-sostenibilidad" className="block px-3 py-2 text-sm" onClick={() => setIsOpen(false)}>
                    {t("nav_consultoria_sostenibilidad")}
                  </Link>
                  <Link href="/zonas-favoritas" className="block px-3 py-2 text-sm" onClick={() => setIsOpen(false)}>
                    {t("nav_eventos_simple")}
                  </Link>
                </div>
              )}

              {/* AYUDA MOBILE */}
              <button
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium"
                onClick={() => setMobileAyudaOpen(v => !v)}
              >
                {t("nav_ayuda")}
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileAyudaOpen ? "rotate-180" : ""}`} />
              </button>

              {mobileAyudaOpen && (
                <div className="ml-4">
                  <Link href="/faqs" className="block px-3 py-2 text-sm" onClick={() => setIsOpen(false)}>
                    {t("nav_faqs")}
                  </Link>
                  <Link href="/contacto" className="block px-3 py-2 text-sm" onClick={() => setIsOpen(false)}>
                    {t("nav_contacto")}
                  </Link>
                  <Link href="/contratar" className="block px-3 py-2 text-sm" onClick={() => setIsOpen(false)}>
                    {t("nav_contratar")}
                  </Link>
                </div>
              )}

              {/* LOGIN MOBILE (CORREGIDO) */}
              <Link
                href="/intranet-empresas"
                className="block px-3 py-2 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {t("nav_login")}
              </Link>

              {/* LANGUAGE SELECTOR MOBILE */}
              <div className="px-3 py-2">
                <p className="text-sm font-medium mb-1">{t("Idioma")}</p>
                <div className="flex gap-3">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageChange(option.code)}
                      className={`px-3 py-1 rounded-full text-sm uppercase border ${
                        currentLanguage === option.code
                          ? "border-[#9dd187] text-[#9dd187] font-semibold"
                          : "border-gray-300 text-gray-600"
                      }`}
                    >
                      {option.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* DESCARGA */}
              <Link href="/descargar" className="block px-3 py-2 text-sm" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white">
                  {t("nav_descarga")}
                </Button>
              </Link>

              {/* QR MOBILE */}
              <div className="flex justify-center mt-3">
                <QRCodeCanvas value={qrLink} size={120} />
              </div>

            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
