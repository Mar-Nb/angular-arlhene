import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

	urlApi: string;

	constructor(private http: HttpClient) { this.urlApi = "http://localhost/api-arlhene/sessions.php"; }
	
	getJoueurs() { return this.http.get(this.urlApi + "?choix=true"); }
	
	getSessions(joueur: string) { return this.http.get(this.urlApi + "?nom=" + joueur); }
}
