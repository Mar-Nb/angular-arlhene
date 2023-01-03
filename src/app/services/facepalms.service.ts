import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacepalmsService {

  urlApi: string;

	constructor(private http: HttpClient) { this.urlApi = "http://localhost/api-arlhene/facepalms.php"; }

  getAll() { return this.http.get(this.urlApi); }
}
