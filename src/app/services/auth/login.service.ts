import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import serverConstants from '../../constants/serverConstants';
import { LoginBody } from '../../types/login-body.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(body: LoginBody): Observable<any> {
    const res = this.httpClient.post(
      `${serverConstants.baseUrl}/auth/signin`,
      body
    );
    return res;
  }
}
