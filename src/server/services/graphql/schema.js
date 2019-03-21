const typeDefinitions = `
  type Post {
    id: Int
    text: String
  }
  
  type RootQuery {
    posts: [Post]
  }

  schema {
    query: RootQuery
  }
`;

// For our GraphQL server, we need a type called RootQuery. The RootQuery type wraps all of the queries a client can run. It can be anything from requesting all posts, all users, or posts by just one user, and so on.

export default [typeDefinitions]