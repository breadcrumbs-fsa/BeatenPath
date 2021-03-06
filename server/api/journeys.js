const router = require('express').Router()
// const { } = require('../db/models') TODO: Add models
const Journey = require('../db/models/journey')
const Segment = require('../db/models/segment')

module.exports = router

// Get all journeys
router.get('/', async (req, res, next) => {
  try {
    const journey = await Journey.findAll({include: [{model: Segment}]})
    res.json(journey)
  } catch (err) {
    next(err)
  }
})

// Get all journeys within one place category
router.get('/', async (req, res, next) => {
  try {
    const categorizedJourneys = await Segment.findByPk({
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

// Get all journeys within one journey category
// router.get('/:categoryId', async (req, res, next) => {
//   try {
//     const categorizedJourneys = await Segment.findAll({
//       where: {categoryId: req.params.categoryId}
//     })
//     if (categorizedJourneys) {
//       res.json(categorizedJourneys)
//     } else {
//       res.send('there are no journeys in this category!')
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// Get one journey
router.get('/:journeyId', async (req, res, next) => {
  try {
    const journey = await Journey.findByPk(req.params.journeyId, {
      include: [{model: Segment}]
    })
    if (journey) {
      res.json(journey)
    } else {
      res.send('this journey is no longer around :(')
    }
  } catch (err) {
    next(err)
  }
})

// Get one journey through one category
router.get('/:categoryId/:journeyId', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})

// Add new journey
router.post('/', async (req, res, next) => {
  try {
    const newJourney = await Journey.create(req.body)
    res.json(newJourney)
  } catch (err) {
    next(err)
  }
})

// Update current journey
router.put('/:journeyId', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})

// Delete journey
router.delete('/:journeyId', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})
