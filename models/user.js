module.exports = function (sequelize, Sequelize) {
  let users = sequelize.define('users', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    token: Sequelize.STRING
  }, {
    classMethods: {
      associate: function (models) {
        users.hasMany(models.posts)
      }
    }
  })

  return users
}
