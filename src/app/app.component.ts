import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {NgIf} from "@angular/common";
import {SupabaseService} from "./services/supabase.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, NgIf, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Starter';
constructor(private router: Router, private supabaseService : SupabaseService) { }

  //Méthode pour détecter si on est sur la page de connexion / inscription
  isLoginPage(): boolean {
    return this.router.url.startsWith('/login');
  }

  //Déconnexion
  async signOut() {
    await this.supabaseService.signOut();
    await this.router.navigate(['/login']);
  }

}
