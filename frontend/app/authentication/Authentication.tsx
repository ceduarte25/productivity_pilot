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
import { gql } from 'graphql-tag'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ErrorMessage } from '../components'

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`

export default function Authentication() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER)

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: {
          email,
          password,
        },
      })

      localStorage.setItem('token', data.login.token)
      console.log(`${data.login.token} you are now logged in!`)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card className='max-w-md m-10 p-5'>
      <Heading>Sign in</Heading>
      <form
        className='space-y-3 mt-3'
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <Box>
          <Text>Email address</Text>
          <TextField.Root>
            <TextField.Input
              placeholder='Enter your email'
              type='email'
              value={email}
              required
              onChange={({ target }) => setEmail(target.value)}
            />
          </TextField.Root>
        </Box>
        <Box>
          <Text>Password</Text>
          <TextField.Root>
            <TextField.Input
              placeholder='Enter your password'
              type='password'
              value={password}
              required
              onChange={({ target }) => setPassword(target.value)}
            />
          </TextField.Root>
        </Box>
        <Flex justify='end' gap='2' mt='3'>
          <Button color='amber' variant='soft' asChild>
            <Link href='/'>
              <Text className='text-slate-400'>Create an account</Text>
            </Link>
          </Button>
          <Button color='amber' disabled={loading}>
            <Text className='text-white'>
              {loading ? 'Signing in...' : 'Sign in'}
            </Text>
          </Button>
          {/* <button type='submit'>submit</button> */}
        </Flex>
      </form>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Card>
  )
}
