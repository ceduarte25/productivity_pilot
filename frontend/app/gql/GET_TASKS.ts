import { gql } from 'graphql-tag'

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      note
      createdAt
      createdById
    }
  }
`

export default GET_TASKS
