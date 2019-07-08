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

  lat: {
    //TODO Geography dataType
    type: Sequelize.FLOAT,
    allowNull: false
  },
  long: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  ratings: {
    type: Sequelize.INTEGER
  },
  reviews: {
    type: Sequelize.STRING
  },
  priceLevel: {
    type: Sequelize.INTEGER
  },
  address: {
    type: Sequelize.STRING
  },
  phoneNumber: {
    type: Sequelize.INTEGER
  },
  openNow: {
    type: Sequelize.BOOLEAN
  },
  weekdayText: {
    type: Sequelize.STRING //each day of week has an index, 0-6
  },
  icon: {
    type: Sequelize.STRING
  }
})

module.exports = Place
