const router = require('express').Router()
const {Order} = require('../db/models')
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  console.log('login before', req.sessionID)

  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => {
        console.log('login after', req.sessionID)
        return err ? next(err) : res.json(user)
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const order = await Order.create({
      userId: user.id,
      status: 'pending'
    })
    req.login(user, err => (err ? next(err) : res.json(user))) // maybe send the order too
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  console.log('/meeee', req.sessionID)
  // console.log('req.user', req.user)
  res.json(req.user)
})

router.use('/google', require('./google'))
