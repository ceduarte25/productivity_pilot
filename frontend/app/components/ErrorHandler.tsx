'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ErrorMessage } from '.'

export default function ErrorHandler({
  errorMessage,
}: {
  errorMessage: string
}) {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5) // Adjust the countdown duration as needed

  const push = async () => {
    router.push('/')
  }

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    return () => clearInterval(countdownInterval)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      push()
    }
  }, [countdown])

  return (
    <ErrorMessage>{`${errorMessage} Redirecting in ${countdown}s...`}</ErrorMessage>
  )
}
