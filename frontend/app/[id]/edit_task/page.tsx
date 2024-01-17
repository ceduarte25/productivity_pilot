import EditTask from './EditTask'

interface Props {
  params: { id: string }
}

export default function EditTaskPage({ params }: Props) {
  return <EditTask taskId={parseInt(params.id)} />
}
