import { Metadata } from 'next/types'
import { AccountForm } from '../components'

export default function SignUpPage() {
  return <AccountForm />
}

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Sign up to have an account for creating tasks.',
  creator: 'Christian Eduarte',
  icons: {
    icon: '/carelulu icon.png',
  },
}
