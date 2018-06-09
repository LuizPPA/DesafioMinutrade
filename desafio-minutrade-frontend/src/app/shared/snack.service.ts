import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Subject } from 'rxjs'
import { CardService } from './card.service'
import Card from '../card/card.model'
import Snack from '../snack/snack.model'

@Injectable()
export class SnackService{
  snacksChanged: Subject<Snack[]> = new Subject<Snack[]>()
  snacks: Snack[] = []
  selectedSnackChanged: Subject<Snack> = new Subject<Snack>()
  selectedSnack: Snack

  constructor(private http: Http, private cardService: CardService){}

  // Creates a new snack
  createSnack(name: string, price: number, image: string){
    // Setup request to local backend running on default 3000 port
    this.http.post('http://localhost:3000/snacks/create', {name, price, image}).subscribe((response: Response) => {
      if(response.ok){
        // If reques succeeds push the new snack into the list
        let data = response.json()
        this.snacks.push(new Snack(data._id, data.name, data.price/100, data.image))
        this.snacksChanged.next(this.snacks)
      }
    })
  }

  // Get list of snacks from backend
  fetchSnacks(){
    // Setup request to local backend running on default 3000 port
    this.http.get('http://localhost:3000/snacks/list').subscribe((response: Response) => {
      if(response.ok){
        // If request succeeds updates snack list
        let data = response.json()
        this.snacks = []
        data.map((snack) => {
          this.snacks.push(new Snack(snack._id, snack.name, snack.price/100, snack.image))
        })
        this.snacksChanged.next(this.snacks)
      }
    })
  }

  // Get snack list
  getSnacks(){
    return this.snacks
  }

  // Select a snack to display details
  selectSnack(snack: Snack){
    this.selectedSnack = snack
    this.selectedSnackChanged.next(this.selectedSnack)
  }

  // Buy snack with current card
  buy(snack){
    let card = this.cardService.getCard()
    if(snack.price <= card.balance){
      this.cardService.pay(snack.price)
    }
    // Setup request to local backend running on default 3000 port
    this.http.post('http://localhost:3000/snacks/buy', {card: card.cod, snack: snack._id}).subscribe((response: Response) => {
      if(response.ok){
        // If request succeeds update card
        this.cardService.setCard(card.cod)
      }
    })
  }

}
