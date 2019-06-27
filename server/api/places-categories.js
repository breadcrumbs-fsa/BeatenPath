const router = require('express').Router()
// const { } = require('../db/models') TODO: Add models
module.exports = router

// Get all places in search radius
router.get('/', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})
