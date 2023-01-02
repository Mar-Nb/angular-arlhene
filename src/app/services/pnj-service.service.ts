import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PnjServiceService {

  urlApi: string;

  constructor(private http: HttpClient) { this.urlApi = "http://localhost/api-arlhene/pnj.php"; }
  
  getAll() { return this.http.get(this.urlApi); }
}
