'use strict'

const db = require('../server/db')
const {Journey, Segment} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  let journeyOne = await Journey.create({
    // id: 1,
    journeyEnd: 'ChIJb5jjxrjaD4gRXr0WSVF-WOU',
    updatedAt: '2019-07-03 14:15:01.193-05',
    name: 'Date Night',
    journeyStart: 'ChIJIbdi2_8sDogRNs8JXduUSpo',
    createdAt: '2019-07-03 14:15:01.193-05'
  })

  let journeyTwo = await Journey.create({
    // id: 3,
    journeyEnd: 'ChIJ78NyRsUsDogR6AqyYoPrts4',
    updatedAt: '2019-07-03 14:25:15.949-05',
    name: 'Afternoon',
    journeyStart: 'ChIJ2y7xkU0rDogR3KSIsJbbrNA',
    createdAt: '2019-07-03 14:25:15.949-05'
  })

  let journeyThree = await Journey.create({
    // id: 4,
    journeyEnd: 'ChIJeRTPP8fSD4gRl4sybR1EJmY',
    updatedAt: '2019-07-03 14:29:29.317-05',
    name: 'Bar Crawl',
    journeyStart: 'ChIJk6WVC5XSD4gRxhZ8j-A-loE',
    createdAt: '2019-07-03 14:29:29.317-05'
  })

  let segOne = await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJg4wvjkbTD4gR9wL71pYazkg',
    // id: 1,
    order: 0,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJIbdi2_8sDogRNs8JXduUSpo',
    updatedAt: '2019-07-03 15:06:39.534-05',
    createdAt: '2019-07-03 15:06:39.534-05'
  })

  let segTwo = await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJVUmkEX0sDogRcQVW_jiV2JE',
    // id: 2,
    order: 1,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJg4wvjkbTD4gR9wL71pYazkg',
    updatedAt: '2019-07-03 15:16:44.108-05',
    createdAt: '2019-07-03 15:16:44.108-05'
  })

  let segThree = await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJwwvDb8fSD4gRb54qO3OOpVA',
    // id: 3,
    order: 2,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJVUmkEX0sDogRcQVW_jiV2JE',
    updatedAt: '2019-07-03 15:16:59.587-05',
    createdAt: '2019-07-03 15:16:59.587-05'
  })

  let segFour = await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJb5jjxrjaD4gRXr0WSVF-WOU',
    // id: 4,
    order: 3,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJwwvDb8fSD4gRb54qO3OOpVA',
    updatedAt: '2019-07-03 15:19:00.222-05',
    createdAt: '2019-07-03 15:19:00.222-05'
  })

  let segFive = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJr-ihyFbTD4gR81mealSWir4',
    // id: 5,
    order: 0,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJ2y7xkU0rDogR2KSIsJbbrNA',
    updatedAt: '2019-07-03 15:25:52.692-05',
    createdAt: '2019-07-03 15:25:52.692-05'
  })

  let segSix = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJD-dqScYsDogRF6FSDLxT3H8',
    // id: 6,
    order: 1,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJr-ihyFbTD4gR81mealSWir4',
    updatedAt: '2019-07-03 15:26:01.89-05',
    createdAt: '2019-07-03 15:26:01.89-05'
  })

  let segSeven = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJ78NyRsUsDogR6AqyYoPrts4',
    // id: 7,
    order: 2,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJD-dqScYsDogRF6FSDLxT3H8',
    updatedAt: '2019-07-03 15:26:10.557-05',
    createdAt: '2019-07-03 15:26:10.557-05'
  })

  let segEight = await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJ7ZBcatgsDogRVeUuWDAD0TM',
    // id: 8,
    order: 3,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJ78NyRsUsDogR6AqyYoPrts4',
    updatedAt: '2019-07-03 15:26:18.973-05',
    createdAt: '2019-07-03 15:26:18.973-05'
  })

  let segNine = await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJ2dxMprjSD4gRvUWbdblbV1w',
    // id: 9,
    order: 0,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJk6WVC5XSD4gRxhZ8j-A-loE',
    updatedAt: '2019-07-03 15:38:18.059-05',
    createdAt: '2019-07-03 15:38:18.059-05'
  })

  let segTen = await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJazuRe8fSD4gRJeLBiMM_Izg',
    // id: 10,
    order: 1,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJ2dxMprjSD4gRvUWbdblbV1w',
    updatedAt: '2019-07-03 15:38:26.491-05',
    createdAt: '2019-07-03 15:38:26.491-05'
  })

  let segEleven = await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJzx42AsfSD4gRpemze8L8nO4',
    // id: 11,
    order: 2,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJazuRe8fSD4gRJeLBiMM_Izg',
    updatedAt: '2019-07-03 15:38:33.527-05',
    createdAt: '2019-07-03 15:38:33.527-05'
  })

  let segTwelve = await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJ7ZBcatgsDogRVeUuWDAD0TM',
    // id: 12,
    order: 3,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJzx42AsfSD4gRpemze8L8nO4',
    updatedAt: '2019-07-03 15:38:42.165-05',
    createdAt: '2019-07-03 15:38:42.165-05'
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
