import { Component, OnInit } from '@angular/core';

import { List } from './list/list';

@Component({
  selector: 'upw-lander',
  templateUrl: './lander.component.html',
  styleUrls: ['./lander.component.scss']
})
export class LanderComponent implements OnInit {

  public list: List;

  constructor() { }

  ngOnInit() {
  }

  // private setMeta(list: List) {
  //   this.title.setTitle(list.name);
  //   this.meta.updateTag({
  //     name: 'description',
  //     content: list.description
  //   });
  // }

}
