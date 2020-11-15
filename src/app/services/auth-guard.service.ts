import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const authInfo = {
      authenticated: false
    };

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user){
      this.router.navigate(['login']);
      return false;
    }

    authInfo.authenticated = true;


    if (!authInfo.authenticated) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
