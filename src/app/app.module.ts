import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HeaderModule } from './header/header.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientCookiesModule } from './shared/cookies/client.cookies.module';
import { ListService } from './lander/list/list.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './shared/interceptors/cache.interceptor';
import { BaseInterceptor } from './shared/interceptors/base.interceptor';
import { ENVIRONMENT } from '../environments/environment.token';
import { EnvironmentProperties } from '../environments/environment-properties';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { LoginModule } from './login/login.module';
import { FirebaseModule } from './firebase.module';

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
