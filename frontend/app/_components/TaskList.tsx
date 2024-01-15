'use client'

import { useQuery } from '@apollo/client'
import { Badge, Box, Card, Flex, Heading, Table, Text } from '@radix-ui/themes'
import { gql } from 'graphql-tag'
import { useRouter } from 'next/navigation'

interface Task {
  id: string
  title: string
  note: string
  createdById: string
  createdAt: string
}

const GET_TASKS = gql`
  query GetTasks($userId: String!) {
    tasks(userId: $userId) {
      id
      title
      note
      createdAt
      createdById
    }
  }
`

export default function TaskList() {
  const router = useRouter()

  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: { userId },
  })

  if (loading) return <p>Loading...</p>
  if (error) {
    if (error.message === 'Unauthenticated!') {
      router.push('/authentication')
      return null
    } else {
      return <p>Error: {error.message}</p>
    }
  }

  const tasks = data.tasks

  return (
    <Card className='m-5 p-3'>
      <Heading as='h1'>Task List</Heading>
      <Table.Root>
        <Table.Body>
          {tasks.map((task: Task) => (
            <Table.Row key={task.id}>
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
          ))}
          <Flex direction='column'></Flex>
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

const userId = ''
