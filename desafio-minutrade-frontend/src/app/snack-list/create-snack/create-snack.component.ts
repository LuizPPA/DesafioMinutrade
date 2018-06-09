import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { SnackService } from '../../shared/snack.service'
import Snack from '../../snack/snack.model'

@Component({
  selector: 'app-create-snack',
  templateUrl: './create-snack.component.html',
  styleUrls: ['./create-snack.component.css']
})
export class CreateSnackComponent implements OnInit {

  snackForm: FormGroup

  constructor(private snackService: SnackService) { }

  ngOnInit() {
    // Setup creation reactive form
    this.snackForm = new FormGroup({
      'name': new FormControl(null),
      'price': new FormControl(null),
      'image': new FormControl(null)
    })
  }

  onSubmit(){
    // On submit, creates snack and clear form
    this.snackService.createSnack(this.snackForm.get('name').value, this.snackForm.get('price').value, this.snackForm.get('image').value)
    this.snackForm.reset()
  }

}
