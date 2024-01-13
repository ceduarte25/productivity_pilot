import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const resolvers = {
  Query: {
    tasks: async () => {
      return prisma.task.findMany()
    },
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) throw new Error('User does not exist!')

      const validCredentials = await bcrypt.compare(password, user.password)
      if (!validCredentials) throw new Error('Invalid password!')

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'carelulu-let-me-in-sdkajhfksjh324jkh1243871',
        {
          expiresIn: '2h',
        }
      )

      return { userId: user.id, token, tokenExpiration: 2 }
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
