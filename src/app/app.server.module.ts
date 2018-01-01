import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NodeCookiesModule } from './shared/cookies/node.cookies.module';
import { ENVIRONMENT } from '../environments/environment.token';
import { environment } from '../environments/environment.server';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    NodeCookiesModule
  ],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment
    }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
