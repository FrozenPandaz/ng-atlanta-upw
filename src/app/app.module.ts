import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ENVIRONMENT } from '../environments/environment.token';
import { HeaderModule } from './header/header.module';
import { ListService } from './lander/list/list.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    HeaderModule
  ],
  providers: [
    ListService,
    {
      provide: ENVIRONMENT,
      useValue: environment
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
