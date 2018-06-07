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
    this.subscription = this.cardService.cardChanged.subscribe((card: Card) => {
      this.card = card
      this.router.navigate(['/home'])
    })
    if(this.cookieService.check('card')){
      this.cod = this.cookieService.get('card')
      this.setCard()
    }
  }

  requestCard(name: string){
    if(name.length > 0) this.cardService.createCard(name)
    else alert('Por favor, insira o nome do titular')
  }

  setCard(){
    this.cardService.setCard(this.cod)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
