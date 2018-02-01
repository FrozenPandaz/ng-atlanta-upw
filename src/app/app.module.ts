import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ENVIRONMENT } from '../environments/environment.token';
import { HeaderModule } from './header/header.module';
import { ListService } from './lander/list/list.service';
import { ClientCookiesModule } from './shared/cookies/client.cookies.module';
import { BaseInterceptor } from './shared/interceptors/base.interceptor';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { MetaModule } from './shared/meta/meta.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    ClientCookiesModule,
    HeaderModule,
    MetaModule
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
