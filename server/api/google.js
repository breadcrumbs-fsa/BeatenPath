const router = require('express').Router()
const secrets = require('../../secrets')
const mapkey = process.env.GOOGLE_MAPJS_KEY

const googleMapsClient = require('@google/maps').createClient({
  key: mapkey,
  Promise: Promise
})
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const response = await googleMapsClient
      .geocode({
        address: '1723 N Halsted St, Chicago, IL'
      })
      .asPromise()
    console.log('response data: ', response.json.results)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
