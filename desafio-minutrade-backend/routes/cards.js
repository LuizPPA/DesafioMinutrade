var express = require('express')
var Card = require('../models/card')
var Snack = require('../models/snack')
var router = express.Router()

// Creates a card
router.post('/create', async function(req, res) {
  let card = new Card()
  // Assign generated code to the card
  card.cod = await Card.generateCod()
  // Initial credit
  card.credit()
  // Check if titular name is a valid name (only characters between A and Z, both lower and upper case, and spaces)
  if (/^[a-zA-Z\s]+$/.test(req.body.titular)) {
    card.titular = req.body.titular.toUpperCase()
  }
  else{
    res.status(406).send('Invalid name for titular')
    return
  }
  card.save(function (err, result) {
    if(err) res.status(406).send(err)
    else res.status(200).send(result)
  })
})

// Return a list with all registered cards
router.get('/list', function(req, res){
  Card.find({}, (err, result) => {
    if(err) res.status(406).send(err)
    res.status(200).send(result)
  })
})

// Find a card with specified code
router.get('/find/:cod', function(req, res){
  Card.findOne({cod: req.params.cod}, (err, result) => {
    if(err) res.status(406).send(err)
    if(result === undefined || result === null) {
      res.status(406).send('Unable to find card')
      return
    }

    // Check if the card has already been credited today
    let yesterday = new Date(Date.now())
    yesterday.setUTCHours(0, 0, 0, 0)
    let credited = new Date(result.lastCredited)

    // Credit if it hasn't
    if (credited < yesterday) {
      result.credit()
    }
    res.status(200).send(result)
  })
})

module.exports = router
