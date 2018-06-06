import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { CardService } from '../shared/card.service'
import Card from './card.model'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy{
  @Input() card: Card
  subscription

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.subscription = this.cardService.cardChanged.subscribe((card: Card) => {
      this.card = card
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
