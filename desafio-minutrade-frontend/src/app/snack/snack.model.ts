export default class Snack {
  _id: string
  name: string
  price: number
  image: string

  constructor(_id: string, name: string, price: number, image: string){
    this._id = _id
    this.name = name
    this.price = price
    this.image = image
  }
}
