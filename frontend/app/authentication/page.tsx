import { Metadata } from 'next/types'
import { AccountForm } from '../components'

export default function AuthenticationPage() {
  return <AccountForm />
}

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in your account to see list of tasks.',
  creator: 'Christian Eduarte',
  icons: {
    icon: '/carelulu icon.png',
  },
}
