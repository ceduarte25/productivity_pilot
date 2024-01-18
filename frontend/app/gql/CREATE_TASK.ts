import { gql } from 'graphql-tag'

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $note: String) {
    createTask(title: $title, note: $note) {
      id
      title
      note
      createdAt
      createdById
    }
  }
`

export default CREATE_TASK
