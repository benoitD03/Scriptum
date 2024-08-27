import { Component } from '@angular/core';
import {LoginCardComponent} from "../../components/login-card/login-card.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginCardComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
}
