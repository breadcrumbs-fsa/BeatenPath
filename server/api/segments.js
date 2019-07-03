const router = require('express').Router()
// const { } = require('../db/models') TODO: Add models
const Segment = require('../db/models/segment')

module.exports = router

// Get all segments of specific journey

//TODO should this route be here? Or just in journeys? or both?

// router.get('/:journeyId', async (req, res, next) => {
//     try {
//         const segments = await Segments.findAll({where: {journeyId: req.params.journeyId}})
//             if (segments) {
//                 res.json(segments)
//             } else {
//                 res.send('this journey is no longer around :(')
//             }
//     } catch (err) {
//         next(err)
//     }
// })

// Get current segment of specific journey
router.get('/:journeyId/:segmentId', async (req, res, next) => {
  try {
    const currentSegment = await Segments.findByPk(rq.params.segmentId)
    if (currentSegment) {
      res.json(currentSegment)
    } else {
      res.send('this leg of the journey has magically disappeared')
    }
  } catch (err) {
    next(err)
  }
})

// Add new segment
router.post('/', async (req, res, next) => {
  try {
    const newSegment = await Segment.create(req.body)
    res.json(newSegment)
  } catch (err) {
    next(err)
  }
})

// Update current segment
router.put('/:journeyId/:segmentId', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})

// Delete segment
router.delete('/:journeyId/:segmentId', async (req, res, next) => {
  try {
    res.json()
  } catch (err) {
    next(err)
  }
})
