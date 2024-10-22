import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {SupabaseService} from "../../services/supabase.service";
import {Note} from "../../class/note";
import {FormattingService} from "../../services/formatting.service";

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.css'
})
export class NoteDetailComponent implements OnInit {

  note: Note = new Note();
  constructor(private route : ActivatedRoute, private location : Location, private supabaseService : SupabaseService,
              private formattingService : FormattingService) { }

  ngOnInit(): void {
    const noteId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.supabaseService.getNoteById(noteId).subscribe({
      next: (note) => {
        this.note = note;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la note:', error.message);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  getFormattedText(noteText : string): string {
    return this.formattingService.newlineToBr(noteText);
  }
}
