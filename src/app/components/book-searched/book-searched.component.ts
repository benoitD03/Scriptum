import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {Book} from "../../class/book";
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-book-searched',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './book-searched.component.html',
  styleUrl: './book-searched.component.css'
})
export class BookSearchedComponent {
  @Input() book: any;
  displayToast: boolean = false;

  constructor(private supabaseService: SupabaseService) {
  }

  /**
   * Méthode pour fermer le modal
   */
  closeModal() {
    this.book = null;
  }

  /**
   * Méthode pour ajouter un livre à la bibliothèque
   * La partie user est gérée dans le service SupabaseService
   */
  async createBook() {
    const newBook: Book = {
      title: this.book.volumeInfo.title,
      author: this.book.volumeInfo.authors[0],
      image: this.book.volumeInfo.imageLinks.thumbnail,
      description: this.book.volumeInfo.description,
      finished: false,
      category: this.book.volumeInfo.categories[0]
    };
    this.supabaseService.createBook(newBook).subscribe(
      {
        next: () => {
          this.displayToast = true;
          this.closeModal();
        },
        error: (error) => {
          console.error('Erreur lors de la création du livre:', error.message);
        }
      }
    )
  }

  /**
   * Méthode pour fermer la confirmation
   */
  closeToast() {
    this.displayToast = false;
  }
}
