import { Flex } from '@radix-ui/themes'
import { TaskList, CreateTaskButton } from './_components'

export default function Home() {
  return (
    <Flex direction='column' gap='4' m='5'>
      <CreateTaskButton />
      <TaskList />
    </Flex>
  )
}
