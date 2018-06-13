import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Token } from './models/token';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private router: Router) {}

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  isLoggedIn: boolean;
  login(token: Token): void {
    localStorage.setItem('token', JSON.stringify(token));
    this.isLoggedIn = true;
    this.router.navigate(['/admin']);
  }
  checkLogin(): void {
    if(localStorage.getItem('token') != null){
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.loginRedirect();
  }
  getToken(): Token {
    return JSON.parse(localStorage.getItem('token'));
  }
  loginRedirect() : void {
    this.logout();
    this.router.navigate(['/login']);
  }
}