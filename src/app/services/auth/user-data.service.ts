import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userData: BehaviorSubject<any>;
  constructor(private localStorage: LocalStorageService) {
    this.userData = new BehaviorSubject(
      this.localStorage.getItem('currentUser')
    );
  }

  getUserData(): Observable<string | null> {
    return this.userData.asObservable();
  }

  updateUserData(data: string | null): void {
    this.userData.next(data);
  }
}
