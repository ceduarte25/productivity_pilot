import { Box, Flex, Grid } from '@radix-ui/themes'
import BackButton from './BackButton'
import DeleteButton from './DeleteButton'
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
        <DeleteButton taskId={id} />
      </Flex>
    </Grid>
  )
}
