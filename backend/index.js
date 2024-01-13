import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { resolvers } from './graphql/resolvers.js'
import { typeDefs } from './graphql/schema.js'
import middlewareAuth from './middleware/middlewareAuth.js'

const app = express()

/** Middleware Authentication */
app.use(middlewareAuth)

/** Apollo GraphQL & Prisma, MySQL */
const server = new ApolloServer({ typeDefs, resolvers })

async function startServer() {
  await server.start()
  server.applyMiddleware({ app })
}

startServer()

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/graphql`)
})
