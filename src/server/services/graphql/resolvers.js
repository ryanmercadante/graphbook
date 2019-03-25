import logger from '../../helpers/logger'

export default function resolver() {
  const { db } = this
  const { Post } = db.models

  const resolvers = {
    RootQuery: {
      posts(root, args, context) {
        return Post.findAll({order: [['createdAt', 'DESC']]})
    },

    RootMutation: {
      addPost(root, { post, user }, context) {
        const postObject = {
          ...post,
          user,
          id: posts.length+1
        }
        posts.push(postObject)
        logger.log({ level: 'info', message: 'Post was created' })
        return postObject
      }
    },

    Post: {
      user(post, args, context) {
        return post.getUser()
      }
    }
  }

};

// The resolvers object holds all types as a property. We set ip RootQuery, holding the posts query in the same way as we did in our schema. The resolvers object must equal the schema but recursively merged.
// If we send a query for all posts, the posts function is executed. There, you can do whatever you want, but you need to return something that matches the schema. So, if you have an array of posts as the response type of RootQuery, you cannot return something different, such as just one post object instead of an array. In that case, you would receive an error.
