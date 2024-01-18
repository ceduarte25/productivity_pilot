import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../prisma/prisma.js'

const Mutation = {
  createTask: async (_, { title, note }, { middlewareAuth, userId }) => {
    if (!middlewareAuth) throw new Error('Unauthenticated!')

    try {
      return prisma.task.create({
        data: {
          title,
          note,
          createdById: userId,
        },
      })
    } catch (error) {
      throw new Error(`Couldn't create task.`)
    }
  },
  editTask: async (_, { id, title, note }, { middlewareAuth, userId }) => {
    if (!middlewareAuth) throw new Error('Unauthenticated!')

    try {
      return prisma.task.update({
        where: {
          id,
          createdById: userId,
        },
        data: {
          title,
          note,
        },
      })
    } catch (error) {
      throw new Error(`Couldn't edit task.`)
    }
  },
  deleteTask: async (_, { id }, { middlewareAuth, userId }) => {
    if (!middlewareAuth) throw new Error('Unauthenticated!')

    try {
      const task = await prisma.task.findUnique({
        where: {
          createdById: userId,
          id,
        },
      })

      if (!task) throw new Error()

      await prisma.task.delete({
        where: {
          id,
        },
      })

      return true
    } catch (error) {
      throw new Error(`Couldn't delete task.`)
    }
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
      throw new Error(
        `User creation failed. 
        The provided email address may already associated
        with an existing user account.`
      )
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
}

export default Mutation
