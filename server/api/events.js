const router = require('express').Router()
const {Event} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll()
    res.json(events)
  } catch (err) {
    next(err)
  }
})

// router.get('/add', async (req, res, next) => {
//   try {
//     const event = await Event.create(req.body)
//     res.json(event)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id)
    res.json(event)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const event = await Event.destroy({where: {id: req.params.id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
