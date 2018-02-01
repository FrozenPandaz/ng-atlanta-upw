import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { OpenGraphMeta } from './open-graph';

@Injectable()
export class OpenGraphService {

  constructor(
    private meta: Meta
  ) {
    console.log('meta hi');
  }

  updateMeta(meta: OpenGraphMeta) {
    this.meta.updateTag({
      property: 'og:type',
      content: meta.type
    });
    this.meta.updateTag({
      property: 'og:title',
      content: meta.title
    });
    this.meta.updateTag({
      property: 'og:url',
      content: meta.url
    });
    if (meta.username) {
      this.meta.updateTag({
        property: 'profile:username',
        content: meta.username
      });
    }
    if (meta.description) {
      this.meta.updateTag({
        property: 'og:description',
        content: meta.description
      });
    }
    if (meta.image) {
      this.meta.updateTag({
        property: 'og:image',
        content: meta.image
      });
    }
  }

}
