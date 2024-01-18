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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BackButton, ErrorHandler, ErrorMessage, Spinner } from '.'
import { client } from '../ApolloClientProvider'
import { GET_TASK } from '../[id]/TaskDetail'
import { EDIT_TASK } from '../[id]/edit_task/EditTask'
import { GET_TASKS } from '../_components/TaskList'
import { CREATE_TASK } from '../new_task/CreateTask'

export default function TaskForm({ taskId }: { taskId?: number }) {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)

  const isNewTask = !taskId
  const mutation = isNewTask ? CREATE_TASK : EDIT_TASK
  const query = isNewTask ? GET_TASKS : GET_TASK
  const push = isNewTask ? '/' : `/${taskId?.toString()}`

  const [mutateTask, { error }] = useMutation(mutation, {
    onCompleted: () => {
      router.push(push)
    },
    refetchQueries: [{ query }],
  })

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const { loading, error, data } = await client.query({
          query: GET_TASK,
          variables: {
            id: taskId,
          },
        })

        if (loading) return <p>Loading...</p>
        if (error) {
          if (error.message === 'Unauthenticated!') {
            router.push('/authentication')
            return null
          } else {
            return <ErrorMessage>{error.message}</ErrorMessage>
          }
        }

        setTitle(data.task.title)
        setNote(data.task.note)
      } catch (error) {
        router.push('/')
      }
    }

    if (!isNewTask) {
      fetchTaskDetails()
    }
  }, [isNewTask, taskId, router])

  const handleMutateTask = async () => {
    try {
      setLoading(true)

      await mutateTask({
        variables: {
          id: taskId,
          title,
          note,
        },
      })
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Flex direction='column' className='p-3 max-w-2xl'>
      <Heading>{isNewTask ? 'Create Task' : 'Edit Task'}</Heading>
      <form
        className='space-y-3 mt-3'
        onSubmit={(e) => {
          e.preventDefault()
          handleMutateTask()
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
              {loading && <Spinner />} {isNewTask ? 'Create Task' : 'Edit Task'}
            </Text>
          </Button>
        </Flex>
      </form>
      {error?.message === 'Unauthenticated!' ? (
        <ErrorHandler errorMessage={error.message} />
      ) : (
        <ErrorMessage>{error?.message}</ErrorMessage>
      )}
    </Flex>
  )
}
