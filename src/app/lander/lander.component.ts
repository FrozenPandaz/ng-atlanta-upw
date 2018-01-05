import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { pluck } from 'rxjs/operators/pluck';
import { tap } from 'rxjs/operators/tap';
import { Observable } from 'rxjs/Observable';
import { List } from './list/list';
import { CookiesService } from '../shared/cookies/cookies.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'upw-lander',
  templateUrl: './lander.component.html',
  styleUrls: ['./lander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanderComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private cookiesService: CookiesService, private title: Title) { }

  public list: Observable<List> = this.activatedRoute.data.pipe(
    pluck('list'),
    tap((list: List) => {
      this.setMeta(list)
    })
  );

  ngOnInit() {
    this.cookiesService.set('current-list', this.activatedRoute.snapshot.params.listName);
  }

  private setMeta(list: List) {
    this.title.setTitle(list.name);
  }

}
