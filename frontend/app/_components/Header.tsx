'use client'

import { Button, Container, Flex, HoverCard, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) setAuthenticated(true)
  }, [pathname])

  const handleSignOut = () => {
    localStorage.removeItem('token')

    setAuthenticated(false)
    window.location.reload()
  }

  return (
    <header className='bg-carelulu'>
      <Container size='3'>
        <Flex m='1' justify='between' align='center'>
          <Image src='/carelulu logo.webp' alt='?' width={138} height={35} />
          <HoverCard.Root>
            <HoverCard.Trigger>
              <Button size='3' color='amber'>
                <Text className='text-white' size='2'>
                  Account
                </Text>{' '}
                <IoIosArrowDown color='white' />
              </Button>
            </HoverCard.Trigger>
            {!authenticated && (
              <HoverCard.Content
                className='!bg-amber-300 hover:!bg-amber-200'
                size='1'
              >
                <Link href={'../authentication'}>
                  <Text className='text-white' size='2'>
                    Sign in
                  </Text>
                </Link>
              </HoverCard.Content>
            )}
            {authenticated && (
              <HoverCard.Content
                className='!bg-amber-300 hover:!bg-amber-200'
                size='1'
              >
                <button onClick={handleSignOut}>
                  <Text className='text-white' size='2'>
                    Sign out
                  </Text>
                </button>
              </HoverCard.Content>
            )}
          </HoverCard.Root>
        </Flex>
      </Container>
    </header>
  )
}
