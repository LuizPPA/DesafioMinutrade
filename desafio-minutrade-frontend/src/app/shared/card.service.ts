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

  // Create a card for a specified titular
  createCard(titular: string){
    // Setup request to local backend running on default 3000 port
    this.http.post('http://localhost:3000/cards/create', {titular}).subscribe((response: Response) => {
      if(response.ok){
        // If resquest succeeds, set new card
        let data = response.json()
        this.card = new Card(data.cod, data.titular, data.balance/100, data.lastCredited)
        this.cookieService.set('card', this.card.cod)
        this.cardChanged.next(this.card)
      }
    })
  }

  // Fecth a specific card from database and sets it
  setCard(cod: string){
    // Setup request to local backend running on default 3000 port
    this.http.get('http://localhost:3000/cards/find/'+cod).subscribe((response: Response) => {
      if(response.ok){
        // If resquest succeeds, set retrieved card
        let data = response.json()
        this.card = new Card(data.cod, data.titular, data.balance/100, data.lastCredited)
        this.cookieService.set('card', this.card.cod)
        this.cardChanged.next(this.card)
      }
    })
  }

  // Returns current card
  getCard(){
    return this.card
  }

}
