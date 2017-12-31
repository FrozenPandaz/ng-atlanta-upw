import { NgModule } from '@angular/core';

import { CookiesService } from './cookies.service';
import { NodeCookiesService } from './node.cookies.service';

@NgModule({
    providers: [
        {
            provide: CookiesService,
            useClass: NodeCookiesService
        }
    ]
})
export class NodeCookiesModule {

}
