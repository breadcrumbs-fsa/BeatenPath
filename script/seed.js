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
    // id: 3,
    journeyEnd: 'ChIJ8QYgD44rDogRNTv_lZJjxrI',
    name: 'tourist',
    journeyStart: 'ChIJlUbZ4qMsDogR3tCinMzzKUg'
  })

  // let journeyTwo = await Journey.create({
  //   // id: 4,
  //   journeyEnd: 'ChIJeRTPP8fSD4gRl4sybR1EJmY',
  //   updatedAt: '2019-07-03 14:29:29.317-05',
  //   name: 'Bar Crawl',
  //   journeyStart: 'ChIJk6WVC5XSD4gRxhZ8j-A-loE',
  //   createdAt: '2019-07-03 14:29:29.317-05'
  // })

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

  let segFive = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJV0AwM30rDogR2sd-X0cgErU',
    order: 0,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJlUbZ4qMsDogR3tCinMzzKUg'
  })

  let segSix = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJ-XW3X2MrDogR3_tQ3-OdBTI',
    order: 1,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJV0AwM30rDogR2sd-X0cgErU'
  })

  let segSeven = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJtRSxt28rDogRpo4hEqqjIGk',
    order: 2,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJ-XW3X2MrDogR3_tQ3-OdBTI'
  })

  let segEight = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJ8QYgD44rDogRNTv_lZJjxrI',
    order: 3,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJtRSxt28rDogRpo4hEqqjIGk'
  })

  // let segNine = await Segment.create({
  //   journeyId: 2,
  //   segmentEnd: 'ChIJ2dxMprjSD4gRvUWbdblbV1w',
  //   // id: 9,
  //   order: 0,
  //   transportation: 'WALKING',
  //   placeId: null,
  //   segmentStart: 'ChIJk6WVC5XSD4gRxhZ8j-A-loE',
  //   updatedAt: '2019-07-03 15:38:18.059-05',
  //   createdAt: '2019-07-03 15:38:18.059-05'
  // })

  // let segTen = await Segment.create({
  //   journeyId: 2,
  //   segmentEnd: 'ChIJazuRe8fSD4gRJeLBiMM_Izg',
  //   // id: 10,
  //   order: 1,
  //   transportation: 'WALKING',
  //   placeId: null,
  //   segmentStart: 'ChIJ2dxMprjSD4gRvUWbdblbV1w',
  //   updatedAt: '2019-07-03 15:38:26.491-05',
  //   createdAt: '2019-07-03 15:38:26.491-05'
  // })

  // let segEleven = await Segment.create({
  //   journeyId: 2,
  //   segmentEnd: 'ChIJzx42AsfSD4gRpemze8L8nO4',
  //   // id: 11,
  //   order: 2,
  //   transportation: 'WALKING',
  //   placeId: null,
  //   segmentStart: 'ChIJazuRe8fSD4gRJeLBiMM_Izg',
  //   updatedAt: '2019-07-03 15:38:33.527-05',
  //   createdAt: '2019-07-03 15:38:33.527-05'
  // })

  // let segTwelve = await Segment.create({
  //   journeyId: 2,
  //   segmentEnd: 'ChIJ7ZBcatgsDogRVeUuWDAD0TM',
  //   // id: 12,
  //   order: 3,
  //   transportation: 'WALKING',
  //   placeId: null,
  //   segmentStart: 'ChIJzx42AsfSD4gRpemze8L8nO4',
  //   updatedAt: '2019-07-03 15:38:42.165-05',
  //   createdAt: '2019-07-03 15:38:42.165-05'
  // })

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
