import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
  constructor(private route : ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.book_id = Number(this.route.snapshot.paramMap.get('book_id'));
    console.log(this.book_id);
  }

  goBack(): void {
    this.location.back();
  }
}
