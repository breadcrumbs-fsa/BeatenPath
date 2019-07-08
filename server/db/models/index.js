const User = require('./user')
const Journey = require('./journey')
const JourneyCategory = require('./journeyCategory')
const Place = require('./place')
const PlaceCategory = require('./placeCategory')
const Segment = require('./segment')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

PlaceCategory.belongsToMany(Place, {through: 'place-join-category'})
Place.belongsToMany(PlaceCategory, {through: 'place-join-category'})

JourneyCategory.belongsToMany(Journey, {through: 'journey-join-category'})
Journey.belongsToMany(JourneyCategory, {through: 'journey-join-category'})
// Journey.hasMany(JourneyCategory)

Segment.hasMany(Place) // 2 places to 1 segment
Place.belongsTo(Segment)
// belongs to many?
// Place.belongsTo(Segment)

Segment.belongsTo(Journey)
Journey.hasMany(Segment)

Place.belongsToMany(Journey, {through: 'places-journeys'})
Journey.belongsToMany(Place, {through: 'places-journeys'})

module.exports = {
  User,
  Journey,
  JourneyCategory,
  Place,
  PlaceCategory,
  Segment
}
