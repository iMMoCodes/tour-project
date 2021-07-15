const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = require('./app')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))

// START SERVER
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`App is running on port ${port}...`)
})
