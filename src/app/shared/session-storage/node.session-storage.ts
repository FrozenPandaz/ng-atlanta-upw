import { SessionStorage } from './session-storage';
import { Injectable } from '@angular/core';

@Injectable()
export class NoopSessionStorage extends SessionStorage {
    getItem(key: string): string {
        return '';
    }

    setItem(key: string, value: string) {}
}
