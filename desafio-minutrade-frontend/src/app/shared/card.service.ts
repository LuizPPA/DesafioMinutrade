import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Subject } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import Card from '../card/card.model'

@Injectable()
export class CardService{
  cardChanged: Subject<Card> = new Subject<Card>()
  card: Card

  constructor(private http: Http, private cookieService: CookieService){}

  createCard(titular: string){
    this.http.post('http://localhost:3000/cards/create', {titular}).subscribe((response: Response) => {
      if(response.ok){
        let data = response.json()
        this.card = new Card(data.cod, data.titular, data.balance, data.lastCredited)
        this.cookieService.set('card', this.card.cod)
        this.cardChanged.next(this.card)
      }
    })
  }

  setCard(cod: string){
    this.http.get('http://localhost:3000/cards/find/'+cod).subscribe((response: Response) => {
      if(response.ok){
        let data = response.json()
        this.card = new Card(data.cod, data.titular, data.balance, data.lastCredited)
        this.cookieService.set('card', this.card.cod)
        this.cardChanged.next(this.card)
      }
    })
  }

  getCard(){
    return this.card
  }

}
