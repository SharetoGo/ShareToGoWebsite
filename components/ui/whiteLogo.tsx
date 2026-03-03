import Link from 'next/link'
import WhiteLogoPic from '@/public/logos/logoCar_whiteCar_noBg.png' 
import Image from 'next/image'

export default function c() {
  return (
    <Link href="/" className="flex justify-center" aria-label="Cruip">
      <Image src={WhiteLogoPic} width={100} height={100} alt="WhiteLogo" />
    </Link>
  )
}
