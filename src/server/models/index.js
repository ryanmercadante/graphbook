import Sequelize from 'sequelize'

// When the plugin is loaded, the require.context method becomes available
// In production, the require.context function is included in the generated bundle of webpack
if (process.env.NODE_ENV === 'development') {
  require('babel-plugin-require-context-hook/register')()
}
// We search for all files ending with .js in the same folder as the current file, and load them all with the require.context statement.
export default (sequelize) => {
  ld db = {}

  const context = require.context('.', true, /^\.\/(?!index\.js).*\.js$/, 'sync')
  context.keys().map(context).forEach(module => {
    const model = module(sequelize, Sequelize)
    db[model.name] = model
  })

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  return db
}
