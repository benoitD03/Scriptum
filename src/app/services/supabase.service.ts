import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {environment} from "../../environments/environment";
import {Book} from "../class/book";
import {data} from "autoprefixer";
import {catchError, from, map, Observable, of, switchMap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {

    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  /**
   * Méthode pour se connecter avec un email et un mot de passe
   */

  async signInWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  }

  /**
   * Méthode pour se connecter avec Google
   */
  async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
    return data;
  }

  /**
   * Méthode pour s'inscrire avec un email et un mot de passe
   * @param email
   * @param password
   */
  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  /**
   * Méthode pour se déconnecter
   */
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  /**
   * Méthode pour récupérer l'utilisateur connecté
   */
  getCurrentUser(): Observable<any> {
    // On convertit la promesse en observable
    return from(this.supabase.auth.getUser()).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error.message);
        return throwError(() => new Error('Erreur lors de la récupération de l\'utilisateur'));
      })
    );
  }

  /**
   * Méthode pour créer un nouveau livre (lié à l'utilisateur connecté)
   * @param book
   */
  createBook(book: Book): Observable<any> {
    return this.getCurrentUser().pipe(
      switchMap(user => {
        const userId = user?.data.user?.id;
        if (userId) {
          const newBook = {
            ...book,
            id_user: userId
          };
          return from(this.supabase
            .from('books')
            .insert([newBook])
          ).pipe(
            catchError(error => {
              console.error('Erreur lors de la création du livre:', error.message);
              return throwError(() => new Error('Erreur lors de la création du livre'));
            })
          );
        } else {
          console.error('Utilisateur non connecté');
          return throwError(() => new Error('Erreur lors de la récupération de l\'utilisateur'));
        }
      })
    );
  }

  /**
   * Méthode pour récupérer les livres de l'utilisateur connecté
   */
  getUserBooks(userId: string): Observable<any[]> {
    //On convertit la promesse en observable
    return from(this.supabase
      .from('books')
      .select('*')
      .eq('id_user', userId)).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Erreur lors de la récupération des livres:', error.message);
        return throwError(() => new Error('Erreur lors de la récupération des livres'));
      })
    );
  }
}
