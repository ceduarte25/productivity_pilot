import { TaskForm } from '@/app/components'
import { Metadata } from 'next/types'

interface Props {
  params: { id: string }
}

export default function EditTaskPage({ params }: Props) {
  return <TaskForm taskId={parseInt(params.id)} />
}

export const metadata: Metadata = {
  title: 'Edit Task',
  description: 'Edit an existing task.',
  creator: 'Christian Eduarte',
  icons: {
    icon: '/carelulu icon.png',
  },
}
