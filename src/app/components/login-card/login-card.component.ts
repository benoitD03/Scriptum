import { Component } from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.css'
})
export class LoginCardComponent {
  constructor(private supabaseService: SupabaseService, private router : Router, public accountService : AccountService) {}
  email: string = '';
  password: string = '';

  // Connexion par email
  async signInWithEmail() {
    try {
      const user = await this.supabaseService.signInWithEmail(this.email, this.password);
      console.log('User signed in:', user);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      alert('Mot de passe ou email incorrect');
      console.error('Error signing in:', error);
    }
  }

  // Connexion avec Google
  async signInWithGoogle() {
    try {
      const user = await this.supabaseService.signInWithGoogle();
      console.log('User signed in with Google:', user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  //Méthode pour rediriger vers la page d'inscription
  redirectToLoginWithSignup() {
    this.router.navigate(['/login'], { queryParams: { goToSignup: true } });
  }
}
