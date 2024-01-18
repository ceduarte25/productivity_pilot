'use client'

import { useMutation } from '@apollo/client'
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes'
import { gql } from 'graphql-tag'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoIosTrash } from 'react-icons/io'
import { Spinner } from '../components'
import { GET_TASKS } from '../gql'

const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id)
  }
`

export default function DeleteButton({ taskId }: { taskId: number }) {
  const router = useRouter()

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: () => {
      router.push('/')
    },
    refetchQueries: [{ query: GET_TASKS }],
  })

  const handleDelete = async () => {
    try {
      setLoading(true)

      await deleteTask({
        variables: {
          id: taskId,
        },
      })
    } catch (error) {
      setError(true)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={loading}>
            <Text size={{ sm: '1', md: '2' }} className='!text-white'>
              {loading && <Spinner />}{' '}
              <IoIosTrash size={18} className='inline' /> Delete Task
            </Text>
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Task</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt='4' gap='3'>
            <AlertDialog.Cancel>
              <Button color='gray' variant='soft'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This task cannot be deleted.
          </AlertDialog.Description>
          <Button
            color='gray'
            variant='soft'
            mt='2'
            onClick={() => {
              setError(false)
              setLoading(false)
            }}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}
