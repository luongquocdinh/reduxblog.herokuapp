let express = require('express')
let mysql	= require('mysql')
let bodyParser = require('body-parser')
let app = express()

app.set('port', process.env.PORT || 3000)
app.use(express.query())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dinh',
  database: 'reduxblog'
})

connection.connect()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/api/posts/', function (req, res) {
  let data = {
    'title': req.body.title,
    'categories': req.body.categories,
    'content': req.body.content
  }
  connection.query('insert into posts set ?', data, function (err, rows, fields) {
    if (!err) {
      console.log('----Add success----', rows)
    } else {
      console.log('!!!Add fields!!!')
    }
  })
  console.log(connection.sql)
  res.send('Heroku API')
})

app.get('/api/posts', function (req, res) {
  connection.query('select * from posts', function (err, result) {
    if (err) throw err
    console.log(result[0].id)
    console.log(result[0].title)
    console.log(result[0].categories)
    console.log(result[0].content)
    res.json(result)
  })
})

app.get('/api/posts/:id', function (req, res) {
  connection.query('select * from posts where id = ?', req.params.id, function (err, rows) {
    if (err) throw console.log(err)
    console.log('Data: ', rows)
    res.json(rows)
  })
})

app.delete('/api/posts/:id', function (req, res) {
  connection.query('delete from posts where id = ?', req.params.id, function (err, rows) {
    if (err) throw console.log(err)
    console.log('Data: ', rows)
    res.json(rows)
  })
})

module.exports = app
