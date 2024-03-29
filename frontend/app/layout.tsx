import { Container, Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ApolloClientProvident from './ApolloClientProvider'
import { Footer, Header } from './_components'
import './globals.css'
import './theme-config.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Task List',
  description: 'Task list web app',
  creator: 'Christian Eduarte',
  icons: {
    icon: '/carelulu icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.variable}>
        <ApolloClientProvident>
          <Theme radius='small' accentColor='cyan'>
            <Header />
            <Container>
              <main>{children}</main>
            </Container>
            <Footer />
          </Theme>
        </ApolloClientProvident>
      </body>
    </html>
  )
}
