import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SupabaseService} from "../../services/supabase.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormattingService} from "../../services/formatting.service";
import {Location} from "@angular/common";
import {NoteFormComponent} from "../note-form/note-form.component";

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NoteFormComponent
  ],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: any;
  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService,
              private formattingService: FormattingService, private location : Location,
              private router: Router) {}

  ngOnInit() {
    const bookId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.supabaseService.getBookById(bookId).subscribe({
      next: (book) => {
        console.log('Livre récupéré:', book);
        this.book = book;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du livre:', error.message);
      }
    });
  }

  /**
   * Méthode pour formater la date au format dd/MM/yyyy
   * @param timestamp
   */
  getFormattedDate(timestamp: string): string {
    return this.formattingService.formatToFrenchDate(timestamp);
  }

  goBack(): void {
    this.location.back();
  }

  goToNoteForm(book_id: number): void {
      this.router.navigate(['/note/add', book_id]);
  }

}