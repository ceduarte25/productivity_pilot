'use client'

import { useQuery } from '@apollo/client'
import { Box, Card, Flex, Heading, Table, Text } from '@radix-ui/themes'
import { gql } from 'graphql-tag'
import { useRouter } from 'next/navigation'
import { Task } from '../_components/TaskList'
import { DateBadge, ErrorHandler } from '../components'

export const GET_TASK = gql`
  query GetTask($id: Int) {
    task(id: $id) {
      id
      title
      note
      createdAt
      createdById
    }
  }
`

export default function TaskDetail({ taskId }: { taskId: number }) {
  const router = useRouter()

  const { loading, error, data } = useQuery(GET_TASK, {
    variables: { id: taskId },
  })

  if (loading) return <p>Loading...</p>
  if (error) {
    if (error.message === 'Unauthenticated!') {
      router.push('/authentication')
      return null
    } else {
      return <ErrorHandler errorMessage={error.message} />
    }
  }

  const task: Task = data.task

  return (
    <Card className='p-3'>
      <Heading as='h1'>Task List</Heading>
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Flex align='center' justify='between'>
                <Box>
                  <Heading as='h2' size='5'>
                    {task.title}
                  </Heading>
                  <Text>{task.note}</Text>
                </Box>
                <DateBadge date={task.createdAt} />
              </Flex>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Card>
  )
}
