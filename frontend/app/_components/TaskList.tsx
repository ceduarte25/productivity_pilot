'use client'

import { useQuery } from '@apollo/client'
import { Badge, Box, Card, Flex, Heading, Table, Text } from '@radix-ui/themes'
import { gql } from 'graphql-tag'
import { useRouter } from 'next/navigation'
import { DateBadge, ErrorMessage, Link } from '../components'

export interface Task {
  id: number
  title: string
  note: string
  createdById: string
  createdAt: string
}

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
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

  const { loading, error, data } = useQuery(GET_TASKS)

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

  const tasks = data.tasks

  const noTaskYet = !tasks[0]

  return (
    <Card className='p-3'>
      <Heading as='h1'>Task List</Heading>
      <Table.Root>
        <Table.Body>
          {noTaskYet && (
            <Table.Row>
              <Table.Cell>
                <Text>
                  You don&apos;t have any created task,{' '}
                  <Link href='./new_task'>create one</Link> now!
                </Text>
              </Table.Cell>
            </Table.Row>
          )}
          {tasks.map((task: Task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Flex align='center' justify='between' gap='2'>
                  <Box>
                    <Heading as='h2' size={{ initial: '2', sm: '4', md: '5' }}>
                      <Link href={`/${task.id}`}>{task.title}</Link>
                    </Heading>
                    <Text className='hidden  md:block'>{task.note}</Text>
                  </Box>
                  <DateBadge date={task.createdAt} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}
