import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { List } from './list/list';

@Component({
  selector: 'fbs-lander',
  templateUrl: './lander.component.html',
  styleUrls: ['./lander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanderComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  public list: Observable<List> = this.activatedRoute.data.pipe(
    pluck('list')
  );

  ngOnInit() {
  }

}
