'use strict'

const db = require('../server/db')
const {Journey, Segment} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  let journeyOne = await Journey.create({
    journeyStart: 'ChIJX5vujr7SD4gRBWqgcPY9OWg',
    journeyEnd: 'ChIJwzCSBdTSD4gR3DvJEJcirNM',
    name: 'Wicker Park Date Day'
  })

  let journeyTwo = await Journey.create({
    journeyEnd: 'ChIJ8QYgD44rDogRNTv_lZJjxrI',
    name: 'Chicago Tourist Highlights',
    journeyStart: 'ChIJ-XW3X2MrDogR3_tQ3-OdBTI'
  })

  await Journey.create({
    journeyEnd: 'ChIJFR3zFUHTD4gRiSGHi3J4B7Y',
    name: 'Sunday Funday',
    journeyStart: 'ChIJUeGtZUXTD4gRoYFjpkjlFTQ'
  })

  await Journey.create({
    journeyEnd: 'ChIJiX4KgLEsDogR8gugSnSptzY',
    name: 'Tra(dish)ional Date',
    journeyStart: 'ChIJNbKQElTTD4gRdOsDd3qTFHM'
  })

  let segOne = await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJe-7eurjSD4gRNiDrNGaFMIU',
    distance: 569,
    order: 0,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJX5vujr7SD4gRBWqgcPY9OWg'
  })

  let segTwo = await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJeRTPP8fSD4gRl4sybR1EJmY',
    distance: 192,
    order: 1,
    transportation: 'WALKING',
    placeId: null,
    segmentStart: 'ChIJe-7eurjSD4gRNiDrNGaFMIU'
  })

  await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJSRu99cbSD4gRz_mDVW6zBXQ',
    distance: 223,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJeRTPP8fSD4gRl4sybR1EJmY',
    updatedAt: '2019-07-10 16:26:32.089-05',
    createdAt: '2019-07-10 16:26:32.089-05'
  })

  await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJwzCSBdTSD4gR3DvJEJcirNM',
    distance: 1358,
    order: 3,
    transportation: 'WALKING',
    segmentStart: 'ChIJSRu99cbSD4gRz_mDVW6zBXQ',
    updatedAt: '2019-07-10 16:26:32.091-05',
    createdAt: '2019-07-10 16:26:32.091-05'
  })
  await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJtRSxt28rDogRpo4hEqqjIGk',
    distance: 596,
    order: 0,
    transportation: 'WALKING',
    segmentStart: 'ChIJ-XW3X2MrDogR3_tQ3-OdBTI',
    updatedAt: '2019-07-10 16:28:18.816-05',
    createdAt: '2019-07-10 16:28:18.816-05'
  })
  await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJV0AwM30rDogR2sd-X0cgErU',
    distance: 1751,
    order: 1,
    transportation: 'WALKING',
    segmentStart: 'ChIJlUbZ4qMsDogR3tCinMzzKUg',
    updatedAt: '2019-07-10 16:28:18.823-05',
    createdAt: '2019-07-10 16:28:18.823-05'
  })
  await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJ-XW3X2MrDogR3_tQ3-OdBTI',
    distance: 167,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJV0AwM30rDogR2sd-X0cgErU',
    updatedAt: '2019-07-10 16:28:18.829-05',
    createdAt: '2019-07-10 16:28:18.829-05'
  })
  await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJ8QYgD44rDogRNTv_lZJjxrI',
    distance: 3684,
    order: 3,
    transportation: 'WALKING',
    segmentStart: 'ChIJtRSxt28rDogRpo4hEqqjIGk',
    updatedAt: '2019-07-10 16:28:18.83-05',
    createdAt: '2019-07-10 16:28:18.83-05'
  })
  await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJNQeqa23TD4gRzt-J6DkIhKw',
    distance: 2275,
    order: 0,
    transportation: 'WALKING',
    segmentStart: 'ChIJUeGtZUXTD4gRoYFjpkjlFTQ',
    updatedAt: '2019-07-10 16:31:31.006-05',
    createdAt: '2019-07-10 16:31:31.006-05'
  })
  await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJB5o6CWvTD4gR25QC-QbMQAk',
    distance: 167,
    order: 1,
    transportation: 'WALKING',
    segmentStart: 'ChIJNQeqa23TD4gRzt-J6DkIhKw',
    updatedAt: '2019-07-10 16:31:31.012-05',
    createdAt: '2019-07-10 16:31:31.012-05'
  })
  await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJB4G48VHSD4gR92AdCoRlMMg',
    distance: 937,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJB5o6CWvTD4gR25QC-QbMQAk',
    updatedAt: '2019-07-10 16:31:31.013-05',
    createdAt: '2019-07-10 16:31:31.013-05'
  })
  await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJFR3zFUHTD4gRiSGHi3J4B7Y',
    distance: 91,
    order: 3,
    transportation: 'WALKING',
    segmentStart: 'ChIJB4G48VHSD4gR92AdCoRlMMg',
    updatedAt: '2019-07-10 16:31:31.02-05',
    createdAt: '2019-07-10 16:31:31.02-05'
  })
  await Segment.create({
    journeyId: 4,
    segmentEnd: 'ChIJuTHCJVPTD4gR_-KiOJ4h5Uc',
    distance: 420,
    order: 0,
    transportation: 'WALKING',
    segmentStart: 'ChIJNbKQElTTD4gRdOsDd3qTFHM',
    updatedAt: '2019-07-10 16:46:47.207-05',
    createdAt: '2019-07-10 16:46:47.207-05'
  })
  await Segment.create({
    journeyId: 4,
    segmentEnd: 'ChIJA5xPiqYsDogRBBCptdwsGEQ',
    distance: 1583,
    order: 1,
    transportation: 'WALKING',
    segmentStart: 'ChIJuTHCJVPTD4gR_-KiOJ4h5Uc',
    updatedAt: '2019-07-10 16:46:47.213-05',
    createdAt: '2019-07-10 16:46:47.213-05'
  })
  await Segment.create({
    journeyId: 4,
    segmentEnd: 'ChIJh4u67aMsDogRnMzJlXRqfGI',
    distance: 337,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJA5xPiqYsDogRBBCptdwsGEQ',
    updatedAt: '2019-07-10 16:46:47.221-05',
    createdAt: '2019-07-10 16:46:47.221-05'
  })
  await Segment.create({
    journeyId: 4,
    segmentEnd: 'ChIJRwcF968sDogRQqumQflFR0U',
    distance: 934,
    order: 3,
    transportation: 'WALKING',
    segmentStart: 'ChIJh4u67aMsDogRnMzJlXRqfGI',
    updatedAt: '2019-07-10 16:46:47.226-05',
    createdAt: '2019-07-10 16:46:47.226-05'
  })
  await Segment.create({
    journeyId: 4,
    segmentEnd: 'ChIJiX4KgLEsDogR8gugSnSptzY',
    distance: 710,
    order: 4,
    transportation: 'WALKING',
    segmentStart: 'ChIJRwcF968sDogRQqumQflFR0U',
    updatedAt: '2019-07-10 16:46:47.24-05',
    createdAt: '2019-07-10 16:46:47.24-05'
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
