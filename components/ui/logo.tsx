import Link from 'next/link'
import LogoPic from '@/public/images/side_logo.png' 
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Cruip">
      <Image src={LogoPic} priority={true} width={200} height={200} alt="Logo" />
    </Link>
  )
}
