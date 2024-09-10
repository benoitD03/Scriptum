import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

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

  /**
   * Méthode pour fermer le modal
   */
  closeModal() {
    this.book = null;
  }
}
