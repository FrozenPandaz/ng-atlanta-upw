import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NodeSessionStorageModule } from './shared/session-storage/node.session-storage.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    NodeSessionStorageModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
