import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Produto } from './../_models/produto';
import {APP_API} from './../app.api';
import {ErrorHandler} from './../app.error-handler';

@Injectable()
export class ProdutoService {

  constructor(private http: Http) { }

  produtos(): Observable<Produto[]> {
      return this.http.get(`${APP_API}/product`)
      .map(response => response.json().payload)
      .catch(ErrorHandler.handleError);
  }
  produtoID(id: number): Observable<Produto[]> {
    return this.http.get(`${APP_API}/product/${id}`)
    .map(response => response.json().payload)
    .catch(ErrorHandler.handleError);
  }

}
