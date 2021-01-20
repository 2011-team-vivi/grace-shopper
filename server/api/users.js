const router = require('express').Router()
const {User} = require('../db/models')
const {authorize} = require('../middleware/auth')
module.exports = router

router.get('/', authorize, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
