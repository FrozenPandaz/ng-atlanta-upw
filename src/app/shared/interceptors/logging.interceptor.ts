import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`[${req.method}] -> ${req.urlWithParams}`);
        return next.handle(req).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    console.log(`Complete: [${req.method}] -> ${req.urlWithParams}`);
                }
            })
        );
    }
}
