import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  [x: string]: any;
  constructor(
    private _http: HttpClient,

  ) {

  }

  loginUser(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password
    };
    return this._http.post<any>('/api/Login/login', loginData);
  }

  logout()  {

  }






}
