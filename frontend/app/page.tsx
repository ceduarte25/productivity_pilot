import { Flex } from '@radix-ui/themes'
import { CreateTaskButton, TaskList } from './_components'

export default function Home() {
  return (
    <Flex direction='column' gap='4' m='5'>
      <CreateTaskButton />
      <TaskList />
    </Flex>
  )
}
