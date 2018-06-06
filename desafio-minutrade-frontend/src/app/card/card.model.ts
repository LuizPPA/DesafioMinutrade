export default class Card {
  cod:string
  titular: string
  balance: number
  lastCredited: Date

  constructor(cod: string, titular: string, balance: number, lastCredited: Date){
    this.cod = cod
    this.titular = titular
    this.balance = balance
    this.lastCredited = lastCredited
  }
}
