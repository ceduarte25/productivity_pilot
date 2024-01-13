import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Task {
    id: Int
    title: String!
    note: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(title: String, note: String): Task
  }
`
