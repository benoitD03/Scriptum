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
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
