require("dotenv").config({ path: `${process.cwd()}/.env` })
const jwt = require("jsonwebtoken")
const {sequelize, User, Organisation, UserOrganisation} = require("../db/models")
const catchAsync = require("../utils/catchAsync");

exports.protectedRoute = catchAsync(async (request, reponse, next) => {
  // If user is already authenticated
  if (request.user?.userId) return next()

  const authHeader = request.headers.authorization
  let token
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]
  } 
  if (!token) {
    return reponse.status(401).json({
      status: 'failed',
      message: 'You are not logged in, please log in to get access',
    })
  }

  try {
    const decoded = jwt.verify(
      token,
       process.env.JWT_SECRET_KEY
    )
    const { userId } = decoded

    //verify if user still exists
    let user = await User.findByPk(userId)

    if (!user)
      return next(
        new UnAuthenticated('The user with this token no longer exists')
      )

    request.user = user
    next()
  } catch (error) {
    console.error(error.message)
    return next(error)
  }
})