export default class Snack {
  cod:string
  name: string
  price: number
  image: string

  constructor(cod: string, name: string, price: number, image: string){
    this.cod = cod
    this.name = name
    this.price = price
    this.image = image
  }
}
