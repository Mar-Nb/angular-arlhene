import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PnjServiceService {

  urlApi: string;

  constructor(private http: HttpClient) { this.urlApi = "http://localhost/api-arlhene/pnj.php"; }
  
  getPage(page: string = "1") { return this.http.get(this.urlApi + (page != "1" ? `?page=${page}` : "")); }
}
