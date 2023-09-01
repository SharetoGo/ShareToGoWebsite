export const metadata = {
  title: 'SharetoGo - Home',
  description: 'Main page of SharetoGo',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import FeaturesBlocks from '@/components/features-blocks'
import Newsletter from '@/components/newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesBlocks />
      <Features />
      <Newsletter />
    </>
  )
}
