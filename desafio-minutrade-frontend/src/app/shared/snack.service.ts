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

  constructor(private http: Http, private cardService: CardService){}

  createSnack(name: string, price: number){
    this.http.post('http://localhost:3000/snacks/create', {name, price}).subscribe((response: Response) => {
      if(response.ok){
        let data = response.json()
        this.snacks.push(new Snack(data.cod, data.name, data.price))
        this.snacksChanged.next(this.snacks)
      }
    })
  }

  fetchSnacks(){
    this.http.get('http://localhost:3000/snacks/list').subscribe((response: Response) => {
      if(response.ok){
        let data = response.json()
        this.snacks = []
        data.map((snack) => {
          this.snacks.push(new Snack(snack.cod, snack.name, snack.price))
        })
        this.snacksChanged.next(this.snacks)
      }
    })
  }

  getSnacks(){
    return this.snacks
  }

  buy(snack: string){
    let card = this.cardService.getCard().cod
    this.http.post('http://localhost:3000/snacks/buy', {card, snack}).subscribe((response: Response) => {
      if(response.ok){
        this.cardService.setCard(card)
      }
    })
  }

}
