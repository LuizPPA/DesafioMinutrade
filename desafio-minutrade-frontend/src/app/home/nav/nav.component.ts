import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router){}

  ngOnInit() {
  }

  // Delete cookie and navigates back
  back(){
    this.cookieService.delete('card')
    this.router.navigate(['/'])
  }

}
