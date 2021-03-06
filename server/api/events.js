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

router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id)
    res.json(event)
  } catch (err) {
    next(err)
  }
})

// const { isAdmin } = require("../middleware/auth");
// put auth route here-V
router.put('/edit/:id', async (req, res, next) => {
  try {
    console.log('Edit api route!!-', req.body)
    const event = await Event.findByPk(req.params.id)
    await event.update(req.body)
    res.json(event)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const event = await Event.destroy({where: {id: req.params.id}})
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

router.post('/add/form', async (req, res, next) => {
  try {
    const event = await Event.create(req.body)
    res.json(event)
  } catch (err) {
    next(err)
  }
})
