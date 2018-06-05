var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var snacksRouter = require('./routes/snacks')
var cardsRouter = require('./routes/cards')
var mongoose = require('mongoose')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/snacks', snacksRouter)
app.use('/cards', cardsRouter)

mongoose.connect('mongodb://127.0.0.1:27017/minutrade')
mongoose.Promise = global.Promise;
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500).send('error')
})

module.exports = app
