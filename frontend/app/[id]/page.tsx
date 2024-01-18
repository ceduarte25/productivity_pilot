import { Box, Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next/types'
import { BackButton } from '../components'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import TaskDetail from './TaskDetail'

interface Props {
  params: { id: string }
}

export default function TaskDetailPage({ params }: Props) {
  const id = parseInt(params.id)

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5' m='5'>
      <Box className='md:col-span-4'>
        <TaskDetail taskId={id} />
      </Box>
      <Flex direction='column' gap='2'>
        <BackButton />
        <EditButton taskId={id} />
        <DeleteButton taskId={id} />
      </Flex>
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Task Detail',
  description: 'View the detail of a specific task.',
  creator: 'Christian Eduarte',
  icons: {
    icon: '/carelulu icon.png',
  },
}
