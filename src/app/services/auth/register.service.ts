import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RegisterBody } from '../../types/register-body.type';
import serverConstants from '../../constants/serverConstants';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  register(body: RegisterBody): Observable<any> {
    const res = this.httpClient.post(
      `${serverConstants.baseUrl}/auth/signup`,
      body
    );
    return res;
  }
}
