import { NgModule } from '@angular/core';
import { OpenGraphService } from './open-graph/open-graph.service';
import { TwitterCardService } from './twitter-card/twitter-card.service';

@NgModule({
  providers: [
    OpenGraphService,
    TwitterCardService
  ]
})
export class MetaModule { }
