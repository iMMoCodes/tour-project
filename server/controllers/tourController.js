const Tour = require('../models/tourModel')

// GET ALL TOURS
exports.getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  })
}

// GET ONE TOUR
exports.getTour = (req, res) => {
  const id = req.params.id * 1
  // const tour = tours.find((el) => el.id === id)
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // })
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
