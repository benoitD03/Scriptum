import {Component, OnInit} from '@angular/core';
import { CommonModule} from "@angular/common";
import {GoogleBooksApiService} from "../../services/google-books-api.service";
import {FormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  suggestions: any[] = [];
  searchQuery: string = "";

  private searchSubject = new Subject<string>();
  constructor(private bookService: GoogleBooksApiService) {
  }

  ngOnInit() {

    //On recherche des livres selon un titre avec un délai de 300ms pendant que l'utilisateur tape
    this.searchSubject.pipe(
      debounceTime(300),  // On attend 300ms après la dernière frappe
      distinctUntilChanged(),  // On ne fais la requête que si le texte a changé
      switchMap(query => this.bookService.searchBooksByTitle(query))  //  Lorsque l'utilisateur tape une nouvelle requête, switchMap() fait en sorte que la requête précédente (si elle est en cours) soit annulée et remplacée par la nouvelle
    ).subscribe((data: any) => {
      this.suggestions = data.items || [];
    });
  }

  /**
   * Méthode qui se déclenche à chaque fois que le contenu de la recherche change
   */
  onSearchChange(query: string) {
    if (query.length >= 3) {
      this.searchSubject.next(query);  // On déclenche la recherche si au moins 3 lettres
    } else {
      this.suggestions = [];  // On vide les suggestions si moins de 3 lettres
    }
  }

  /**
   * Méthode qui se déclenche lorsque l'utilisateur sélectionne un livre
   */
  selectBook(book: any) {
    console.log(book.volumeInfo.title);
  }
}

