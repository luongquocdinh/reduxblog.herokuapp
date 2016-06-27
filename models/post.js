module.exports = function (sequelize, Sequelize) {
  let posts = sequelize.define('posts', {
    title: Sequelize.STRING,
    categories: Sequelize.STRING,
    content: Sequelize.STRING
  }, {
    classMethods: {
      associate: function (models) {
        posts.belongsTo(models.users, {
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  })
  return posts
}
