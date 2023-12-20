export const metadata = {
  title: 'SharetoGo - Inicio',
  description: 'Main page of SharetoGo',
}

import Hero from '@/components/hero'
import FeaturesBlocks from '@/components/features-blocks'
import Options from '@/components/options'


export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesBlocks />
      <Options />
    </>
  )
}
