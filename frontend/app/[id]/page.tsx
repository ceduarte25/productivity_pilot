import TaskDetail from './TaskDetail'

interface Props {
  params: { id: string }
}

export default function TaskDetailPage({ params }: Props) {
  const id = parseInt(params.id)

  return <TaskDetail id={id} />
}
