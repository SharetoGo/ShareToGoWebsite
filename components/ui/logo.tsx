import Link from 'next/link'
import LogoPic from '@/public/images/logos/logocoche.png' 
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Cruip">
      <Image src={LogoPic} width={180} height={180} alt="Logo" />
    </Link>
  )
}
