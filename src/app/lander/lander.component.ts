import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators/pluck';
import { tap } from 'rxjs/operators/tap';
import { CookiesService } from '../shared/cookies/cookies.service';
import { OpenGraphService } from '../shared/meta/open-graph/open-graph.service';
import { TwitterCardService } from '../shared/meta/twitter-card/twitter-card.service';
import { List } from './list/list';

@Component({
  selector: 'upw-lander',
  templateUrl: './lander.component.html',
  styleUrls: ['./lander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanderComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private cookiesService: CookiesService,
    private openGraphService: OpenGraphService,
    private twitterCardService: TwitterCardService,
    private meta: Meta,
    private title: Title) { }

  public list: Observable<List> = this.activatedRoute.data.pipe(
    pluck('list'),
    tap((list: List) => {
      this.setMeta(list);
    })
  );

  ngOnInit() {
    this.cookiesService.set('current-list', this.activatedRoute.snapshot.params.listName);
  }

  private setMeta(list: List) {
    this.title.setTitle(list.name);
    this.meta.updateTag({
      name: 'description',
      content: list.description
    });
    this.openGraphService.updateMeta({
      type: 'website',
      title: list.name,
      url: `https://ng-atlanta-upw.firebaseapp.com/${list.id}`,
      description: list.description,
      username: list.id,
      image: `https://ng-atlanta-upw.firebaseapp.com/app-icon.png`
    });
    this.twitterCardService.updateMeta({
      card: 'summary',
      title: list.name,
      description: list.description,
      image: `https://ng-atlanta-upw.firebaseapp.com/app-icon.png`
    });
  }

}
