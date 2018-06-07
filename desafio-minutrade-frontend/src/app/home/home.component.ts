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
    this.card = this.cardService.getCard()
    this.subscription = this.cardService.cardChanged.subscribe((card) => {
      this.card = card
    })
    if(!this.card){
      if(this.cookieService.check('card')) this.cardService.setCard(this.cookieService.get('card'))
      else this.router.navigate(['/'])
    }

  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
