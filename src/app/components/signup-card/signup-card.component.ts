import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {SupabaseService} from "../../services/supabase.service";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-signup-card',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './signup-card.component.html',
  styleUrl: './signup-card.component.css'
})
export class SignupCardComponent {

  email: string = '';
  password: string = '';
constructor(private supabaseService: SupabaseService, private router : Router, public accountService : AccountService) {}

  // Inscription par email et Mot de passe
  async signUp() {
    try {
      const user = await this.supabaseService.signUp(this.email, this.password);
      console.log('User signed up:', user);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }

  //Méthode pour rediriger vers la page de connexion
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
