import { Injectable } from '@angular/core';
import { SessionStorage } from './session-storage';

@Injectable()
export class ClientSessionStorage extends SessionStorage {
    setItem(key: string, value: string) {
        sessionStorage.setItem(key, value);
    }

    getItem(key: string): string {
        return sessionStorage.getItem(key);
    }
}
