var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var snackSchema = new Schema({
  cod: String,
  price: Number,
  name: String
})

snackSchema.methods.generateCod = function(){
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var cod = ''

  for (var i = 0; i < 5; i++)
    cod += possible.charAt(Math.floor(Math.random() * possible.length));

  this.cod = cod
}

//Export model
let Snack = mongoose.model('snack', snackSchema)
module.exports = Snack
