import { Component, OnInit, OnDestroy } from '@angular/core'
import { SnackService } from '../../shared/snack.service'
import Snack from '../../snack/snack.model'

@Component({
  selector: 'app-snack-detail',
  templateUrl: './snack-detail.component.html',
  styleUrls: ['./snack-detail.component.css']
})
export class SnackDetailComponent implements OnInit, OnDestroy {
  snack: Snack
  subscription

  constructor(private snackService: SnackService){}

  ngOnInit() {
    this.subscription = this.snackService.selectedSnackChanged.subscribe((snack: Snack) => {
      this.snack = snack
    })
  }

  buy(){
    this.snackService.buy(this.snack._id)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
