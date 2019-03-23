import graphql from './graphql'

export default utils => ({
  graphql: graphql(utils),
})

// This one index.js file in the services folder makes it so we only rely on this file if a new service is added. It requires in index.js file from the graphql folder and re-exports all services in one big object. We can define further services here if we need them.
