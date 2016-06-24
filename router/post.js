let models = require('../models')
let express = require('express')
let router = express.Router()

let parseJSON = function (dataJSON) {
  let data = {
    'id': dataJSON.id,
    'title': dataJSON.title,
    'categories': dataJSON.categories,
    'content': dataJSON.content
  }
  return data
}

router.get('/', function (req, res) {
  let token = req.headers.token
  models.users.find({where: {token: token}}).then(function (data) {
    if (data) {
      // let userId = data.id
      models.posts.findAll({
        limit: 40,
        attributes: ['id', 'title', 'categories']
      }).then(function (data) {
        if (data) {
          res.json(data)
        } else {
          res.json({
            message: 'data is empty!'
          })
        }
      })
    } else {
      res.json({
        message: 'token is not exitst!'
      })
    }
  })
})

router.post('/', function (req, res) {
  let token = req.headers.token
  models.users.find({where: {token: token}}).then(function (data) {
    if (data) {
      let userId = data.id
      let post = {
        'title': req.body.title,
        'categories': req.body.categories,
        'content': req.body.content,
        'userId': userId
      }
      models.posts.create(post).then(function (data) {
        if (data) {
          res.json({
            post: parseJSON(data)
          })
        } else {
          res.json({
            message: 'data is empty!'
          })
        }
      })
    } else {
      res.json({
        message: 'token is not exitst!'
      })
    }
  })
})

router.get('/:id', function (req, res) {
  let token = req.headers.token
  models.user.find({where: {token: token}}).then(function (data) {
    let UserId = data.id
    if (data) {
      models.posts.find({
        where: {id: req.params.id, UserId: UserId},
        attributes: ['id', 'title', 'categories', 'content']
      }).then(function (data) {
        if (data) {
          res.json({
            data: data
          })
        } else {
          res.json({
            message: 'data is empty!'
          })
        }
      })
    } else {
      res.json({
        message: 'token is not exitst!'
      })
    }
  })
})

router.delete('/:id', function (req, res) {
  let token = req.headers.token
  models.users.find({where: {token: token}}).then(function (data) {
    if (data) {
      let UserId = data.id
      models.posts.destroy({where: {id: req.params.id, UserId: UserId}}).then(function (data) {
        if (data) {
          res.json({
            data: data
          })
        } else {
          res.json({
            message: 'data is empty!'
          })
        }
      })
    } else {
      res.json({
        message: 'token is not exitst!'
      })
    }
  })
})

router.put('/:id', function (req, res) {
  let token = req.headers.token
  models.users.find({where: {token: token}}).then(function (data) {
    if (data) {
      let UserId = data.id
      models.posts.find({where: {id: req.params.id, UserId: UserId}}).then(function (data) {
        data.updateAttributes({
          title: req.body.title,
          categories: req.body.categories,
          content: req.body.content
        })
        res.json({
          post: parseJSON(data)
        })
      })
    } else {
      res.json({
        message: 'token is not exitst!'
      })
    }
  })
})

module.exports = router
