import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { List } from './list/list';
import { CookiesService } from '../shared/session-storage/session-storage';

@Component({
  selector: 'fbs-lander',
  templateUrl: './lander.component.html',
  styleUrls: ['./lander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanderComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private sessionStorage: CookiesService) { }

  public list: Observable<List> = this.activatedRoute.data.pipe(
    pluck('list')
  );

  ngOnInit() {
    this.sessionStorage.set('current-list', this.activatedRoute.snapshot.params.listName);
  }

}
