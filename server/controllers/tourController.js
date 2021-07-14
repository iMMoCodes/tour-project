const fs = require('fs')
const path = require('path')

const reqPath = path.join(__dirname, '../../data/tour-single.json')
const tours = JSON.parse(fs.readFileSync(`${reqPath}`))

exports.checkID = (req,res,next,val) => {
  console.log(`Tour id is: ${val}`)
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'error', message: 'Invalid ID' })
  }
  next()
}

exports.checkBody = (req,res,next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ status: 'error', message: 'Please enter name and price'})
  }
  next()
}

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