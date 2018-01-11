import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ENVIRONMENT } from '../environments/environment.token';
import { FirebaseModule } from './firebase.module';
import { HeaderModule } from './header/header.module';
import { ListService } from './lander/list/list.service';
import { ClientCookiesModule } from './shared/cookies/client.cookies.module';
import { BaseInterceptor } from './shared/interceptors/base.interceptor';
import { CacheInterceptor } from './shared/interceptors/cache.interceptor';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    ClientCookiesModule,
    HeaderModule,
    FirebaseModule
  ],
  providers: [
    ListService,
    {
      provide: ENVIRONMENT,
      useValue: environment
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: CacheInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: BaseInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: LoggingInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
