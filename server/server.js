const dotenv = require('dotenv').config()
const app = require('./app')

// START SERVER
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`App is running on port ${port}...`)
})