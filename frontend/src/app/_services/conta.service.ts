import { isObject } from 'util';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {APP_API} from './../app.api';
import {ErrorHandler} from './../app.error-handler';
import { Conta} from './../_models/conta';

@Injectable()
export class ContaService {

  constructor(private http: HttpClient) { }
      register(dados) {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            return this.http.post(`${APP_API}/user`, dados).toPromise()
                 .then(response => response)
                 .catch(ErrorHandler.handleError);
      }

      accounts(email: string): Observable<Conta>{
          return this.http.get(`${APP_API}/user/email/${email}`)
          .map(data => this.accountsMap(data['payload']))
          .catch(ErrorHandler.handleError);
      }

      accountsMap({id, email, name, cpf, telephone, birthday, Address}: Conta) {
        Address = isObject(Address) ? Address : Object;
        return {
          id, email, name, cpf, telephone, birthday, Address
        };
      }
}

