const Sequelize = require('sequelize')
const db = require('../db')

const Segment = db.define('segments', {
  tripStart: {
    foreignKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  tripEnd: {
    foreignKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
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
  distance: {
    allowNull: false,
    type: Sequelize.FLOAT
  },
  directions: {
    allowNull: false,
    type: Sequelize.STRING
  },
  transportation: {
    type: Sequelize.ENUM('Walking, Driving, Biking, Transit'),
    allowNull: false
  },
  departure_time: {
    type: Sequelize.STRING
    //TODO: FIGURE OUT TYPES
  }
})

module.exports = Segment
