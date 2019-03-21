const typeDefinitions = `
  type Post {
    id: Int
    text: String
    user: User
  }

  type User {
    avatar: String
    username: String
  }
  
  type RootQuery {
    posts: [Post]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }

  input PostInput {
    text: String!
  }

  input UserInput {
    username: String!
    avatar: String!
  }

  type RootMutation {
    addPost (
      post: PostInput!
      user: UserInput!
    ): Post
  }
`;

// For our GraphQL server, we need a type called RootQuery. The RootQuery type wraps all of the queries a client can run. It can be anything from requesting all posts, all users, or posts by just one user, and so on.

export default [typeDefinitions]