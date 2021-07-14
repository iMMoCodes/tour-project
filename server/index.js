const fs = require('fs')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const reqPath = path.join(__dirname, '../data/tour-single.json')

const app = express()

// MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) => {
  console.log('hello from middleware')
  next()
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

const tours = JSON.parse(fs.readFileSync(`${reqPath}`))

// ROUTE HANDLERS
// GET ALL TOURS
const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  })
}

// GET ONE TOUR
const getTour = (req, res) => {
  const id = req.params.id * 1

  if (id > tours.length) {
    return res.status(404).json({ status: 'error', message: 'Invalid ID' })
  }
  const tour = tours.find((el) => el.id === id)
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
}

// CREATE TOUR
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)

  fs.writeFile(reqPath, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    })
  })
}

// UPDATE TOUR
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'error', message: 'Invalid ID' })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'tour updated...',
    },
  })
}

// DELETE TOUR
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'error', message: 'Invalid ID' })
  }
  res.status(204).json({
    status: 'success',
    data: null,
  })
}

// GET ALL USERS
const getAllUsers = (req,res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.'
  })
}

// GET USER
const getUser = (req,res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.'
  })
}

// CREATE USER
const createUser = (req,res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.'
  })
}

// UPDATE USER
const updateUser = (req,res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.'
  })
}

// DELETE USER
const deleteUser = (req,res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.'
  })
}

// ROUTES
const tourRouter = express.Router()
const userRouter = express.Router()

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

tourRouter.route('/').get(getAllTours).post(createTour)
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)
userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

// START SERVER
const port = 5000
app.listen(port, () => {
  console.log(`App is running on port ${port}...`)
})
