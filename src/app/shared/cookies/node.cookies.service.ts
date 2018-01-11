import { Inject, Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';

import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

import * as cookie from 'cookie';

@Injectable()
export class NodeCookiesService implements CookiesService {

    private cookies = {};

    constructor(
        @Inject(REQUEST) private request: Request
    ) {
        const cookieString = this.request.headers.cookie as string;
        if (cookieString) {
            this.cookies = cookie.parse(cookieString);
        }
    }

    get(key: string): string {
        return this.cookies[key];
    }

    set(key: string, value: string) {
    }
}
