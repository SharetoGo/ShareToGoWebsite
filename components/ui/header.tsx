'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import { MdLanguage } from "react-icons/md"


export default function Header() {

  return (
<header
  className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
    'backdrop-blur-sm shadow-sm' 
  }`}
  style={{ backgroundColor: '#9dd187' } }
>
      <div className="max-w-8xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-2">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link href="/" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">Inicio</Link>
              </li>
              <li>
                <Link href="/about" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">Quiénes somos</Link>
              </li>
              <li>
                <Link href="/contratar" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">Contratar</Link> 
              </li>
              <li>
                <Link href="/espacioEmpresas" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">Espacio Empresas</Link> 
              </li>
              <li>
                <Link href="/funcionamiento" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">Funcionamiento de la App</Link> 
              </li>
              <li>
                <Link href="/contact" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">Contacto</Link>
              </li>
              <li>
                <Link href="/privacy" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">Política de privacidad</Link>
              </li>
              <li>
                <Link href="/idioma" className="font-medium text-teal-950 hover:underline hover:text-teal-700 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                Idioma 
                <MdLanguage className="text-xl text-teal-950" />
                </Link> {/* CAMBIAR */}
              </li>
            </ul>

          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
