import { Injectable } from '@angular/core';
import { APP_API } from './app.api';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ErrorHandler} from './app.error-handler';

@Injectable()
export class ComponentService {

  constructor(private http: Http) { }
  //metodo usuado para usuario anomimo poder usar carrinho de compras
  getSession(): Observable<any>{
      return this.http.get(`${APP_API}/`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }
  validateSession(){
    return localStorage.getItem('session_api')
  }

}
