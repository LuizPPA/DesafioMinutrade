import { Component, OnInit, Input } from '@angular/core'
import { SnackService } from '../shared/snack.service'
import Snack from './snack.model'

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.css']
})
export class SnackComponent implements OnInit {
  @Input() snack: Snack

  constructor(private snackService: SnackService) { }

  ngOnInit() {
  }

  buy(){
    this.snackService.buy(this.snack.cod)
  }

}
