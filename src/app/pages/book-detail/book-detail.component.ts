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
  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService,
              private formattingService: FormattingService, private location : Location,
              private router: Router) {}

  ngOnInit() {
    const bookId: number = Number(this.route.snapshot.paramMap.get('id'));
    // Récupération du livre
    this.supabaseService.getBookById(bookId).subscribe({
      next: (book) => {
        // console.log('Livre récupéré:', book);
        this.book = book;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du livre:', error.message);
      }
    });
    // Récupération des notes
    this.supabaseService.getNotesByBookId(bookId).subscribe({
      next: (notes) => {
        // console.log('Notes récupérées:', notes);
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
        console.log('Note supprimée');
        return this.supabaseService.getNotesByBookId(this.book.id);
      })
    ).subscribe({
      next: (notes) => {
        // console.log('Notes récupérées:', notes);
        this.notes = notes;
      },
      error: (error) => {
        console.error('Erreur lors de la suppression ou de la récupération des notes:', error.message);
      }
    });
  }

  openModal(noteId: number| undefined) {
    this.noteToDelete = noteId;
    this.showModal = true;
  }

  /**
   * Méthode qui se déclenche lors de la confirmation de la suppression d'une note
   * @param noteId
   */
  modalConfirmation(noteId: number | undefined) {
    if(this.noteToDelete !== 0) {
      this.deleteNoteById(noteId);
    }
    this.showModal = false;
    this.noteToDelete = 0;
  }

  closeModal() {
    this.showModal = false;
    this.noteToDelete = 0;
  }

  goToNoteFormWithNoteData(note: Note, book_id: number): void {
    this.router.navigate(['/note/add', book_id], { state: { note } });
  }
}
