'use strict'
//adfadfadf

const db = require('../server/db')
const {User, Event, Order, OrderEvent} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  /* --------------------users---------------------------*/
  const usersCreated = []

  const createFakeUser = () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    isAdmin: false,
    email: faker.internet.email(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    lastLogin: faker.date.recent()
  })

  const user = await User.create(createFakeUser())

  for (let i = 0; i < 100; i++) {
    usersCreated.push(User.create(createFakeUser()))
  }

  const users = await Promise.all(usersCreated)
  /* --------------------orders---------------------------*/
  const order = await Order.create({status: 'pending'})

  order.setUser(user)

  /* --------------------events---------------------------*/

  const event = await Event.create(createFakeEvents())

  const eventsCreated = []

  function createFakeEvents() {
    return {
      title: faker.company.companyName(),
      date: faker.date.future(),
      location: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
      description: faker.commerce.productDescription(),
      price: Math.floor(Math.random() * 1000),
      ticketQuantity: Math.floor(Math.random() * 100),
      imageURL: faker.image.imageUrl(),
      isFeatured: false
    }
  }

  for (let i = 0; i < 100; i++) {
    eventsCreated.push(Event.create(createFakeEvents()))
  }

  const events = await Promise.all(eventsCreated)

  /* --------------------orderEvents---------------------------*/

  const orderEvent = await OrderEvent.create({
    ticketQuantity: 2,
    purchasePrice: 2000,
    orderId: user.id,
    eventId: event.id
  })

  /* --------------------cards(tier 2)---------------------------*/

  // const cardTypes = ['MasterCard', 'Visa', 'Discover', 'Amex']
  // const cardsCreated = []
  // const createFakeCards = () => ({
  //   nameOnCard: `${faker.name.firstName()} ${faker.name.lastName()}`,
  //   cardType: cardTypes[Math.floor(Math.random() * 4)],
  //   cardNumber: faker.finance.creditCardNumber(),
  //   CVV: faker.finance.creditCardCVV(),
  //   expiration: faker.date.future(),
  //   billingStreet: faker.address.streetAddress(),
  //   billingCity: faker.address.city(),
  //   billingState: faker.address.stateAbbr(),
  //   billingZip: faker.address.zipCodeByState().split('-')[0]
  // })

  // for (let i = 0; i < 100; i++) {
  //   const usersCard = Card.create(createFakeCards())
  //   cardPromises.push(usersCard.setUser(users[i]))
  // }

  // const cards = await Promise.all(cardsCreated)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${events.length} events`)
  // console.log(`seeded ${cards.length} cards`)
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
