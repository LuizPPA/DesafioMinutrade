import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { CardService } from '../shared/card.service'
import Card from '../card/card.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  card: Card
  subscription

  constructor(private cardService: CardService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    // Setup a card for home
    this.card = this.cardService.getCard()
    // Listen to card changes
    this.subscription = this.cardService.cardChanged.subscribe((card) => {
      this.card = card
    })
    // If card is not set
    if(!this.card){
      // Fetches it from db in case a cookie is set
      if(this.cookieService.check('card')) this.cardService.setCard(this.cookieService.get('card'))
      // Or navigates back to initial page
      else this.router.navigate(['/'])
    }

  }

  // Clear subscriptions
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
