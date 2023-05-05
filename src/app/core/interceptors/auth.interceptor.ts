import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTHERIZOTION } from '../constant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  auth = AUTHERIZOTION.AUTH.TOKEN
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({ headers: request.headers.set('authorization', ` ${this.auth}` || '') })
    return next.handle(request);
  }
}
