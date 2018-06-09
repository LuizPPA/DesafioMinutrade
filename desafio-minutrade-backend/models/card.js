var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cardSchema = new Schema({
  cod: {type: String, required: true, unique: true},
  titular: {type: String, required: true, index: true},
  balance: {type: Number, default: 500, min: 0, max: 500, required: true},
  lastCredited: {type: Date, default: Date.now(), required: true}
})

cardSchema.methods.credit = function(){
  this.balance = 500
  this.lastCredited = new Date(Date.UTC())
}

cardSchema.statics.generateCod = function(){
  let possible = "ABCDEFGHIJ0123456789"
  let cod = ''
  for (var i = 0; i < 8; i++) cod += possible.charAt(Math.floor(Math.random() * possible.length))
  return cod
}

//Export model
var Card = mongoose.model('card', cardSchema)
module.exports = Card
