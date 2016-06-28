let Sequelize = require('sequelize')
let fs = require('fs')
let path = require('path')
let sequelize = new Sequelize('reduxblog', 'root', 'dinh', {
  dialect: 'mysql',
  logging: false
})
let db = {}

sequelize.authenticate().then(function () {
  console.log('Connect to Database successfully!')
}).catch(function (err) {
  console.log('Connect to Database fail!', err)
})

fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js')
}).forEach(function (file) {
  var model = sequelize.import(path.join(__dirname, file))
  db[model.name] = model
})

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
