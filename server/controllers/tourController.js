const fs = require('fs')
const path = require('path')

const reqPath = path.join(__dirname, '../../data/tour-single.json')
const tours = JSON.parse(fs.readFileSync(`${reqPath}`))

// GET ALL TOURS
exports.getAllTours = (req, res) => {
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
  exports.getTour = (req, res) => {
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
  exports.createTour = (req, res) => {
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
  exports.updateTour = (req, res) => {
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
  exports.deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({ status: 'error', message: 'Invalid ID' })
    }
    res.status(204).json({
      status: 'success',
      data: null,
    })
  }