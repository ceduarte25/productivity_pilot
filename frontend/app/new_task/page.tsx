import { Metadata } from 'next/types'
import { TaskForm } from '../components'

export default function CreateTaskPage() {
  return <TaskForm />
}

export const metadata: Metadata = {
  title: 'Create Task',
  description: 'Create a new task.',
  creator: 'Christian Eduarte',
  icons: {
    icon: '/carelulu icon.png',
  },
}
