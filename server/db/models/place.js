const Sequelize = require('sequelize')
const db = require('../db')

const Place = db.define('places', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  googlePlaceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },

  lat: {
    //TODO Geography dataType
    type: Sequelize.FLOAT,
    allowNull: false
  },
  long: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Place
