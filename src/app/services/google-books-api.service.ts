import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient}  from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksApiService {

  constructor(public http: HttpClient) {
  }

  /**
   * Méthode pour rechercher des livres par titre
   * @param query
   */
  searchBooksByTitle(query: string): Observable<any> {
    const url = `${environment.googleBooksApiUrl}/volumes?q=${query}&orderBy=relevance&key=${environment.googleBooksApiKey}`;
    return this.http.get<any>(url);
  }

  /**
   * Méthode pour rechercher des livres par catégorie
   * @param category
   */
  searchBooksByCategory(category: string): Observable<any> {
    const url = `${environment.googleBooksApiUrl}/volumes?q=subject:${category}&orderBy=relevance&key=${environment.googleBooksApiKey}`;
    return this.http.get<any>(url);
  }
}
