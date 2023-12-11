import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private userData: UserDataService
  ) {}
  logout() {
    this.localStorage.removeItem('currentUser');
    this.userData.updateUserData(null);
    this.router.navigate(['/', 'login']);
  }
}
