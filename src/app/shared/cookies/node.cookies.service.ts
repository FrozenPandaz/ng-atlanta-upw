import { CookiesService } from './cookies.service';
import { Injectable, Inject, Optional } from '@angular/core';

import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

import * as cookie from 'cookie';

@Injectable()
export class NodeCookiesService {

    cookies = {};

    constructor(
        @Optional() @Inject(REQUEST) private request: Request
    ) {
      if (!this.request) {
        return;
      }

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
