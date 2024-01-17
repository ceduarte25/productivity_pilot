import { Button, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { IoPencil } from 'react-icons/io5'

export default function EditButton({ taskId }: { taskId: number }) {
  const id = taskId

  return (
    <Button asChild color='amber'>
      <Link href={`/${id}/edit_task`}>
        <IoPencil color='white' size={18} />
        <Text className='text-white'>Edit Task</Text>
      </Link>
    </Button>
  )
}
