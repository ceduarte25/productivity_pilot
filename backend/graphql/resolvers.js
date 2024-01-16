import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const resolvers = {
  Query: {
    tasks: async (_, args, { middlewareAuth, userId }) => {
      if (!middlewareAuth) throw new Error('Unauthenticated!')

      try {
        const tasks = await prisma.task.findMany({
          where: {
            createdById: userId,
          },
        })

        if (!tasks[0].createdById) throw new Error()

        return tasks
      } catch (error) {
        throw new Error(`Couldn't fetch tasks.`)
      }
    },
    task: async (_, { id }, { middlewareAuth, userId }) => {
      if (!middlewareAuth) throw new Error('Unauthenticated!')

      try {
        const task = await prisma.task.findUnique({
          where: {
            createdById: userId,
            id,
          },
        })

        if (!task.createdById) throw new Error()

        return task
      } catch (error) {
        throw new Error(`Couldn't fetch task.`)
      }
    },
  },
  Mutation: {
    createTask: async (_, { title, note, middlewareAuth }) => {
      if (!middlewareAuth) throw new Error('Unauthenticated!')

      return prisma.task.create({
        data: {
          title,
          note,
          createdById: 'clrd69ads000099wc83w7oxtm',
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
        throw new Error('User creation failed.')
      }
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
}
