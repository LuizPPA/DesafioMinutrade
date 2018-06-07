var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var snackSchema = new Schema({
  cod: String,
  price: Number,
  name: String,
  image: String
})

snackSchema.methods.generateCod = function(){
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var cod = ''
  for(var i = 0; i < 5; i++)
    cod += possible.charAt(Math.floor(Math.random() * possible.length));
  this.cod = cod
}

snackSchema.methods.validateImage = function(image) {
  if(image.length == 0) return false

  // Regex query
  let pattern = new RegExp(
    '^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i' // fragment locater
  )

  if(!pattern.test(image)) return false
  if(image.endsWith('.png')) return true
  return false
}

//Export model
let Snack = mongoose.model('snack', snackSchema)
module.exports = Snack
