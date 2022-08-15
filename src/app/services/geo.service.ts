import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  urlApi: string;

  constructor(private http: HttpClient) { this.urlApi = "http://localhost/api-arlhene/geo.php"; }

  getGeoInfos(nom: string) { return this.http.get(this.urlApi + "?nom=" + nom.toLowerCase()); }

}
