import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GuildeService {

	urlApi: string;

	constructor(private http: HttpClient) { this.urlApi = "http://localhost/api-arlhene/guilde.php"; }
  
	getMembres() { return this.http.get(this.urlApi + "?membre=true"); }
}
