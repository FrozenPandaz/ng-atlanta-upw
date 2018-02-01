import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { environment } from '../environments/environment.server';
import { ENVIRONMENT } from '../environments/environment.token';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NodeCookiesModule } from './shared/cookies/node.cookies.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
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
