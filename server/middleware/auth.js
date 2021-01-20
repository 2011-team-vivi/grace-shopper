function authenticate(req, res, next) {
  const currentUser = req.user
  if (currentUser.id === req.body.userId) next()
  else {
    const error = new Error('Access Denied')
    error.status = 401
    next(error)
  }
}

function authorize(req, res, next) {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) next()
  else {
    const error = new Error('Access Denied')
    error.status = 401
    next(error)
  }
}

module.exports = {authenticate, authorize}
