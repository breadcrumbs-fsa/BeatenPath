const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use('/google', require('./google'))

router.use('/journeys', require('./journeys'))

router.use('/segments', require('./segments'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
