import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HeaderModule } from './header/header.module';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseModule } from './firebase.module';
import { ClientCookiesModule } from './shared/cookies/client.cookies.module';
import { ListService } from './lander/list/list.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './shared/interceptors/cache.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HeaderModule,
    HttpClientModule,
    FirebaseModule,
    ClientCookiesModule
  ],
  providers: [
    ListService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: CacheInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
