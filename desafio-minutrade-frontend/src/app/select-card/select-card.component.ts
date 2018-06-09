import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { CardService } from '../shared/card.service'
import Card from '../card/card.model'

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.css']
})
export class SelectCardComponent implements OnInit, OnDestroy {
  cod: string = ''
  name: string = ''
  card: Card
  subscription

  constructor(private cardService: CardService, private cookieService: CookieService, private router: Router){}

  ngOnInit() {
    // Listen to card changes and navigates to home when a card is set
    this.subscription = this.cardService.cardChanged.subscribe((card: Card) => {
      this.card = card
      this.router.navigate(['/home'])
    })
    // Or if a cookie is set, navigates home immediately by automatically seting card
    if(this.cookieService.check('card')){
      this.cod = this.cookieService.get('card')
      this.setCard()
    }
  }

  // Request for a new card creation
  requestCard(name: string){
    if(name.length > 0) this.cardService.createCard(name)
    else alert('Por favor, insira o nome do titular')
  }

  // Set current card
  setCard(){
    this.cardService.setCard(this.cod)
  }

  // Clear subscription
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
