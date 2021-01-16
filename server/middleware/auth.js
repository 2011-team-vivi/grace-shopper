module.exports = function(req, res, next) {
  const currentUser = req.user
  if (currentUser) next()
  else {
    const error = new Error('Access Denied')
    error.status = 401
    next(error)
  }
}
