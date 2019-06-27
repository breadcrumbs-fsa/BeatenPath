const Sequelize = require('sequelize')
const db = require('../db')

const journeyCategory = db.define('journey-categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

module.exports = journeyCategory
