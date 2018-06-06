import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { SelectCardComponent } from './select-card/select-card.component'

const routes: Routes = [
    {path: '', component: SelectCardComponent, pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: '**', redirectTo: ''}
  ]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{

}
