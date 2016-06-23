let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let routes = require('../router/index')
let posts = require('../router/post')
let app = express()

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, '/views'))
app.set('view cache', false)

app.use('/public', express.static(path.join(__dirname, '/public')))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'))
})

app.use('/', routes)

app.use('/api/posts', posts)

module.exports = app
