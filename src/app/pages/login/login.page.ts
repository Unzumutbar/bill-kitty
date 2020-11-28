import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication-service';
import { LogService } from '../../services/data/log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private logService: LogService
  ) {}

  public ngOnInit() {
  }

  public logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then(async () => {
        await this.logService.loginAttempt(email.value, true);
        this.router.navigate(['meow/dashboard']);
      }).catch(async (error) => {
        await this.logService.loginAttempt(email.value, false);
        window.alert(error.message);
      });
  }
}
