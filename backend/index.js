import { PrismaClient } from '@prisma/client'
import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'

/** NodeJs and ExpressJs */
const app = express()
app.listen(3000)

/** Apollo GraphQL and Prisma */
const prisma = new PrismaClient()

const typeDefs = gql`
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

const resolvers = {
  Query: {
    tasks: async () => {
      return prisma.task.findMany()
    },
  },
  Mutation: {
    createTask: async (_, { title, note }) => {
      return prisma.task.create({
        data: {
          title,
          note,
        },
      })
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

async function startServer() {
  await server.start()
  server.applyMiddleware({ app })
}
startServer()
