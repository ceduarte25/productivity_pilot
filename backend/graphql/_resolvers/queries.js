import prisma from '../../prisma/prisma.js'

const Query = {
  tasks: async (_, args, { middlewareAuth, userId }) => {
    if (!middlewareAuth) throw new Error('Unauthenticated!')

    try {
      const tasks = await prisma.task.findMany({
        where: {
          createdById: userId,
        },
      })

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
}

export default Query
