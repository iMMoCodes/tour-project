const fs = require('fs')
const path = require('path')
const express = require('express')
const reqPath = path.join(__dirname, '../data/tour-single.json')

const app = express()

app.use(express.json())
const tours = JSON.parse(fs.readFileSync(`${reqPath}`))

// GET REQUEST
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
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

const port = 5000
app.listen(port, () => {
  console.log(`App is running on port ${port}...`)
})
