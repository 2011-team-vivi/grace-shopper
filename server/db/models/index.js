const User = require('./user')
const Event = require('./event')
//const Card = require('./card')
const Order = require('./cart')

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

User.hasMany(Order)
Order.belongsTo(User)

// User.hasMany(Card)
// Card.belongsTo(User)

Event.belongsToMany(Order, {through: 'OrderEvent'})
Order.belongsToMany(Event, {through: 'OrderEvent'})

module.exports = {
  User,
  Event,
  // Card,
  Order
}
