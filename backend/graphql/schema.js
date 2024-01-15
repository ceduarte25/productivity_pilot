import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar DateTime

  type Task {
    id: ID!
    title: String!
    note: String
    createdAt: DateTime!
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
    tasks(userId: String!): [Task!]!
  }

  type Mutation {
    createTask(title: String!, note: String): Task
    createUser(email: String!, password: String!): User
    login(email: String!, password: String!): AuthData!
  }
`
