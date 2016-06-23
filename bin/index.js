let http = require('http')
let app = require('../src/app')
let models = require('../models')
let server = http.createServer(app)

var boot = function () {
  models.sequelize.sync().then(function () {
    server.listen(app.get('port'), function () {
      console.info('Express server listening on port ' + app.get('port'))
    })
  })
}

var shutdown = function () {
  server.close()
}

if (require.main === module) {
  boot()
} else {
  console.info('Running app as a module')
  exports.boot = boot
  exports.shutdown = shutdown
  exports.port = app.get('port')
}
