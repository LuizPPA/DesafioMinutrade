var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cardSchema = new Schema({
  cod: String,
  titular: String,
  balance: Number,
  lastCredited: Date
})

cardSchema.methods.credit = function(){
  this.balance = 5.0
  this.lastCredited = new Date
}

cardSchema.methods.generateCod = function(){
  var possible = "ABC0123456789";
  var cod = ''

  for (var i = 0; i < 8; i++)
    cod += possible.charAt(Math.floor(Math.random() * possible.length));

  this.cod = cod
}

//Export model
let Card = mongoose.model('card', cardSchema)
module.exports = Card
