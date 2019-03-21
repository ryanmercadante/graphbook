import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools' // Merges the GraphQL schema and the resolver functions, resolving the data we are going to write. It throws an error when you define a query or mutation that is not in the schema. The resulting schema is executable by our GraphQL server resolving the data or running the mutations we request.
import Resolvers from './resolvers'
import Schema from './Schema'

// we are going to pass this as a schema parameter to the Apollo Server
const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers
})

const server = new ApolloServer({
  schema: executableSchema,
  context: ({ req }) => req // the context property contains the request object of Express. In our resolver functions, we can access the request if we need to.
})

// This exports the initialized server object, which handles all GraphQL requests
export default server