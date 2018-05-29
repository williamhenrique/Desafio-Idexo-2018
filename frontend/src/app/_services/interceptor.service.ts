import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InterceptorService {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if( !request.headers.get('Authorization')){
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.keCcnLnd9PsvWNH_WbhuWLX3rtenv-GtbBCGosoaEEE`
            }
          });
    }
    return next.handle(request);
  }
}
