const { promisify } = require('util')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })

  const token = signToken(newUser._id)

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  // Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400))
  }
  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }
  // If everything is ok, send token to client
  const token = signToken(user._id)

  res.status(200).json({
    status: 'success',
    token,
  })
})

exports.protect = catchAsync(async (req, res, next) => {
  // Getting token and check if it exists
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access.', 401)
    )
  }
  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  // Check if user still exists
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    )
  }
  // Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again', 401)
    )
  }
  // Grant access to protected route
  req.user = currentUser
  next()
})
