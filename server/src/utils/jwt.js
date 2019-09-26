const jwt = require('jsonwebtoken')

const withAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token

  if (!token) {
    res.status(401).send('Unauthorized: No token provided')
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      console.log(token, secret, decoded)
      if (err) {
        res.status(401).send('Unauthorized: Invalid token')
      } else {
        req.id = decoded.id
        next()
      }
    })
  }
}

module.exports = withAuth
