import { TaskForm } from '@/app/components'

interface Props {
  params: { id: string }
}

export default function EditTaskPage({ params }: Props) {
  return <TaskForm taskId={parseInt(params.id)} />
}
