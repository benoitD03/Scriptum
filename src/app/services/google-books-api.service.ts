import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient}  from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksApiService {

  constructor(public http: HttpClient) { }

  // Méthode pour rechercher des livres selon un titre
  searchBooksByTitle(query: string): Observable<any> {
    const url = `${environment.googleBooksApiUrl}/volumes?q=${query}&key=${environment.googleBooksApiKey}`;
    return this.http.get<any>(url);
  }
}
