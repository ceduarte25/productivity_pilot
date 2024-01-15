import { Container, Flex } from '@radix-ui/themes'
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
    <footer className='bg-carelulu'>
      <Container size='3'>
        <Flex justify='between' align='center'>
          <Image src='/carelulu_footer.webp' alt='?' width={150} height={145} />
          <Flex direction='column'>
            <Flex gap='2'>
              {socials.map((social) => (
                <Link key={social.href} href={social.href} target='_blank'>
                  <social.Icon size={35} color='white' />
                </Link>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </footer>
  )
}
