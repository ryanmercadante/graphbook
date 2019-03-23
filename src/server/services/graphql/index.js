import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools' // Merges the GraphQL schema and the resolver functions, resolving the data we are going to write. It throws an error when you define a query or mutation that is not in the schema. The resulting schema is executable by our GraphQL server resolving the data or running the mutations we request.
import Resolvers from './resolvers'
import Schema from './Schema'

// We surround everything with a function that accepts the utils object.
// The aim of all this is to have access to the database within our GraphQL resolvers
export default (utils) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(utils), // The scope of the Resolvers is the utils object
  })
  const server = new ApolloServer({
    schema: executableSchema,
    context: ({ req }) => req
  })
  return server
}
