import { environment } from './../../environments/environment';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      // headers: req.headers.set('Authorization', `${environment.API_KEY}`),
      params: (req.params ? req.params : new HttpParams())
        .set('session_id', `${environment.SESSION_ID}`)
        .set('api_key', `${environment.API_KEY}`),
    });
    return next.handle(modifiedReq);
  }
}
