import winston from 'winston'

// a transport is the way in which winston separates and saves various log types in different files
let transports = [
  new winston.transports.File({
    filename: 'error.log', // real errors are saved here
    level: 'error' 
  }),
  new winston.transports.File({
    filename: 'combined.log', // all other log messages, such as warning or info logs go here
    level: 'verbose'
  })
]

// when in development mode, we will directly log all messages to the console while developing the server
if (process.env.NODE_ENV !== 'production') {
  transports.push(new winston.transports.Console()) 
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports
})

export default logger