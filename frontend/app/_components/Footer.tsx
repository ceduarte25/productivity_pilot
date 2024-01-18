import { Button, Container, Flex, Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import { IconType } from 'react-icons'
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io'

export default function Footer() {
  const socials: { Icon: IconType; href: string }[] = [
    { Icon: IoLogoFacebook, href: 'https://www.facebook.com/Carelulu/' },
    { Icon: IoLogoTwitter, href: 'https://twitter.com/mycarelulu' },
    { Icon: IoLogoInstagram, href: 'https://www.instagram.com/mycarelulu/' },
  ]

  return (
    <footer className='bg-carelulu fixed bottom-0 w-full p-4'>
      <Container size='3'>
        <Flex justify='between' align='center'>
          <Image
            src='/carelulu_footer.webp'
            alt='carelulu footer'
            width={122}
            height={105}
            priority
          />
          <Flex direction='column' gap='2'>
            <Flex gap='2'>
              {socials.map((social) => (
                <Link key={social.href} href={social.href} target='_blank'>
                  <social.Icon size={35} color='white' />
                </Link>
              ))}
            </Flex>
            <Button className='!bg-white' asChild>
              <Link
                href={'https://github.com/ceduarte25/task-list'}
                target='_blank'
              >
                <Text className='text-carelulu'>Repository</Text>
              </Link>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </footer>
  )
}
