import { gql } from 'graphql-tag'

const GET_TASK = gql`
  query GetTask($id: Int) {
    task(id: $id) {
      id
      title
      note
      createdAt
      createdById
    }
  }
`

export default GET_TASK
