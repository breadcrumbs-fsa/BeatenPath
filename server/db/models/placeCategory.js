const Sequelize = require('sequelize')
const db = require('../db')

const placeCategory = db.define('places-categories', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

module.exports = placeCategory
