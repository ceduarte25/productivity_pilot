import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

export default function BackButton() {
  return (
    <Button asChild color='amber' variant='outline'>
      <Link href='/'>
        <IoIosArrowBack /> Go Back
      </Link>
    </Button>
  )
}
