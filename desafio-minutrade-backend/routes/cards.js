var express = require('express')
var Card = require('../models/card')
var Snack = require('../models/snack')
var router = express.Router()

router.post('/create', function(req, res) {
  let card = new Card()
  card.generateCod()
  card.credit()
  console.log(req.body)
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

router.get('/list', function(req, res){
  Card.find({}, (err, result) => {
    if(err) res.status(406).send(err)
    res.status(200).send(result)
  })
})

router.get('/find/:cod', function(req, res){
  Card.findOne({cod: req.params.cod}, (err, result) => {
    if(err) res.status(406).send(err)
    if(result === undefined || result === null) {
      res.status(406).send('Unable to find card')
      return
    }
    let today = new Date(Date.now())
    let yesterday = new Date(today.setDate(today.getUTCDate()-1))
    let credited = new Date(result.lastCredited)

    if (credited < yesterday) {
      result.credit()
    }
    res.status(200).send(result)
  })
})

module.exports = router
