import jwt from 'jsonwebtoken'

const middlewareAuth = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    req.isAuthenticated = false
    return next()
  }

  const token = authHeader.split(' ')[1]
  if (!token || token === '') {
    req.isAuthenticated = false
    return next()
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(
      token,
      'carelulu-let-me-in-sdkajhfksjh324jkh1243871'
    )
  } catch (error) {
    req.isAuthenticated = false
    return next()
  }

  if (!decodedToken) {
    req.isAuthenticated = false
    return next()
  }
  req.isAuthenticated = true
  req.userId = decodedToken.userId
  next()
}

export default middlewareAuth
