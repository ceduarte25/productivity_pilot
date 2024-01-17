'use client'

import { useMutation } from '@apollo/client'
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { gql } from 'graphql-tag'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GET_TASKS } from '../_components/TaskList'
import { BackButton, ErrorMessage, Spinner } from '../components'

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $note: String) {
    createTask(title: $title, note: $note) {
      id
      title
      note
      createdAt
      createdById
    }
  }
`

export default function CreateTask() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)

  const [createTask, { error }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      router.push('/')
    },
    onError: (error) => {
      console.error(error.message)
    },
    refetchQueries: [{ query: GET_TASKS }],
  })

  const handleCreateTask = async () => {
    try {
      setLoading(true)

      await createTask({
        variables: {
          title,
          note,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex direction='column' className='p-3 max-w-2xl'>
      <Heading>Create Task</Heading>
      <form
        className='space-y-3 mt-3'
        onSubmit={(e) => {
          e.preventDefault()
          handleCreateTask()
        }}
      >
        <Box>
          <Text>Title</Text>
          <TextField.Root>
            <TextField.Input
              placeholder='Enter task title'
              value={title}
              required
              onChange={({ target }) => setTitle(target.value)}
            />
          </TextField.Root>
        </Box>
        <Box>
          <Text>Note</Text>
          <TextArea
            placeholder='Enter task note'
            value={note}
            onChange={({ target }) => setNote(target.value)}
          />
        </Box>
        <Flex justify='end' gap='2' mt='3'>
          <BackButton />
          <Button color='amber' disabled={loading}>
            <Text className='text-white'>
              {loading && <Spinner />} Create Task
            </Text>
          </Button>
        </Flex>
      </form>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Flex>
  )
}
