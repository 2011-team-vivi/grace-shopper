const router = require('express').Router()
const {User, Order, OrderEvent} = require('../db/models')
const auth = require('../middleware/auth') // add this middleware to protected routes

router.post('/', async (req, res, next) => {
  try {
    // Find the current pending order
    console.log('foundddd')
    const {id: orderId} = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'pending'
      }
    })
    // find the OrderEvent row associated with the eventId that we want to update (if it already exists) or create
    let orderEvent = await OrderEvent.findOne({
      where: {eventId: req.body.eventId, orderId}
    })
    //If the OrderEvent row doesn't exist, create a new Order Event instance/row
    if (!orderEvent) {
      orderEvent = await OrderEvent.create({...req.body, orderId})
      return res.json(orderEvent) // return stops the execution
    }
    // If it exists, update it with the new ticketQuantity
    const ticketQuantity = orderEvent.ticketQuantity + req.body.ticketQuantity
    orderEvent = await orderEvent.update({...req.body, ticketQuantity})
    res.json(orderEvent)
  } catch (error) {
    next(error)
  }
})

router.put('/:orderEventId', async (req, res, next) => {
  try {
    let orderEvent = await OrderEvent.findByPk(req.params.orderEventId)
    orderEvent.update({ticketQuantity: req.body.ticketQuantity}) // reload?
    res.json(orderEvent)
  } catch (error) {
    next(error)
  }
})

router.delete('/:orderEventId', async (req, res, next) => {
  try {
    await OrderEvent.destroy({
      where: {
        id: req.params.orderEventId
      }
    })
    res.status(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
