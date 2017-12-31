import { NgModule } from '@angular/core';

import { CookiesService } from './cookies.service';
import { ClientCookiesService } from './client.cookies.service';

@NgModule({
    providers: [
        {
            provide: CookiesService,
            useClass: ClientCookiesService
        }
    ]
})
export class ClientCookiesModule {

}
