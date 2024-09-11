import { Component } from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private supabaseService: SupabaseService, private router : Router) { }


  async signOut() {
    await this.supabaseService.signOut();
    this.router.navigate(['/login']);
  }
}
