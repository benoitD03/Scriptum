import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.supabaseService.getCurrentUser().then(user => {
      console.log(user.data.user?.email);
    });
  }

}
