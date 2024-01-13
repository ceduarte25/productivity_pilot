'use client'

import React from 'react'
import { Button, Container, Flex, HoverCard, Text } from '@radix-ui/themes'
import Image from 'next/image'
import { IoIosArrowDown } from 'react-icons/io'

export default function Header() {
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
          </HoverCard.Root>
        </Flex>
      </Container>
    </header>
  )
}
