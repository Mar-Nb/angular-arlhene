import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SessionsComponent } from './sessions/sessions.component';
import { CarteComponent } from './carte/carte.component';
import { PnjComponent } from './pnj/pnj.component';
import { GuildeComponent } from './guilde/guilde.component';
import { MythologieComponent } from './mythologie/mythologie.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    SessionsComponent,
    CarteComponent,
    PnjComponent,
    GuildeComponent,
    MythologieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
