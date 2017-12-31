import { NgModule } from '@angular/core';

import { SessionStorage } from './session-storage';
import { NoopSessionStorage } from './node.session-storage';

@NgModule({
    providers: [
        {
            provide: SessionStorage,
            useClass: NoopSessionStorage
        }
    ]
})
export class NodeSessionStorageModule {

}
