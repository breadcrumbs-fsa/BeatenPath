const Sequelize = require('sequelize')
const db = require('../db')

const Segment = db.define('segments', {
  segmentStart: {
    type: Sequelize.STRING,
    allowNull: false
  },
  segmentEnd: {
    type: Sequelize.STRING,
    allowNull: false
  },
  journeyId: {
    foreignKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  order: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  transportation: {
    type: Sequelize.ENUM('WALKING', 'DRIVING', 'BIKING', 'TRANSIT'),
    allowNull: false
  }
})

module.exports = Segment
