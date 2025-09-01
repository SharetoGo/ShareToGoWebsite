'use client'

import { useEffect } from 'react'
import Head from 'next/head';

import AOS from 'aos'
import 'aos/dist/aos.css'

import Footer from '@/components/ui/footer'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <>
    <Head>
        <title>SharetoGo - Carpooling para todos</title>
      </Head>
      <main className="grow">

        {children}

      </main>

      <Footer />
    </>
  )
}
