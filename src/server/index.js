import express from 'express'
import path from 'path'
import helmet from 'helmet'
import cors from 'cors'
import compress from 'compression'
import services from './services'
import db from './database'

const app = express()
const root = path.join(__dirname, '../../')

if (process.env.NODE_ENV === 'development') {
  // You should initialize Helmet very high in your Express router so that all responses are affected
  app.use(helmet()) // XSS(Cross-Site-Scripting) protection tactics and remove the X-Powered-By HTTP header
  app.use(helmet.contentSecurityPolicy({ // This header prevents attackers from loading resources from external URLS
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "*.amazonaws.com"] // Only images fro these URLs should be loaded, including AWS
    }
  }))
  app.use(helmet.referrerPolicy({ policy: 'same-origin' })) // Sets the Referrer HTTP header only when making requests on the same host. This enhancement stops any internal routing or requests being exposed to the internet
}
// Enabling compression for Express saves you and your use bandwidth. It compresses all responses going through it. Remember to add it high in your routing order so that all requests are affected
app.use(compress())

// When using APIs via Ajax, the main problem is that the API needs to send the correct Access-Control-Allow-Origin header. This command handles all the problems we usually have with cross-origin requests at once. It merely sets a wildcard with * inside of Access-Control-Allow-Origin, allowing anyone from anywhere to use your API, at least in the first instance.
app.use(cors())

const serviceNames = Object.keys(services)
// This will bind the GraphQL server to the Express.js web server
for (let i = 0; i < serviceNames.length; i++) {
  const name = serviceNames[i]
  if (name === 'graphql') {
    services[name].applyMiddleware({ app })
  } else {
    app.use(`/${name}`, services[name])
  }
}

app.use('/', express.static(path.join(root, 'dist/client')))
app.use('/uploads', express.static(path.join(root, 'uploads')))
app.get('/', (req, res) => {
  res.sendFile(path.join(root, '/dist/client/index.html'))
})

app.listen(8000, () => console.log('Listening on port 8000'))
