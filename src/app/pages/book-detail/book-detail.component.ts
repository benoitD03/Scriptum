import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SupabaseService} from "../../services/supabase.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormattingService} from "../../services/formatting.service";

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: any;
  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService, private formattingService: FormattingService) {}

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

  getFormattedDate(timestamp: string): string {
    return this.formattingService.formatToFrenchDate(timestamp);
  }

}
