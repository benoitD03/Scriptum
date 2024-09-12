import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {
  books: any[] = [];
  errorMessage: string | null = null;


  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    //Récupération des livres de l'utilisateur connecté
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
}


