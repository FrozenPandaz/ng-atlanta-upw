import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EnvironmentProperties } from '../../../environments/environment-properties';
import { ENVIRONMENT } from '../../../environments/environment.token';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
    constructor(
        @Inject(ENVIRONMENT) private environment: EnvironmentProperties
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = this.environment.apiBase + req.url;
        const newReq = new HttpRequest(
            req.method,
            url,
            {
                headers: req.headers,
                responseType: req.responseType,
                reportProgress: req.reportProgress,
                params: req.params,
                withCredentials: req.withCredentials
            }
        );
        return next.handle(newReq);
    }
}
