const Sequelize = require('sequelize')
const db = require('../db')

const Place = db.define('places', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  googlePlaceId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  priceLevel: {
    type: Sequelize.INTEGER
  }
})

module.exports = Place
