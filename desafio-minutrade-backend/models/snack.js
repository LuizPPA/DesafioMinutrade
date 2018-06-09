var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var snackSchema = new Schema({
  price: {type: Number, default: 180, min: 1, max: 500, required: true}, // Snack price in cents
  name: {type: String, required: true}, // Snack name
  image: {type: String, default: "http://whatsyourdeal.com/grocery-coupons/wp-content/uploads/2016/07/Snack-Clip-Art.png", required: true} // Image URL
})

// Check image basic requisites
snackSchema.methods.validateImage = function(image) {
  // Check if the image is not an empty string
  if(image.length == 0) return false

  let pattern = new RegExp(
    '^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i' // fragment locater
  )

  // Execute regex query
  if(!pattern.test(image)) return false
  // Verify if URL resolves to a PNG file, then, and only then, returns true
  if(image.endsWith('.png')) return true
  return false
}

//Export model
let Snack = mongoose.model('snack', snackSchema)
module.exports = Snack
