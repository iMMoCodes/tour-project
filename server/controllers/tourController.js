const Tour = require('../models/tourModel')

// GET ALL TOURS
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

// GET ONE TOUR
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

// CREATE TOUR
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    })
  }
}

// UPDATE TOUR
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'tour updated...',
    },
  })
}

// DELETE TOUR
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  })
}
