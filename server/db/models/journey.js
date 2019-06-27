const Sequelize = require('sequelize')
const db = require('../db')

const Journey = db.define('journeys', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tripStart: {
    foreignKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  tripEnd: {
    foreignKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
  }
  //TODO: TotalDistance, Lat, Long, Radius (degree type?)
})

module.exports = Journey
