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
    // Listen to card changes
    this.subscription = this.cardService.cardChanged.subscribe((card: Card) => {
      this.card = card
    })
  }

  // Programmatically copy card code to clipboard
  copyCod(){
    let range = document.createRange()
    let selection = window.getSelection();
    let cod = document.getElementById("cod")

    selection.removeAllRanges();
    range.selectNodeContents(cod);
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();

    alert("Code copied")
  }

  // Clear subscription
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
