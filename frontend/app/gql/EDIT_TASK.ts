import { gql } from 'graphql-tag'

const EDIT_TASK = gql`
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

export default EDIT_TASK