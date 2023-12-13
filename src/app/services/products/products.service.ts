import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import serverConstants from '../../constants/serverConstants';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${serverConstants.baseUrl}/products`);
  }

  getProductDetails(id: string | null): Observable<any> {
    return this.httpClient.get(`${serverConstants.baseUrl}/products/${id}`);
  }
}
