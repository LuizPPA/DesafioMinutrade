var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cardSchema = new Schema({
  cod: {type: String, required: true, unique: true}, // Card prettier identifier
  titular: {type: String, required: true, index: true}, // Card's owner name
  balance: {type: Number, default: 500, min: 0, max: 500, required: true}, // Total balance in cents
  lastCredited: {type: Date, default: Date.now(), required: true} // Last time it has recieved it's daily recharge
})

// Recharge card to the daily credit
cardSchema.methods.credit = function(){
  this.balance = 500
  const UTC = new Date().toLocaleString()
  let now = new Date(UTC+' UTC')
  this.lastCredited = now
}

// Genertae an unique code to be assigned to a card
cardSchema.statics.generateCod = async function(){
  let possible = "ABCDEFGHIJ0123456789"
  let cod = ''
  let unique = false

  while (!unique) {
    for (var i = 0; i < 8; i++) cod += possible.charAt(Math.floor(Math.random() * possible.length))
    let dup = await Card.findOne({cod: cod})
    if(dup) cod = ''
    else unique = true
  }
  return cod
}

//Export model
var Card = mongoose.model('card', cardSchema)
module.exports = Card
