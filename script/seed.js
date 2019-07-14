'use strict'

const db = require('../server/db')
const {Journey, Segment} = require('../server/db/models')

// eslint-disable-next-line max-statements
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //PRESENTATION JOURNEY

  await Journey.create({
    journeyEnd: 'ChIJf6m9-bEsDogRcgm9nf2Dtho',
    updatedAt: '2019-07-12 14:57:10.063-05',
    name: 'Chicago Loop Classics 🏙',
    journeyStart: 'ChIJV0AwM30rDogR2sd-X0cgErU',
    createdAt: '2019-07-12 14:57:10.063-05'
  })

  await Journey.create({
    journeyEnd: 'ChIJA5xPiqYsDogRBBCptdwsGEQ',
    updatedAt: '2019-07-14 13:20:21.824-05',
    name: 'Kid-ventures by the Pier 🎡',
    journeyStart: 'ChIJ2y7xkU0rDogR3KSIsJbbrNA',
    createdAt: '2019-07-14 13:20:21.824-05'
  })

  await Journey.create({
    journeyEnd: 'ChIJNbKQElTTD4gRdOsDd3qTFHM',
    updatedAt: '2019-07-14 13:28:26.372-05',
    name: 'Sky-High City Views ☁️',
    journeyStart: 'ChIJu_tp4r4sDogRfYy4Xs5tDwE',
    createdAt: '2019-07-14 13:28:26.372-05'
  })

  await Journey.create({
    journeyEnd: 'ChIJOxc99b4sDogReRG3-qoMN5Q',
    updatedAt: '2019-07-12 15:19:46.44-05',
    name: 'Sunday Funday 🍾',
    journeyStart: 'ChIJC_YdYqwsDogR3xYeKE6rLfA',
    createdAt: '2019-07-12 15:19:46.44-05'
  })

  await Journey.create({
    journeyEnd: 'ChIJKXA7AlXTD4gRsvBFJ8wG9x4',
    updatedAt: '2019-07-14 13:36:59.6-05',
    name: 'Downtown Art Adventure 🎨',
    journeyStart: 'ChIJnyUAFaIsDogRZUVHgCxK_X8',
    createdAt: '2019-07-14 13:36:59.6-05'
  })

  await Journey.create({
    journeyEnd: 'ChIJR1SjLbIsDogR2hKQQejxOtc',
    name: 'Chicago Loop Hidden Gems 💎',
    journeyStart: 'ChIJ3x_LPKotDogRlVVkZiSwgbI'
  })
  await Journey.create({
    journeyEnd: 'ChIJiX4KgLEsDogR8gugSnSptzY',
    updatedAt: '2019-07-14 13:24:06.945-05',
    name: 'Downtown Bar Stroll 🍸',
    journeyStart: 'ChIJ6dIIwZgsDogRqE6HDkbbO7w',
    createdAt: '2019-07-14 13:24:06.945-05'
  })

  await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJh479BaAsDogRWa7hmywCQCQ',
    distance: 1210,
    order: 0,
    transportation: 'WALKING',
    segmentStart: 'ChIJV0AwM30rDogR2sd-X0cgErU',
    updatedAt: '2019-07-12 14:57:10.181-05',
    createdAt: '2019-07-12 14:57:10.181-05'
  })

  await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJl3iX_JcsDogRIkGnC9snea4',
    distance: 806,
    order: 1,
    transportation: 'WALKING',
    segmentStart: 'ChIJh479BaAsDogRWa7hmywCQCQ',
    updatedAt: '2019-07-12 14:57:10.19-05',
    createdAt: '2019-07-12 14:57:10.19-05'
  })

  await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJlUbZ4qMsDogR3tCinMzzKUg',
    distance: 889,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJl3iX_JcsDogRIkGnC9snea4',
    updatedAt: '2019-07-12 14:57:10.192-05',
    createdAt: '2019-07-12 14:57:10.192-05'
  })

  await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJl8NTEawsDogRwXH-IVDyH2A',
    distance: 1300,
    order: 3,
    transportation: 'WALKING',
    segmentStart: 'ChIJlUbZ4qMsDogR3tCinMzzKUg',
    updatedAt: '2019-07-12 14:57:10.193-05',
    createdAt: '2019-07-12 14:57:10.193-05'
  })

  await Segment.create({
    journeyId: 1,
    segmentEnd: 'ChIJf6m9-bEsDogRcgm9nf2Dtho',
    distance: 479,
    order: 4,
    transportation: 'WALKING',
    segmentStart: 'ChIJl8NTEawsDogRwXH-IVDyH2A',
    updatedAt: '2019-07-12 14:57:10.194-05',
    createdAt: '2019-07-12 14:57:10.194-05'
  })

  await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJW23RRia0D4gRlL8HDSx0fLA',
    distance: 133,
    order: 0,
    transportation: 'WALKING',
    segmentStart: 'ChIJ2y7xkU0rDogR3KSIsJbbrNA',
    updatedAt: '2019-07-14 13:20:21.868-05',
    createdAt: '2019-07-14 13:20:21.868-05'
  })
  await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJ9UhqaVQrDogRHca-3sipFeA',
    distance: 553,
    order: 1,
    transportation: 'WALKING',
    segmentStart: 'ChIJW23RRia0D4gRlL8HDSx0fLA',
    updatedAt: '2019-07-14 13:20:21.87-05',
    createdAt: '2019-07-14 13:20:21.87-05'
  })
  await Segment.create({
    journeyId: 2,
    segmentEnd: 'ChIJA5xPiqYsDogRBBCptdwsGEQ',
    distance: 1683,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJ9UhqaVQrDogRHca-3sipFeA',
    updatedAt: '2019-07-14 13:20:21.884-05',
    createdAt: '2019-07-14 13:20:21.884-05'
  })

  await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJgfAAC6csDogRK6Ew7nIj9ss',
    distance: 1627,
    order: 0,
    transportation: 'WALKING',
    segmentStart: 'ChIJu_tp4r4sDogRfYy4Xs5tDwE',
    updatedAt: '2019-07-14 13:28:26.395-05',
    createdAt: '2019-07-14 13:28:26.395-05'
  })

  await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJr7zdAKwsDogRrMIKO4_-HT0',
    distance: 1257,
    order: 1,
    transportation: 'WALKING',
    segmentStart: 'ChIJgfAAC6csDogRK6Ew7nIj9ss',
    updatedAt: '2019-07-14 13:28:26.403-05',
    createdAt: '2019-07-14 13:28:26.403-05'
  })
  await Segment.create({
    journeyId: 3,
    segmentEnd: 'ChIJNbKQElTTD4gRdOsDd3qTFHM',
    distance: 933,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJr7zdAKwsDogRrMIKO4_-HT0',
    updatedAt: '2019-07-14 13:28:26.408-05',
    createdAt: '2019-07-14 13:28:26.408-05'
  })

  await Segment.create({
    journeyId: 4,
    segmentEnd: 'ChIJNbKQElTTD4gRdOsDd3qTFHM',
    distance: 672,
    order: 0,
    transportation: 'WALKING',
    segmentStart: 'ChIJC_YdYqwsDogR3xYeKE6rLfA',
    updatedAt: '2019-07-12 15:19:46.554-05',
    createdAt: '2019-07-12 15:19:46.554-05'
  })

  await Segment.create({
    journeyId: 4,
    segmentEnd: 'ChIJKXA7AlXTD4gRsvBFJ8wG9x4',
    distance: 336,
    order: 1,
    transportation: 'WALKING',
    segmentStart: 'ChIJNbKQElTTD4gRdOsDd3qTFHM',
    updatedAt: '2019-07-12 15:19:46.559-05',
    createdAt: '2019-07-12 15:19:46.559-05'
  })

  await Segment.create({
    journeyId: 4,
    segmentEnd: 'ChIJHzRIuaUsDogRP_AJdMSgzjI',
    distance: 1865,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJKXA7AlXTD4gRsvBFJ8wG9x4',
    updatedAt: '2019-07-12 15:19:46.56-05',
    createdAt: '2019-07-12 15:19:46.56-05'
  })

  await Segment.create({
    journeyId: 4,
    segmentEnd: 'ChIJu_tp4r4sDogRfYy4Xs5tDwE',
    distance: 1338,
    order: 3,
    transportation: 'WALKING',
    segmentStart: 'ChIJHzRIuaUsDogRP_AJdMSgzjI',
    updatedAt: '2019-07-12 15:19:46.562-05',
    createdAt: '2019-07-12 15:19:46.562-05'
  })

  await Segment.create({
    journeyId: 4,
    segmentEnd: 'ChIJOxc99b4sDogReRG3-qoMN5Q',
    distance: 97,
    order: 4,
    transportation: 'WALKING',
    segmentStart: 'ChIJu_tp4r4sDogRfYy4Xs5tDwE',
    updatedAt: '2019-07-12 15:19:46.563-05',
    createdAt: '2019-07-12 15:19:46.563-05'
  })

  await Segment.create({
    journeyId: 5,
    segmentEnd: 'ChIJlUbZ4qMsDogR3tCinMzzKUg',
    distance: 346,
    order: 0,
    transportation: 'WALKING',
    segmentStart: 'ChIJnyUAFaIsDogRZUVHgCxK_X8',
    updatedAt: '2019-07-14 13:36:59.624-05',
    createdAt: '2019-07-14 13:36:59.624-05'
  })
  await Segment.create({
    journeyId: 5,
    segmentEnd: 'ChIJ5a8ra6QsDogRENtJLAp40AE',
    distance: 838,
    order: 1,
    transportation: 'WALKING',
    segmentStart: 'ChIJlUbZ4qMsDogR3tCinMzzKUg',
    updatedAt: '2019-07-14 13:36:59.627-05',
    createdAt: '2019-07-14 13:36:59.627-05'
  })
  await Segment.create({
    journeyId: 5,
    segmentEnd: 'ChIJHzRIuaUsDogRP_AJdMSgzjI',
    distance: 379,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJ5a8ra6QsDogRENtJLAp40AE',
    updatedAt: '2019-07-14 13:36:59.631-05',
    createdAt: '2019-07-14 13:36:59.631-05'
  })
  await Segment.create({
    journeyId: 5,
    segmentEnd: 'ChIJKXA7AlXTD4gRsvBFJ8wG9x4',
    distance: 1865,
    order: 3,
    transportation: 'WALKING',
    segmentStart: 'ChIJHzRIuaUsDogRP_AJdMSgzjI',
    updatedAt: '2019-07-14 13:36:59.636-05',
    createdAt: '2019-07-14 13:36:59.636-05'
  })

  await Segment.create({
    journeyId: 6,
    segmentEnd: 'ChIJV9pYbJssDogRafJH1kYVdSw',
    distance: 784,
    order: 0,
    transportation: 'WALKING',
    segmentStart: 'ChIJ3x_LPKotDogRlVVkZiSwgbI',
    updatedAt: '2019-07-13 17:25:01.353-05',
    createdAt: '2019-07-13 17:25:01.353-05'
  })
  await Segment.create({
    journeyId: 6,
    segmentEnd: 'ChIJh4u67aMsDogRnMzJlXRqfGI',
    distance: 1388,
    order: 1,
    transportation: 'WALKING',
    segmentStart: 'ChIJV9pYbJssDogRafJH1kYVdSw',
    updatedAt: '2019-07-13 17:25:01.362-05',
    createdAt: '2019-07-13 17:25:01.362-05'
  })
  await Segment.create({
    journeyId: 6,
    segmentEnd: 'ChIJHzRIuaUsDogRP_AJdMSgzjI',
    distance: 458,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJh4u67aMsDogRnMzJlXRqfGI',
    updatedAt: '2019-07-13 17:25:01.363-05',
    createdAt: '2019-07-13 17:25:01.363-05'
  })
  await Segment.create({
    journeyId: 6,
    segmentEnd: 'ChIJH5l_WYcsDogRw8ymcCe737E',
    distance: 291,
    order: 3,
    transportation: 'WALKING',
    segmentStart: 'ChIJHzRIuaUsDogRP_AJdMSgzjI',
    updatedAt: '2019-07-13 17:25:01.374-05',
    createdAt: '2019-07-13 17:25:01.374-05'
  })
  await Segment.create({
    journeyId: 6,
    segmentEnd: 'ChIJR1SjLbIsDogR2hKQQejxOtc',
    distance: 1063,
    order: 4,
    transportation: 'WALKING',
    segmentStart: 'ChIJH5l_WYcsDogRw8ymcCe737E',
    updatedAt: '2019-07-13 17:25:01.376-05',
    createdAt: '2019-07-13 17:25:01.376-05'
  })

  await Segment.create({
    journeyId: 7,
    segmentEnd: 'ChIJD2qt8UotDogRGD52rCgUD7o',
    distance: 1003,
    order: 0,
    transportation: 'WALKING',
    segmentStart: 'ChIJ6dIIwZgsDogRqE6HDkbbO7w',
    updatedAt: '2019-07-14 13:24:06.978-05',
    createdAt: '2019-07-14 13:24:06.978-05'
  })
  await Segment.create({
    journeyId: 7,
    segmentEnd: 'ChIJeYbaOKQsDogRfJrgIMgDNvE',
    distance: 564,
    order: 1,
    transportation: 'WALKING',
    segmentStart: 'ChIJD2qt8UotDogRGD52rCgUD7o',
    updatedAt: '2019-07-14 13:24:06.983-05',
    createdAt: '2019-07-14 13:24:06.983-05'
  })
  await Segment.create({
    journeyId: 7,
    segmentEnd: 'ChIJiX4KgLEsDogR8gugSnSptzY',
    distance: 1369,
    order: 2,
    transportation: 'WALKING',
    segmentStart: 'ChIJeYbaOKQsDogRfJrgIMgDNvE',
    updatedAt: '2019-07-14 13:24:06.988-05',
    createdAt: '2019-07-14 13:24:06.988-05'
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
