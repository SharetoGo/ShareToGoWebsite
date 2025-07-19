export const metadata = {
  title: 'SharetoGo - Inicio',
  description: 'Main page of SharetoGo',
}

import Hero from '@/components/hero'
import FeaturesBlocks from '@/components/features-blocks'
import Options from '@/components/options'
import Faqs from '@/components/faqs'


export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesBlocks />
      <Options />
      <Faqs />
    </>
  )
}
