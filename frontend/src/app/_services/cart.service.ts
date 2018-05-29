import { APP_API } from './../app.api';
import { CartAdd } from './../_models/cart';
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ErrorHandler} from './../app.error-handler';
import { ComponentService } from './../component.service';



@Injectable()
export class CartService {

  constructor(private http: Http, private bootstrapService: ComponentService) { }

    addItemCart(produto_id, quantidade): Promise<CartAdd> {
      let dados = {
        "product_id" : produto_id,
        "quantity" : quantidade,
        "session_id" : this.bootstrapService.validateSession()
      };

    let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
          return this.http.post(`${APP_API}/cart/add`, dados, options).toPromise()
               .then(response => response.json())
               .catch(ErrorHandler.handleError);
      }

      getCart(): Observable<any>{
        return this.http.get(`${APP_API}/cart/${this.bootstrapService.validateSession()}`)
        .map(response => response.json().payload)
        .catch(ErrorHandler.handleError);
      }
}
