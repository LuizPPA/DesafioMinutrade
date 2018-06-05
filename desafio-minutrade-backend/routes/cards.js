var express = require('express')
var Card = require('../models/card')
var Snack = require('../models/snack')
var router = express.Router()

router.post('/create', function(req, res) {
  let card = new Card()
  card.generateCod()
  card.credit()
  card.save(function (err, result) {
    if(err) res.status(406).send(err)
    res.status(200).send(result)
  })
})

router.get('/list', function(req, res){
  Card.find({}, (err, result) => {
    if(err) res.status(406).send(err)
    res.status(200).send(result)
  })
})


module.exports = router
