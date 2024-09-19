import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {NgForOf} from "@angular/common";
import {GoogleBooksApiService} from "../../services/google-books-api.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  books: any[] = [];
  lastBooksCategories: any[] = [];
  suggestedBooks: any[] = [];
  totalBooks: number = 0;
  errorMessage: string | null = null;
  constructor(private supabaseService: SupabaseService, private googleBooksApiService : GoogleBooksApiService) { }

  ngOnInit(): void {
    //Récupération des livres de l'utilisateur connecté
    this.supabaseService.getCurrentUser().subscribe(user => {
      const userId = user?.data.user?.id;

      if (userId) {
        this.supabaseService.getUserBooks(userId).subscribe(
          {
            next: (books) => {
              this.books = books;
              this.totalBooks = this.books.length;
              this.lastBooksCategories = this.books.slice(-5).map(book => book.category); //On récupère les catégories des 5 derniers livres ajoutés
              const randomIndex = Math.floor(Math.random() * this.lastBooksCategories.length);
              const randomCategory = this.lastBooksCategories[randomIndex]; //On choisit une catégorie aléatoirement pour la recherche suivante
              this.getSuggestedBooks(randomCategory);
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

  /**
   * Méthode permettant de récupérer 5 livres suggérés en fonction d'une catégorie aléatoire
   * @param randomCategory
   */
  getSuggestedBooks(randomCategory: string) {
    this.googleBooksApiService.searchBooksByCategory(randomCategory).subscribe(
      {
        next: (books) => {
          this.suggestedBooks = books.items.slice(0, 5); //On ne garde que les 5 premiers résultats
          //On retire les livres déjà présents dans la bibliothèque
          this.suggestedBooks = this.suggestedBooks.filter(suggestedBook => !this.books.some(book => book.title === suggestedBook.volumeInfo.title));
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la récupération des livres';
          console.error('Erreur lors de la récupération des livres:', error.message);
        }
      }
    );
  }

}
