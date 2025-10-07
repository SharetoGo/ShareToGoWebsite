"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/quienes-somos", label: "Quiénes somos" },
    { href: "/faqs", label: "FAQS" },
    { href: "/contratar", label: "Contratar" },
    { href: "/espacio-empresas", label: "Espacio Empresas" },
    { href: "/espacio-eventos", label: "Espacio Eventos" },
    { href: "/funcionamiento", label: "Funcionamiento de la App" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logos/side_logo.png" alt="SharetoGo Logo" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#2a2c38] hover:text-[#9dd187] transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
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
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-[#2a2c38]">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-[#2a2c38] hover:text-[#9dd187] transition-colors duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white">Descarga la app</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
