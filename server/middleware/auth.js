function authenticate(req, res, next) {
  const currentUser = req.user
  console.log(currentUser.id, req.params)
  if (currentUser.id === parseInt(req.params.userId)) next()
  else {
    const error = new Error('Forbidden')
    error.status = 403
    next(error)
  }
}

function authorize(req, res, next) {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) next()
  else {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
}

module.exports = {authenticate, authorize}
