'use strict'

const db = require('../server/db')
const {Journey, Segment} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  let journeyOne = await Journey.create({
    journeyStart: 'ChIJNdcMrkksDogRS_COh3n2vNA',
    journeyEnd: 'ChIJqYYJXhMsDogRWuCPkY0NxKk',
    name: 'bridgeport'
  })

  let journeyTwo = await Journey.create({
    journeyEnd: 'ChIJ8QYgD44rDogRNTv_lZJjxrI',
    name: 'tourist',
    journeyStart: 'ChIJlUbZ4qMsDogR3tCinMzzKUg'
  })

  await Journey.create({
    journeyEnd: 'ChIJ1_gIYhQpDogRws11Ca6a00Y',
    name: 'hyde park',
    journeyStart: 'ChIJTeoOzD8pDogRU0ONY7Wxil8'
  })

  let segOne = await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJpZvInUcsDogRQ__tU4Iik-Q',
    order: 0,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJNdcMrkksDogRS_COh3n2vNA'
  })

  let segTwo = await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJZTa9XjgsDogRhJhoNLqx6A0',
    order: 1,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJpZvInUcsDogRQ__tU4Iik-Q'
  })

  let segThree = await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJqYYJXhMsDogRWuCPkY0NxKk',
    order: 2,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJZTa9XjgsDogRhJhoNLqx6A0'
  })

  let segFour = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJV0AwM30rDogR2sd-X0cgErU',
    order: 0,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJlUbZ4qMsDogR3tCinMzzKUg'
  })

  let segFive = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJ-XW3X2MrDogR3_tQ3-OdBTI',
    order: 1,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJV0AwM30rDogR2sd-X0cgErU'
  })

  let segSix = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJtRSxt28rDogRpo4hEqqjIGk',
    order: 2,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJ-XW3X2MrDogR3_tQ3-OdBTI'
  })

  let segSeven = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJ8QYgD44rDogRNTv_lZJjxrI',
    order: 3,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJtRSxt28rDogRpo4hEqqjIGk'
  })

  await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJuRpqmhUpDogR4ff5cnIrILk',
    distance: 350,
    order: 0,
    transportation: 'WALKING',
    segmentStart: 'ChIJTeoOzD8pDogRU0ONY7Wxil8'
  })

  await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJCSwjBhUpDogRVIxJazSIqAo',
    distance: 332,
    order: 1,
    transportation: 'WALKING',
    segmentStart: 'ChIJuRpqmhUpDogR4ff5cnIrILk'
  })

  await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJ1_gIYhQpDogRws11Ca6a00Y',
    distance: 342,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJCSwjBhUpDogRVIxJazSIqAo',
    updatedAt: '2019-07-09 18:48:28.082-05',
    createdAt: '2019-07-09 18:48:28.082-05'
  })

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
