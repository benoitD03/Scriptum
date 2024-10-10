import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SupabaseService} from "../../services/supabase.service";
import {Note} from "../../class/note";

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent implements OnInit {
  book_id: number = 0;
  note: Note = new Note();
  state: any;
  constructor(private router: Router, private route : ActivatedRoute, private location: Location, private supabaseService: SupabaseService) { }

  ngOnInit() {
    this.book_id = Number(this.route.snapshot.paramMap.get('book_id'));
    this.state = history.state;
    if (this.state && this.state.note) {
      const note = this.state.note as Note;
      this.note.chapter = note.chapter;
      this.note.text = note.text;
    }
  }

  goBack(): void {
    this.location.back();
  }

  /**
   * Création d'une note
   */
  createNote() {
    const newNote: Note = {
      text: this.note.text,
      chapter: this.note.chapter
    };
    this.supabaseService.createNote(newNote, this.book_id).subscribe({
      next: (note) => {
        this.goBack()
      },
      error: (error) => {
        console.error('Erreur lors de la création de la note:', error.message);
      }
    });
  }

  updateNote() {
    const updatedNote: Note = {
      text: this.note.text,
      chapter: this.note.chapter
    };
    this.supabaseService.updateNoteById(this.state.note.id, updatedNote).subscribe({
      next: (note) => {
        this.goBack();
      },
      error: (error) => {
        console.error('Erreur lors de la modification de la note:', error.message);
      }
    });
  }
}
