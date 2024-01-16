'use client'

import { useQuery } from '@apollo/client'
import { Badge, Box, Card, Flex, Heading, Table, Text } from '@radix-ui/themes'
import { gql } from 'graphql-tag'
import { useRouter } from 'next/navigation'
import { Task } from '../_components/TaskList'
import { ErrorMessage } from '../components'

const GET_TASKS = gql`
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

export default function TaskDetail({ id }: { id: number }) {
  const router = useRouter()

  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: { id },
  })

  if (loading) return <p>Loading...</p>
  if (error) {
    if (error.message === 'Unauthenticated!') {
      router.push('/authentication')
      router.refresh()
      return null
    } else {
      return <ErrorMessage>{error.message}</ErrorMessage>
    }
  }

  const task: Task = data.task

  return (
    <Card className='m-5 p-3'>
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
                <Badge size='1' color='amber'>
                  <Text size='2'>
                    {new Date(task.createdAt).toDateString()}
                  </Text>
                </Badge>
              </Flex>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Card>
  )
}
