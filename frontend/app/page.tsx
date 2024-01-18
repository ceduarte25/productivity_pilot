import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next/types'
import { CreateTaskButton, TaskList } from './_components'

export default function Home() {
  return (
    <Flex direction='column' gap='4' m='5'>
      <CreateTaskButton />
      <TaskList />
    </Flex>
  )
}

export const metadata: Metadata = {
  title: 'Task List',
  description: 'View the list of all the tasks.',
  creator: 'Christian Eduarte',
  icons: {
    icon: '/carelulu icon.png',
  },
}
