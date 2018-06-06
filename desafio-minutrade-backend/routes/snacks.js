var express = require('express')
var Card = require('../models/card')
var Snack = require('../models/snack')
var router = express.Router()

router.post('/create', function(req, res) {
  let snack = new Snack()
  snack.generateCod()
  snack.name = req.body.name || 'Default snack'
  snack.price = req.body.price || 1.80
  snack.save(function (err, result) {
    if(err) res.status(406).send(err)
    res.status(200).send(result)
  });
})

router.post('/buy', function(req, res) {
  let snack
  let card

  Snack.findOne({cod: req.body.snack}, function(err, result) {
    if(err) res.status(406).send(err)
    snack = result
    Card.findOne({cod: req.body.card}, function(err, result) {
      if(err) {
        res.status(406).send(err)
        return
      }
      card = result

      if(card === undefined || card === null) {
        res.status(406).send('Unable to find card')
        return
      }
      if(snack === undefined || snack === null){
        res.status(406).send('Unable to find snack')
        return
      }

      let today = new Date(Date.now())
      let yesterday = new Date(today.setDate(today.getUTCDate()-1))
      let credited = new Date(card.lastCredited)

      if (credited < yesterday) {
        card.credit()
      }
      if(card.balance < snack.price){
        res.status(406).send('Insufficient funds')
        return
      }
      card.balance -= snack.price
      card.save(function (err, result) {
        if(err) res.status(406).send(err)
        res.status(200).send(result)
      })
    })
  })
})

router.get('/list', function(req, res){
  Snack.find({}, (err, result) => {
    if(err){
      res.status(406).send(err)
    }
    res.status(200).send(result)
  })
})


module.exports = router
