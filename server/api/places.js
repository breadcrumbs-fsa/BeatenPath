const router = require('express').Router()
// const { } = require('../db/models') TODO: Add models
module.exports = router

// Get all places in journey
router.get('/', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})

// Get all places that match place category search queries
router.get('/', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})

// Add place to journey
router.post('/:journeyId', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})

// Update place in journey
router.post('/:journeyId/:placeId', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})

// Delete place in journey
router.post('/:journeyId/:placeId', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})
