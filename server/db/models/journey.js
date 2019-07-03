const Sequelize = require('sequelize')
const db = require('../db')

const Journey = db.define('journeys', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  journeyStart: {
    allowNull: false,
    type: Sequelize.STRING
  },
  journeyEnd: {
    allowNull: false,
    type: Sequelize.STRING
  }
  //TODO: TotalDistance, Lat, Long, Radius (degree type?)
})

module.exports = Journey
