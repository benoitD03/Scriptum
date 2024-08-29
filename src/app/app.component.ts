import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Starter';
constructor(private router: Router) { }

  //Méthode pour détecter si on est sur la page de connexion / inscription
  isLoginPage(): boolean {
    return this.router.url.startsWith('/login');
  }

  // Déconnexion
  // async signOut() {
  //   try {
  //     await this.supabaseService.signOut();
  //     console.log('User signed out');
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //   }
  // }
}
