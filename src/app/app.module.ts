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
import { CultureComponent } from './culture/culture.component';

import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    SessionsComponent,
    CarteComponent,
    PnjComponent,
    GuildeComponent,
    MythologieComponent,
    CultureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
