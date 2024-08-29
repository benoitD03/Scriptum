import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  //Méthode pour détecter si on est sur mobile
  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

}
