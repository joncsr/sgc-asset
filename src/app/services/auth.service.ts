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

  login(usercred: any): Observable<any> {

    return this._http.post<any>('/api/Login/login', usercred);
  }

  isLoggedIn(){
    return localStorage.getItem('token')!=null;
  }

  getToken(){
    return localStorage.getItem('token')||'';
  }

  logout()  {

  }
}
