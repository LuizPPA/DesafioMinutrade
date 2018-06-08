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

  createSnack(name: string, price: number, image: string){
    this.http.post('http://localhost:3000/snacks/create', {name, price, image}).subscribe((response: Response) => {
      if(response.ok){
        let data = response.json()
        this.snacks.push(new Snack(data.cod, data.name, data.price/100, data.image))
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
          this.snacks.push(new Snack(snack.cod, snack.name, snack.price/100, snack.image))
        })
        this.snacksChanged.next(this.snacks)
      }
    })
  }

  getSnacks(){
    return this.snacks
  }

  selectSnack(snack: Snack){
    this.selectedSnack = snack
    this.selectedSnackChanged.next(this.selectedSnack)
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
