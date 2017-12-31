import { NgModule } from '@angular/core';

import { SessionStorage } from './session-storage';
import { ClientSessionStorage } from './client.session-storage';

@NgModule({
    providers: [
        {
            provide: SessionStorage,
            useClass: ClientSessionStorage
        }
    ]
})
export class ClientSessionStorageModule {

}
