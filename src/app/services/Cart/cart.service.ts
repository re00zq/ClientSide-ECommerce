import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import serverConstants from '../../constants/serverConstants';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url: string;
  token: string;
  constructor(
    private httpClient: HttpClient,
    localStorage: LocalStorageService
  ) {
    this.url = `${serverConstants.baseUrl}/cart`;
    this.token = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') as string)?.token
      : null;
  }

  addToCart(productId: string): Observable<any> {
    return this.httpClient.post(
      this.url,
      { productId },
      {
        headers: { token: this.token },
      }
    );
  }

  getCart(): Observable<any> {
    return this.httpClient.get(this.url, { headers: { token: this.token } });
  }
}
