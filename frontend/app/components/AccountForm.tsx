'use client'

import { useMutation } from '@apollo/client'
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ErrorMessage, Spinner } from '.'
import { CREATE_USER, LOGIN_USER } from '../gql'

export default function AccountForm() {
  const router = useRouter()
  const pathname = usePathname()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const isCreateAccount = pathname === '/create_account'
  const mutation = isCreateAccount ? CREATE_USER : LOGIN_USER

  const [mutateUser, { error }] = useMutation(mutation)

  const handleMutateUser = async () => {
    try {
      setLoading(true)

      const { data } = await mutateUser({
        variables: {
          email,
          password,
        },
      })

      if (isCreateAccount) {
        router.push('/authentication')
      } else {
        localStorage.setItem('token', data.login.token)
        router.push('/')
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Card className='max-w-md m-10 p-5'>
      <Heading>{isCreateAccount ? 'Sign up' : 'Sign in'}</Heading>
      <form
        className='space-y-3 mt-3'
        onSubmit={(e) => {
          e.preventDefault()
          handleMutateUser()
        }}
      >
        <Box>
          <Text>Email address</Text>
          <TextField.Root>
            <TextField.Input
              placeholder={
                isCreateAccount
                  ? 'Create your email (example@example.com)'
                  : 'Enter your email'
              }
              type='email'
              value={email}
              pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
              required
              onChange={({ target }) => setEmail(target.value)}
            />
          </TextField.Root>
        </Box>
        <Box>
          <Text>Password</Text>
          <TextField.Root>
            <TextField.Input
              placeholder={
                isCreateAccount ? 'Create your password' : 'Enter your password'
              }
              type='password'
              value={password}
              required
              minLength={8}
              onChange={({ target }) => setPassword(target.value)}
            />
          </TextField.Root>
        </Box>
        <Flex justify='end' gap='2' mt='3'>
          <Button color='amber' variant='soft' asChild>
            <Link
              href={isCreateAccount ? '/authentication' : '/create_account'}
            >
              <Text className='text-slate-400'>
                {isCreateAccount
                  ? 'Already have an account?'
                  : 'Create an account'}
              </Text>
            </Link>
          </Button>
          <Button color='amber' disabled={loading}>
            <Text className='text-white'>
              {loading && <Spinner />} {isCreateAccount ? 'Sign up' : 'Sign in'}
            </Text>
          </Button>
        </Flex>
      </form>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Card>
  )
}
