const posts =[
  {
    id: 2,
    text: 'Lorem Ipsum',
    user: {
      avatar: '/uploads/avatar1.png',
      username: 'Test User'
    } 
  },
  {
    id: 1,
    text: 'Lorem Ipsum',
    user: {
      avatar: '/uploads/avatar2.png',
      username: 'Test User 2'
    } 
  },
]
const resolvers = {
  RootQuery: {
    posts(root, args, context) {
      return posts
    },
  },
};

// The resolvers object holds all types as a property. We set ip RootQuery, holding the posts query in the same way as we did in our schema. The resolvers object must equal the schema but recursively merged.

// If we send a query for all posts, the posts function is executed. There, you can do whatever you want, but you need to return something that matches the schema. So, if you have an array of posts as the response type of RootQuery, you cannot return something different, such as just one post object instead of an array. In that case, you would receive an error.

export default resolvers