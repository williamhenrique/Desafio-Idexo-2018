import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import {ErrorHandler} from './../app.error-handler';
import {APP_API} from './../app.api';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: HttpClient) { }

  loginWithFacebook(userData): Observable<boolean>{
    return this.http.post(`${APP_API}/auth/facebook/token`, {email: userData.email},{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + userData.token)
    }).map((response) => {
        let token = response['token'];

        if (token) {
            // Adicionando o token
            this.token = token;

            // seta em localStorage email do cadastro e o jwt token.
            localStorage.setItem('currentUser', JSON.stringify({ email: userData.email, token: token }));

            // retorna true indicando sucesso (ja possui cadastro via facebook)
            return true;
        }
        return false;
    })
    .catch(ErrorHandler.handleError);
  }

  login(email: string, password: string, role = ''): Observable<boolean> {
    console.log(JSON.stringify({ email: email, password: password }));
    return this.http.post(`${APP_API}/auth`, { email: email, password: password })
        .map((response) => {
          let token = response['token'];
          if (token) {
            // Adicionando o token
            this.token = token;

            // seta em localStorage email do cadastro e o jwt token.
            localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));

            // retorna true indicando sucesso
            return true;
          }

           return false;
        })
        .catch(ErrorHandler.handleError);
  }

  logout(): void {
    // limpar token localstorage e remover o token do objeto.
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
