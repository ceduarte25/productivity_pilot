import { Box, Button, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { CgGoogleTasks } from 'react-icons/cg'

export default function CreateTaskButton() {
  return (
    <Box>
      <Button asChild color='amber' className='justify-start'>
        <Link href='/new_task'>
          <CgGoogleTasks color='white' />{' '}
          <Text className='text-white'>Create Task</Text>
        </Link>
      </Button>
    </Box>
  )
}
