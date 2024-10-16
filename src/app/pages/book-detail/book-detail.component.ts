import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SupabaseService} from "../../services/supabase.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormattingService} from "../../services/formatting.service";
import {Location} from "@angular/common";
import {NoteFormComponent} from "../note-form/note-form.component";
import {Book} from "../../class/book";
import {Note} from "../../class/note";
import {switchMap} from "rxjs";
import {ConfirmationModalComponent} from "../../components/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NoteFormComponent,
    ConfirmationModalComponent
  ],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: any;
  notes: Note[] = [];
  showModal: boolean = false;
  noteToDelete: number | undefined = 0 ;
  itemToDelete: { id: number | undefined, type: 'note' | 'book' } | undefined = undefined;
  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService,
              private formattingService: FormattingService, private location : Location,
              private router: Router) {}

  ngOnInit() {
    const bookId: number = Number(this.route.snapshot.paramMap.get('id'));
    // Récupération du livre
    this.supabaseService.getBookById(bookId).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du livre:', error.message);
      }
    });
    // Récupération des notes
    this.supabaseService.getNotesByBookId(bookId).subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des notes:', error.message);
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

  deleteNoteById(noteId: number | undefined): void {
    this.supabaseService.deleteNoteById(noteId).pipe(
      switchMap(() => {
        return this.supabaseService.getNotesByBookId(this.book.id);
      })
    ).subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (error) => {
        console.error('Erreur lors de la suppression ou de la récupération des notes:', error.message);
      }
    });
  }

  openDeleteModal(itemId: number | undefined, itemType: 'note' | 'book') {
    this.itemToDelete = { id: itemId, type: itemType };
    this.showModal = true;
  }


  modalConfirmation() {
    if (this.itemToDelete && this.itemToDelete.id !== 0) {
      if (this.itemToDelete.type === 'note') {
        this.deleteNoteById(this.itemToDelete.id);
      } else if (this.itemToDelete.type === 'book') {
        this.deleteBook(this.itemToDelete.id);
      }
    }
    this.showModal = false;
    this.itemToDelete = undefined;
  }

  closeDeleteModal() {
    this.showModal = false;
    this.itemToDelete = undefined;
  }

  goToNoteFormWithNoteData(note: Note, book_id: number): void {
    this.router.navigate(['/note/add', book_id], { state: { note } });
  }

  deleteBook(bookId: number | undefined): void {
    this.supabaseService.deleteBookById(bookId).subscribe({
      next: () => {
        this.goBack();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du livre:', error.message);
      }
    });
  }

  viewNote(note: Note) {
    this.router.navigate(['/note', note.id]);
  }
}
