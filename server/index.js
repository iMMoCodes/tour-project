const fs = require('fs')
const path = require('path')
const express = require('express')
const reqPath = path.join(__dirname, '../data/tour-single.json')

const app = express()
const tours = JSON.parse(fs.readFileSync(`${reqPath}`))

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
})

const port = 5000
app.listen(port, () => {
  console.log(`App is running on port ${port}...`)
})
