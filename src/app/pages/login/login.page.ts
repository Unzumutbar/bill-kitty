import { Component, OnInit } from '@angular/core';

import { AuthGuardService } from '../../services/auth-guard.service';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  public ngOnInit() {
  }

  public logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then(() => {
        this.router.navigate(['meow/dashboard']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

}
