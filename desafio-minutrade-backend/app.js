var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var snacksRouter = require('./routes/snacks')
var cardsRouter = require('./routes/cards')
var mongoose = require('mongoose')

var app = express()

// Avoiding CORS issues
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Snacks router
app.use('/snacks', snacksRouter)
// Cards routes
app.use('/cards', cardsRouter)

// Setting up mongodb connection
// Connection to DB at mLab. The database credentials are exposed here because i consider it an affordable risk for this project
mongoose.connect('mongodb://client:client123@ds153380.mlab.com:53380/minutrade') // I strongly advice switching to a local database to speed up request time if possible
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Renturns the error
  res.status(err.status || 500).send('error')
})

module.exports = app
