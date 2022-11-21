import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CultureService {

  urlApi: string;

	constructor(private http: HttpClient) { this.urlApi = "http://localhost/api-arlhene/culture.php"; }

  getMenu() { return this.http.get(this.urlApi + "?menu=true"); }

  getContenu() { return this.http.get(this.urlApi); }

}
