import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    note: String
    createdAt: String!
    updatedAt: String!
    createdById: String!
  }

  type User {
    id: ID!
    email: String!
    password: String
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    tasks: [Task!]!
    login(email: String!, password: String!): AuthData!
  }

  type Mutation {
    createTask(title: String!, note: String): Task
    createUser(email: String!, password: String!): User
  }
`
