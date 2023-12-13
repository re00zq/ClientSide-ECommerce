import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalStorageService);
  const router = inject(Router);

  return localStorage.getItem('currentUser')
    ? true
    : router.createUrlTree(['/login']);
};
