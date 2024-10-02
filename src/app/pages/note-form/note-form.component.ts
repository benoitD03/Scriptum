import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
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
  constructor(private route : ActivatedRoute, private location: Location, private supabaseService: SupabaseService) { }

  ngOnInit() {
    this.book_id = Number(this.route.snapshot.paramMap.get('book_id'));
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
        console.log('Note créée:', note);
        this.goBack()
      },
      error: (error) => {
        console.error('Erreur lors de la création de la note:', error.message);
      }
    });
  }
}
