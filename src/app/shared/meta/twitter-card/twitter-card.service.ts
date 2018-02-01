import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TwitterCardMeta } from './twitter-card-meta';

@Injectable()
export class TwitterCardService {

  constructor(private meta: Meta) {

    console.log('twitter hi');
  }

  updateMeta(meta: TwitterCardMeta) {
    this.meta.updateTag({
      name: 'twitter:card',
      content: meta.card
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: meta.title
    });
    if (meta.description) {
      this.meta.updateTag({
        name: 'twitter:description',
        content: meta.description
      });
    }
    if (meta.image) {
      this.meta.updateTag({
        name: 'twitter:image',
        content: meta.image
      });
    }
  }

}
