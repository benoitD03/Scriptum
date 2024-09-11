import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {environment} from "../../environments/environment";
import {Book} from "../class/book";

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {

    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
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

  // Méthode pour récupérer l'utilisateur connecté
  getCurrentUser() {
    return this.supabase.auth.getUser();
  }

  //Méthode pour créer un nouveau livre (lié à l'utilisateur connecté)
  async createBook(book: Book) {
    // On récupère l'utilisateur actuellement connecté et ajouter son ID à l'objet book
     this.getCurrentUser().then(async user => {
       const userId = user.data.user?.id;
       if (userId) {
         const newBook = {
           ...book,
           id_user: userId,
         };
         // Si l'utilisateur est connecté, on insère le livre dans la base de données
         const {data, error} = await this.supabase
           .from('books')
           .insert([newBook]);

         if (error) {
           console.error('Erreur lors de la création du livre:', error.message);
         } else {
           console.log('Livre créé avec succès:', data);
         }
       } else {
         console.error('Utilisateur non connecté');
       }

     });

  }
}
