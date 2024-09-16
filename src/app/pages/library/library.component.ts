import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgStyle,
    FormsModule
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {
  books: any[] = [];
  errorMessage: string | null = null;
  searchTerm: any;


  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    //Récupération des livres de l'utilisateur connecté
    this.getAllUserBooks()
  }

  /**
   * Méthode pour récupérer tous les livres de l'utilisateur connecté
   */
  getAllUserBooks() {
    this.supabaseService.getCurrentUser().subscribe(user => {
      const userId = user?.data.user?.id;
      if (userId) {
        this.supabaseService.getUserBooks(userId).subscribe(
          {
            next: (books) => {
              this.books = books;
              console.log(this.books);
            },
            error: (error) => {
              this.errorMessage = 'Erreur lors de la récupération des livres';
              console.error('Erreur lors de la récupération des livres:', error.message);
            }
          }
        );
      } else {
        this.errorMessage = 'Utilisateur non connecté';
      }
    });
  }

  searchBooksByTitle(searchTerm: any) {
    if (!searchTerm) {
      // Si le champ de recherche est vide, on réinitialise la liste des livres
      this.getAllUserBooks()
    } else {
      // Si le champ de recherche n'est pas vu, on filtre
      this.books = this.books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}


