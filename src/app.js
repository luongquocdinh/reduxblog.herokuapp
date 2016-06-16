let express = require('express')
// let mysql	= require('mysql')
let bodyParser = require('body-parser')
let Sequelize = require('sequelize')

let sequelize = new Sequelize('reduxblog', 'root', 'dinh', {
  dialect: 'mysql',
  logging: false
})
let app = express()

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

sequelize.authenticate().then(function () {
  console.log('Connect to Database successfully!')
}).catch(function (err) {
  console.log('Connect to Database fail!', err)
})

let connection = sequelize.define('connection', {
  title: Sequelize.STRING,
  categories: Sequelize.STRING,
  content: Sequelize.STRING
}, {
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
  tableName: 'posts'
})

let parse = function (dataJSON) {
  let data = {
    'id': dataJSON.id,
    'title': dataJSON.title,
    'categories': dataJSON.categories,
    'content': dataJSON.content
  }
  return data
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/api/posts/', function (req, res) {
  connection.sync().then(function () {
    let connect = {
      title: req.body.title,
      categories: req.body.categories,
      content: req.body.content
    }
    console.log(connect.title)
    connection.create(connect).then(function (data) {
      if (data) {
        console.log(data)
        res.send(JSON.stringify(parse(data)))
      } else {
        console.log('insert fields')
      }
    })
  })
})

app.get('/api/posts', function (req, res) {
  connection.sync().then(function () {
    connection.findAll({ attribute: ['id', 'title', 'categories'] }).then(function (data) {
      if (data) {
        // console.log(data)
        res.json(data)
        // res.send(JSON.stringify(parse(data)))
      } else {
        console.log('data null')
      }
    })
  })
})

app.get('/api/posts/:id', function (req, res) {
  connection.sync().then(function () {
    connection.findOne({ where: {id: req.params.id} }).then(function (data) {
      console.log(req.body.params)
      if (data) {
        res.json(data)
      } else {
        console.log('Search empty')
      }
    })
  })
})

app.delete('/api/posts/:id', function (req, res) {
  connection.sync().then(function () {
    connection.destroy({ where: {id: req.params.id} }).then(function (data) {
      console.log(req.body.params)
      if (!data) {
        console.log('data empty')
      } else {
        console.log('delete success')
        res.json(data)
      }
    })
  })
})

module.exports = app
