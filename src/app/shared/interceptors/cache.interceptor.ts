import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private transferState: TransferState) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method !== 'GET') {
            return next.handle(req);
        }

        const key = makeStateKey<any>(req.url);

        const cachedValue = this.transferState.get(key, null);
        if (cachedValue) {
            return of(new HttpResponse({
                body: cachedValue
            }));
        } else {
            return next.handle(req).pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        this.transferState.set(key, event.body);
                    }
                })
            );
        }
    }
}
