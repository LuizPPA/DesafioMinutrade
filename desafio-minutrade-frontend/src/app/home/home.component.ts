import { Component, OnInit } from '@angular/core'
import { CardService } from '../shared/card.service'
import Card from '../card/card.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  card: Card

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.card = this.cardService.getCard()
  }

}
