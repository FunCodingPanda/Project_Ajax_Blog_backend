const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') 
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

const blogRoutes = require('./src/routes/blogs')
app.use('/blogs', blogRoutes) 

app.use((err, req, res, next) => {
  console.error(err.stack) // Log the stacktrace of any errors that happen
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

module.exports = app
