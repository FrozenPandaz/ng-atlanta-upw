import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';

import * as cookie from 'js-cookie';

@Injectable()
export class ClientCookiesService extends CookiesService {
    set(key: string, value: string) {
        cookie.set(key, value);
    }

    get(key: string): string {
        return cookie.get(key);
    }
}
