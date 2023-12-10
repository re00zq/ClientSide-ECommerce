import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/', 'login']);
  }
}
