import { NgModule } from '@angular/core';

import { ClientCookiesService } from './client.cookies.service';
import { CookiesService } from './cookies.service';

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
