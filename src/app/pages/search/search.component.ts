import { Component } from '@angular/core';
import {GoogleBooksApiService} from "../../services/google-books-api.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  books: any[] = [];
  searchQuery: string = "";

  constructor(private bookService: GoogleBooksApiService) {
  }

  searchBooks(query: string) {
    this.bookService.searchBooksByTitle(query).subscribe((data: any) => {
      this.books = data.items;
      console.log(this.books);
    });
  }
}

