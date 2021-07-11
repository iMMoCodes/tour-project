const fs = require('fs')
const path = require('path')
const express = require('express')
const reqPath = path.join(__dirname, '../data/tour-single.json')

const app = express()

app.use(express.json())
const tours = JSON.parse(fs.readFileSync(`${reqPath}`))

// GET REQUEST FOR ALL TOURS
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
})

// GET REQUEST FOR ONE TOUR
app.get('/api/v1/tours/:id', (req, res) => {
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
})

// POST REQUEST
app.post('/api/v1/tours', (req, res) => {
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
})

// PATCH REQUEST
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'error', message: 'Invalid ID' })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'tour updated...',
    },
  })
})

// DELETE REQUEST
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'error', message: 'Invalid ID' })
  }
  res.status(204).json({
    status: 'success',
    data: null,
  })
})

const port = 5000
app.listen(port, () => {
  console.log(`App is running on port ${port}...`)
})
