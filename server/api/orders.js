const router = require('express').Router()
const {User, Order, OrderEvent, Event} = require('../db/models')
const {authenticate} = require('../middleware/auth') // add this middleware to protected routes

router.get('/:userId', authenticate, (req, res, next) => {
  const {id} = req.user
  Order.findAll({
    where: {userId: id}
  })
    .then(orders => res.json(orders))
    .catch(next)
})

// pending vs :orderId
router.get('/pending/:userId', authenticate, async (req, res, next) => {
  console.log('get', req.body)
  //findByPk
  try {
    // const order = await Order.findByPk(req.params.orderId, {
    //   include: {model: Event, through: OrderEvent},
    // })
    // const order = await Order.findByPk(req.params.orderId, {
    //   include: {model: OrderEvent, include: {model: Event}},
    // })
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'pending'
      },
      include: {
        model: OrderEvent,
        include: {model: Event}
      },
      order: [[OrderEvent, 'createdAt', 'DESC']]
    })

    // Another option to find all the OrderEvent rows that belongs to an order: OrderEvent.findAll({where: orderId: order.orderId})
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// router.delete('/:orderId', (req, res, next) => {
//   Order.destroy({
//     where: {
//       id: req.params.orderId,
//     },
//   })
//     .then(() => res.status(204).end())
//     .catch(next)
// })

module.exports = router
