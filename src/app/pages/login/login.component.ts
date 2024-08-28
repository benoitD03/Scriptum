import {Component, OnInit} from '@angular/core';
import {LoginCardComponent} from "../../components/login-card/login-card.component";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {SignupCardComponent} from "../../components/signup-card/signup-card.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginCardComponent,
    NgIf,
    SignupCardComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  goToSignup: boolean = false;    //True si on veut aller sur la page d'inscription
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {

    //On récupère la valeur de isSignupPage qui est transmise uniquement quand on clique sur "Créer un compte"
    this.route.queryParams.subscribe(params => {
      console.log(params);
        this.goToSignup = params['goToSignup'] === 'true';
    });
  }

}
