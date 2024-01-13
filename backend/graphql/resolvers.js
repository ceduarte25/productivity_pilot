import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const resolvers = {
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
