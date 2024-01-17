import { TaskForm } from '@/app/components'
import { gql } from 'graphql-tag'

export const EDIT_TASK = gql`
  mutation EditTask($id: Int!, $title: String!, $note: String) {
    editTask(id: $id, title: $title, note: $note) {
      id
      title
      note
      createdAt
      createdById
    }
  }
`

export default function EditTask({ taskId }: { taskId: number }) {
  return <TaskForm taskId={taskId} />
}
