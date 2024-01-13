import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

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
          createdById: 'clrbtbs7n000014pci4j3mmst',
        },
      })
    },
    createUser: async (_, { email, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const createdUser = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
          },
        })

        return createdUser
      } catch (error) {
        console.error(error)
        throw new Error('User creation failed.')
      }
    },
  },
}
