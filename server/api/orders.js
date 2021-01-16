const router = require('express').Router()
const {User, Order, OrderEvent} = require('../db/models')
const auth = require('../middleware/auth') // add this middleware to protected routes

router.get('/', (req, res, next) => {
  const {id} = req.user
  Order.findAll({
    where: {userId: id}
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'pending'
      },
      include: [{model: OrderEvent}]
    })
    // Another option to find al the OrderEvent row that belongs to an order
    // OrderEvent.findAll({where: orderId: order.orderId})
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.delete('/:orderId', (req, res, next) => {
  Order.destroy({
    where: {
      id: req.params.orderId
    }
  })
    .then(() => res.status(204).end())
    .catch(next)
})

module.exports = router
