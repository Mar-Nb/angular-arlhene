import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { SessionsComponent } from './sessions/sessions.component';
import { CarteComponent } from './carte/carte.component';
import { PnjComponent } from './pnj/pnj.component';
import { GuildeComponent } from './guilde/guilde.component';
import { MythologieComponent } from './mythologie/mythologie.component';
import { CultureComponent } from './culture/culture.component';

const routes: Routes = [
	{ path: "accueil", component: AccueilComponent },
	{ path: "", redirectTo: "/accueil", pathMatch: "full" },
	{ path: "sessions", component: SessionsComponent },
	{ path: "carte", component: CarteComponent },
	{ path: "pnj", component: PnjComponent },
	{ path: "guilde", component: GuildeComponent },
	{ path: "culture", component: CultureComponent },
	{ path: "**", component: AccueilComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
