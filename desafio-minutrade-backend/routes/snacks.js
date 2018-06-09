var express = require('express')
var Card = require('../models/card')
var Snack = require('../models/snack')
var router = express.Router()

// Creates a snack
router.post('/create', function(req, res) {
  let snack = new Snack()
  let image = req.body.image || ''
  let price = req.body.price || 1.80
  // Convert price to cents
  price *= 100
  // Validates the recieved image
  if (!snack.validateImage(image)) {
    res.status(406).send('Please select a valid png image')
    return
  }
  // Validates price boundaries
  if(price > 500 || price < 1){
    res.status(406).send('Every snack must cost between R$5.00 and R$0.01')
    return
  }
  snack.name = req.body.name || 'Default snack'
  snack.price = Math.floor(price)
  snack.image = image
  snack.save(function (err, result) {
    if(err) res.status(406).send(err)
    else res.status(200).send(result)
  })
})

// Buy snack
router.post('/buy', function(req, res) {
  let snack
  let card

  // Find snack
  Snack.findOne({_id: req.body.snack}, function(err, result) {
    if(err) {
      res.status(406).send(err)
      return
    }
    snack = result
    // Find card
    Card.findOne({cod: req.body.card}, function(err, result) {
      if(err) {
        res.status(406).send(err)
        return
      }
      card = result

      // Checks if both were correctly found
      if(card === undefined || card === null) {
        res.status(406).send('Unable to find card')
        return
      }
      if(snack === undefined || snack === null){
        res.status(406).send('Unable to find snack')
        return
      }
      // Check if the card has already been credited today
      const UTC = new Date().toLocaleString()
      let today = new Date(UTC+' UTC')
      today.setUTCHours(0, 0, 0, 0)
      let credited = new Date(result.lastCredited)
      // Credit if it hasn't
      if (credited < today) {
        result.credit()
      }
      // Checks if card has funds
      if(card.balance < snack.price){
        res.status(406).send('Insufficient funds')
        return
      }
      // Subtract price from balance
      card.balance -= snack.price
      card.save(function (err, result) {
        if(err) res.status(406).send(err)
        res.status(200).send(result)
      })
    })
  })
})

// Returns a list of registered snacks
router.get('/list', function(req, res){
  Snack.find({}, (err, result) => {
    if(err){
      res.status(406).send(err)
    }
    res.status(200).send(result)
  })
})


module.exports = router
