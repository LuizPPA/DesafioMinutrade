import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { CardComponent } from './card/card.component'

import { CardService } from './shared/card.service'
import { SnackService } from './shared/snack.service'
import { CookieService } from 'ngx-cookie-service'
import { SelectCardComponent } from './select-card/select-card.component'
import { HomeComponent } from './home/home.component'
import { NavComponent } from './home/nav/nav.component'
import { SnackComponent } from './snack/snack.component'
import { SnackListComponent } from './snack-list/snack-list.component'
import { CreateSnackComponent } from './snack-list/create-snack/create-snack.component';
import { SnackDetailComponent } from './home/snack-detail/snack-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SelectCardComponent,
    HomeComponent,
    NavComponent,
    SnackComponent,
    SnackListComponent,
    CreateSnackComponent,
    SnackDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [CardService, SnackService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
