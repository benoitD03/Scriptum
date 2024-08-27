import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = '';
    const supabaseKey = '';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Méthode pour se connecter avec un email et un mot de passe
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  }

  // Méthode pour se connecter avec Google
  async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
    return data;
  }

  // Méthode pour s'inscrire avec un email et un mot de passe
  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  // Méthode pour se déconnecter
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
}
