import { Injectable } from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class FormattingService {

  constructor() {
  }

  /**
   * Méthode pour formater une date en format dd/MM/yyyy
   * @param timestamp
   */
  formatToFrenchDate(timestamp: string): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(timestamp, 'dd/MM/yyyy') ?? '';
  }
}