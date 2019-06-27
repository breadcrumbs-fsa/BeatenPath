const router = require('express').Router()
// const { } = require('../db/models') TODO: Add models
module.exports = router

// Get all categories
router.get('/categories', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})

// Get all journeys within one journey category
router.get('/', async (req, res, next) => {
  try {
    const categorizedJourneys = await Segments.findByPk({
      //TODO eager load place categories so this is a search
    })
    if (categorizedJourneys) {
      res.json(categorizedJourneys)
    } else {
      res.send('there are no journeys in this category!')
    }
  } catch (err) {
    next(err)
  }
})
