import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.time(`[${req.method}] -> ${req.urlWithParams}`);
      return next.handle(req).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            console.timeEnd(`[${req.method}] -> ${req.urlWithParams}`);
          }
        })
      );
  }
}
