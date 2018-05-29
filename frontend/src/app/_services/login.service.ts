import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {APP_API} from './../app.api';
import {ErrorHandler} from './../app.error-handler';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  // authFacebook(userData){
  //   return this.http.post(`${APP_API}/auth/facebook/token`, {email: userData.email},{
  //               headers: new HttpHeaders().set('Authorization', 'Bearer ' + userData.token),
  //               observe: 'response'
  //             }
  //       ).toPromise()
  //         .then(res => res)
  //         .catch(err =>  err);
  // }

  // login(email: string, password: string, role = ''): Promise<any>{
  //   return this.http.post(`${APP_API}/auth${role}`, {email, password}
  //       ).toPromise()
  //        .then(response => {
  //           // localStorage.setItem('token', response);
  //          return response;
  //        })
  //        .catch(ErrorHandler.handleError);
  // }
}
