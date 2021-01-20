module.exports = function(req, res, next) {
  const currentUser = req.user
  if (currentUser) next()
  else {
    const error = new Error('Access Denied')
    error.status = 401
    next(error)
  }
}
// index for all middle ware routes for different types of
// auth (3)

// are you admin
// req.get (
// return object of names with authorized users who are admin
//)

// auth for user to access cart with their user id

//
